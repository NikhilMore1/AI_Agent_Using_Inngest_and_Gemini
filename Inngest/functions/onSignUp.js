import { NonRetriableError } from "inngest";
import userModel from "../../models/users.models";
import { inngestClient } from "../client";
import sendMail from "../../utils/mailer";

const onSignUp = inngestClient.createFunction({
    id:"onUserSignUp",retries:2
},
{event:"user/signup"},
async({event,step}) =>{
    try {
        const {email} = event.data;
       const user =  await step.run("get-user-mail",async()=>{
          const UserObj =  await userModel.findOne({email});
          if(!UserObj){
            throw new NonRetriableError("User not found in database");
          }
          return UserObj;
        })

        await step.run("send-welcome-email",async()=>{
            const subject = "Welcome to out app";
            const message = "Hi Nikhil in our app";

            await sendMail(user.email,subject,message);
        })

        return {success:true};
    } catch (error) {
        console.log("Error in onSignUp",error.message);
        
    }
}
)