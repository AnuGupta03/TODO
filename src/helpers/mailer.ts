import User from '@/models/users.models';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email, emailType, userId}:any) => 
    {
        try{
          const hashedToken = await  bcryptjs.hash(userId.toString(), 10)
          console.log("MAIL", userId);
          console.log("EMAIL TYPE", emailType);
          console.log(typeof emailType);

            if(emailType === "VERIFY"){
                const updatedUser = await User.findByIdAndUpdate(userId, 
                  {
                    $set: {
                      verifyToken: hashedToken, 
                      verifyTokenExpiry: new Date(Date.now() + 3600000) //Expiry 1 hour from now
                  }                  
            })
            console.log(updatedUser);
            
            } else if(emailType === "RESET"){
              await User.findByIdAndUpdate(userId, 
                {
                  $set: {
                    forgotPasswordToken: hashedToken, 
                    forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
                  }
                });
            }
            
            var transport = nodemailer.createTransport({
              host: "sandbox.smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "e2ebf960159b44",  
                pass: "36ba01ae3fcadb"
              }
            });

              const mailOptions = {
                from: 'anuradhagwl98@gmail.com',
                to: email, 
                subject: emailType === 'VERIFY' ? "VERIFY YOUR Email" : "Reset your password",
                html: `<p>Click <a href="${process.env.DOMIAN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                or copy and paste the link below in your browser.
                <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>`,
              }

              const mailResopnse = await transport.sendMail(mailOptions)
              return mailResopnse

        } catch(error:any){
            throw new Error(error.message)            
        }
    }