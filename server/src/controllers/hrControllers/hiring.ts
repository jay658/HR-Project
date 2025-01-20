import { Request, Response } from "express";

import { EmailJSResponseStatus } from "@emailjs/nodejs";
import HumanResources from "../../models/HumanResources";
import RegistrationToken from "../../models/RegisterToken";
import { sendEmail } from "../../utility/EmailJS/emailJS";

// Test Router
const testHiringRouter = (req: Request, res: Response) => {
  try{
    res.json('Successfully hit hr hiring router');
  }catch(err){
    console.log(`There was an error in the hr user test route: ${err}`);
  }
};

const sendRegistrationEmail = async (req: Request, res: Response) : Promise<any> => {
    try{
        const {username, receiver_name, receiver_email} = req.body

        // Find HR User
        const user = await HumanResources.findOne({username : username});
        if (!user) {
            return res.status(404).json({error : "HR User not found"})
        }

        const registerToken = await RegistrationToken.create({
            email: receiver_email,
            personName: receiver_name,
            hr: user._id
        })

        const response = await sendEmail(registerToken.personName,registerToken.email,`http://localhost:5173/register/${registerToken._id}`)

        res.status(200).json({mssg : response})
    }catch(err){
        console.log(`There was an error for getting status: ${err}`)
    }
}

export {
    testHiringRouter,
    sendRegistrationEmail
}