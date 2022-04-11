const sgMail = require("@sendgrid/mail");
require('dotenv').config({path:'../.env'})
const SendMail = async (options) => {
  console.log(process.env.SENDGRID_API_KEY)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let subject;
let MSG;
if(options.retailer){
  subject="Hi! Your Retailer Account has been created ";
    MSG="Please Hgo to Following Link to Access your Account http://localhost:3000    and Login with Your credentials "
}
  if(options.ok){
    console.log(123)
    subject="Welcome new User";
    MSG="Welcome to Green Bikes</h1><h1>Thanks for Signing up on our app</h1><h3>Your Username is  "  + options.cnic +`<br>` + "you Can Now Login to Our App using this Username and The Password You Choose at the time of Signup"
  }else{
    subject="We Are Sorry We cannot Create your Account at this time";
    MSG="Please try creating your account by Uploading the Desired Document "
  }
  
  console.log(options)
  console.log(MSG  , subject)
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM}>`,
    to: options.email,
    subject:subject,
    html:
      "<div style =" +
      "width:100%; height:100%;  " +
      "><h1 style=" +
      "font-weight:500>Hey, " +
        options.name +
      `<br>` +  MSG 
     
  };
  try {
    await sgMail.send(message);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }

};
module.exports = SendMail;
