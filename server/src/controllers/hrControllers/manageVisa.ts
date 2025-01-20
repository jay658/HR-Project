import { promises } from "dns";
import { Request, Response } from "express";
import VisaApplication from "../../models/VisaApplication";
import PersonalInfo from "../../models/PersonalInfo";
import Document from "../../models/Document";
import { sendNotificationEmail } from "../../utility/EmailJS/emailJS";

const testManageVisaRouter = (_req: Request, res: Response) => {
    try{
      res.json('Successfully hit hr manage visa router');
    }catch(err){
      console.log(`There was an error in the hr onboarding test route: ${err}`);
    }
  };

const calculateDaysRemaining = (endDate: Date): number => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
};

const getInProgress = async (req: Request, res: Response): Promise<any> => {
    try{
        const inProgressApplications = await VisaApplication.find({
            nextStep: { $ne: 'completed' }
        })

        const userIds = inProgressApplications.map(application => application.userId);

        // Get visa and personal info for these users
        const visa = await VisaApplication.find({ userId: { $in: userIds } });
        const personalInfos = await PersonalInfo.find({ userId: { $in: userIds } });

        const formattedResult = [];
        
        // Combine personal info with visa status
        for (const info of personalInfos) {
            const userVisa = visa.find(v => v.userId.toString() === info.userId.toString());
            
            const existingDoc = await Document.findOne({ userId: info.userId, type: userVisa?.nextStep })
            let action = ""

            if(existingDoc){
                if (existingDoc.status == "rejected"){
                    action = "Rejected"
                }else{
                    action = "View"
                }
                
                action = "View"
            }else{
                action = "Notification"
            }

            formattedResult.push({
                _id: info._id,
                userId: info.userId,
                name: `${info.name.firstName} ${info.name.lastName}`,
                email: info.email,
                nextStep: userVisa?.nextStep,
                employment: {
                    title: info.employment.visaType,
                    startDate: info.employment.startDate,
                    endDate: info.employment.endDate,
                    daysRemaining: calculateDaysRemaining(info.employment.endDate)
                },
                action: action
            });
        }
        return res.status(200).json({ data: formattedResult});
    }catch(err){
      console.log(`There was an error in the hr onboarding test route: ${err}`);
      return res.status(500).json({mssg:err})
    }
};


const getPendingDocument = async (req: Request, res: Response): Promise<any> => {
    try{

        const { userId, nextStep } = req.query

        console.log(userId, nextStep)
        const existingDoc = await Document.findOne({ userId: userId, type: nextStep })

        if(!existingDoc){
            return res.status(404).json({mssg: "Couldn't get document"})
        }

        return res.status(200).json({ data: existingDoc});

    }catch(err){
      console.log(`There was an error in the hr onboarding test route: ${err}`);
      return res.status(500).json({mssg:err})
    }
}

const sendEmailNotification = async (req: Request, res: Response): Promise<any> => {
    try{
        const {receiver_email, receiver_name, nextStep} = req.body

        const response = sendNotificationEmail(receiver_name, receiver_email, nextStep)

        console.log(response, receiver_email, receiver_name, nextStep)

        return res.status(200).json({mssg : response})
    } catch(err){
        console.log(`There was an error in the hr onboarding test route: ${err}`);
        return res.status(500).json({mssg:err})
    }
}

const approveVisa = async (req: Request, res: Response): Promise<any> => {
    try{
        const { userId, nextStep } = req.body

        const visa= await VisaApplication.findOne({userId:userId})
        if (!visa) {
            return res.status(404).json({error : "No Visa application"})
        }

        const existingDoc = await Document.findOne({ userId: userId, type: nextStep });
        if(!existingDoc){
            return res.status(404).json({error : "Cannot find Document"})
        }

        existingDoc.status = 'approved'

        await existingDoc.save()

        await visa.updateNextStep();

        return res.status(200).json({existingDoc})

    } catch(err){
        console.log(`There was an error in the hr onboarding test route: ${err}`);
        return res.status(500).json({mssg:err})
    }
}

