import { promises } from "dns";
import { Request, Response } from "express";
import VisaApplication from "../../models/VisaApplication";
import PersonalInfo from "../../models/PersonalInfo";
import Document from "../../models/Document";
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
                action = "View"
            }else{
                action = "Notification"
            }

            formattedResult.push({
                _id: info._id,
                userId: info.userId,
                name: `${info.name.firstName} ${info.name.lastName}`,
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

const sendEmailNotification = async (req: Request, res: Response): Promise<any> => {

}

export {
    testManageVisaRouter,
    getInProgress
}