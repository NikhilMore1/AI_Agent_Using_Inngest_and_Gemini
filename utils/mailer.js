import nodemailer from 'nodemailer';

const sendMail = async(to,subject,text)=>{
    try{
        const transporter = nodemailer.createTransport({
         host: process.env.MAILTRAP_SMTP_URL_HOST,
        port: process.env.MAILTRAP_SMTP_URL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
              user: process.env.MAILTRAP_SMTP_URL_USER,
              pass: process.env.MAILTRAP_SMTP_URL_PASS,
          },
        });

        const info = await transporter.sendMail({
    from: 'noReply Nikhil More',
    to,
    subject,
    text,  
  });
   console.log("Message sent:", info.messageId);
   return info;
    }catch(error){
        console.log("Mail errore",error.message);
        throw error;
        
    }
}

export default  sendMail;