const rejectVisa = async (req: Request, res: Response): Promise<any> => {
    try{
        const { userId, nextStep, comment } = req.body

        const visa= await VisaApplication.findOne({userId:userId})
        if (!visa) {
            return res.status(404).json({error : "No Visa application"})
        }

        const existingDoc = await Document.findOne({ userId: userId, type: nextStep });
        if(!existingDoc){
            return res.status(404).json({error : "Cannot find Document"})
        } 

        existingDoc.status = 'rejected'

        // Update only the feedback object
        existingDoc.feedback = {
            comment: comment,
            updatedAt: new Date()
        };

        await existingDoc.save()

        return res.status(200).json({existingDoc})

    }catch(err){
        console.log(`There was an error in the hr onboarding test route: ${err}`);
        return res.status(500).json({mssg:err})
    }
}

const searchEmployee = async (req: Request, res: Response): Promise<any> => {
    try {
        const search = req.query.search as string | undefined;

        if (!search || search.trim() === '') {
            // If no search query, return all visa-status employees
            const allVisa = await VisaApplication.find();
            const userIds = allVisa.map(visa => visa.userId);

            const personalInfos = await PersonalInfo.find({
                userId: { $in: userIds }
            });

            const result = await formatEmployeeData(personalInfos);
            return res.status(200).json({ data: result });
        }

        // Create case-insensitive search regex
        const searchRegex = new RegExp(search.trim(), 'i');

        // Search in PersonalInfo collection
        const matchingPersonalInfos = await PersonalInfo.find({
            $or: [
                { 'name.firstName': searchRegex },
                { 'name.lastName': searchRegex },
                { 'name.preferredName': searchRegex }
            ]
        });

        // Filter for only those with visa applications
        const visaApplications = await VisaApplication.find({
            userId: { 
                $in: matchingPersonalInfos.map(info => info.userId) 
            }
        });

        const visaUserIds = visaApplications.map(visa => visa.userId.toString());
        const filteredPersonalInfos = matchingPersonalInfos.filter(
            info => visaUserIds.includes(info.userId.toString())
        );

        const result = await formatEmployeeData(filteredPersonalInfos);

        // Return appropriate response based on number of results
        if (result.length === 0) {
            return res.status(200).json({
                message: "No matching employees found",
                data: []
            });
        }

        return res.status(200).json({
            message: `Found ${result.length} matching employee${result.length === 1 ? '' : 's'}`,
            data: result
        });

    } catch (err) {
        console.log(`Error searching employees: ${err}`);
        return res.status(500).json({
            success: false,
            error: 'Failed to search employees'
        });
    }
};

const formatEmployeeData = async (personalInfos: any[]) => {
    const formattedResults = [];

    for (const info of personalInfos) {
        // Get approved documents for display
        
        const approvedDocs = await Document.find({
            userId: info.userId,
            status: 'approved'
        });

        // Get visa application to get nextStep
        const visaApplication = await VisaApplication.findOne({
            userId: info.userId
        });

        // Determine next action
        let nextAction = 'Need Upload';
        
        if (visaApplication?.nextStep === 'completed') {
            nextAction = 'Completed';
        } else if (visaApplication?.nextStep) {
            // Find current step document to determine next action
            const currentStepDoc = await Document.findOne({ 
                userId: info.userId,
                type: visaApplication.nextStep
            });

            if (currentStepDoc) {
                if (currentStepDoc.status === 'rejected') {
                    nextAction = 'Rejected';
                } else if (currentStepDoc.status === 'pending') {
                    nextAction = 'Waiting Approval';
                }
            }
        }

        formattedResults.push({
            userId: info.userId,
            name: {
                firstName: info.name.firstName,
                lastName: info.name.lastName,
                preferredName: info.name.preferredName
            },
            email: info.email,
            employment: {
                visaType: info.employment.visaType,
                startDate: info.employment.startDate,
                endDate: info.employment.endDate
            },
            nextStep: visaApplication?.nextStep || null,
            nextAction: nextAction,
            documents: approvedDocs.map(doc => ({
                type: doc.type,
                fileUrl: doc.fileUrl,
                fileKey: doc.fileKey
            }))
        });
    }

    return formattedResults;
};

export {
    testManageVisaRouter,
    getInProgress,
    sendEmailNotification,
    approveVisa,
    rejectVisa,
    searchEmployee,
    getPendingDocument
}