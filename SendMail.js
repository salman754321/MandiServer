const sgMail = require("@sendgrid/mail");
require('dotenv').config({path:'../.env'})
const SendMail = async (options) => {
  console.log(process.env.SENDGRID_API_KEY)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(process.env.FROM)
  console.log(process.env.FROM_NAME)
    let subject;
    let MSG;

 
    subject="Welcome new User";
    MSG="Welcome to Farmaan</h1><h1>Thanks for Signing up on our app</h1><h3>Your OTP For Verification is is  "  + options.otp +`<br>` + "Please Type This OTP in the app to verify your account"
  
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