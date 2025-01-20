import emailjs from '@emailjs/nodejs';
import config from '../configs';

const emailConfig = {
    publicKey: config.EMAILJS_PUBLIC_KEY
};

const sendEmail = async (receiver_name: string, receiver_email: string, message: string) => {
    try{
        const templateParams = {
            to_name: receiver_name,
            to_email: receiver_email,
            message: message,
        };
    
        const response = await emailjs.send(
            config.EMAILJS_SERVICE_ID,
            config.EMAILJS_TEMPLATE_ID,
            templateParams,
            {
            publicKey: config.EMAILJS_PUBLIC_KEY,
            }
        );

        return response

    } catch(err: unknown){
        return err
    }

};

const sendNotificationEmail = async (receiver_name: string, receiver_email: string, message: string) => {
    try{
        const templateParams = {
            to_name: receiver_name,
            to_email: receiver_email,
            message: message,
        };
    
        const response = await emailjs.send(
            config.EMAILJS_SERVICE_ID,
            config.EMAILJS_NOTIIFICATION_TEMPLATE_ID,
            templateParams,
            {
            publicKey: config.EMAILJS_PUBLIC_KEY,
            }
        );
        
        return response

    } catch(err: unknown){
        return err
    }

};



  
export {
    sendEmail,
    sendNotificationEmail
}
  