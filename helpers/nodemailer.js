import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email,emailType,userID}) =>{
    try{

        const hastoken = await bcryptjs.hash(userID.toString(), 10);
        
        if(emailType==="VERIFY"){
          await User.findByIdAndUpdate(userID,{verifyToken:hastoken,verifyTokenExpiry: Date.now() + 360000 })
        }else if(emailType=="RESET"){
          await User.findByIdAndUpdate(userID,{forgotPasswordToken:hastoken,forgotPasswordTokenExpiry: Date.now() + 360000 }) 
        }

        var transport = nodemailer.createTransport({
          host: process.env.MAILTRAP_HOST,
          port: process.env.MAILTRAP_PORT,
          auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS
          }
        });


          const mailOptions={
            from: 'maddison53@ethereal.email', // sender address
            to: email, 
            subject: emailType==='VERIFY' ? 'verfiy your email' : "Reset your password" ,   
            html: `<p>Click <a href="${process.env.NEXT_PUBLIC_SITE_URL}/verifyemail?token=${hastoken}">here</a>
            to ${emailType === "VERIFY" ? "verfiy your email":
              "reset your passwowrd"} or coapy paste the link below in your browser.
              <br> ${process.env.NEXT_PUBLIC_SITE_URL}/resetemail?token=${hastoken}
              </p>`,
          }


         const mailres= await transport.sendMail(mailOptions)
         return mailres
    }catch(error){
        throw new Error(error.message)
    
    }
}