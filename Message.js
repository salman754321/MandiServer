require('dotenv').config({path:'../.env'})
accountSid = process.env.ACCOUNT_SID;
authToken = process.env.AUTH_TOKEN;


const sendMessage = async (options) => {
        
  const client = require('twilio')(accountSid, authToken); 
 
  client.messages 
        .create({ 
           body: `Hi ${options.name}, your OTP is ${options.otp}`,
           messagingServiceSid: 'MG17f9fada9c506219cd4a18ead33682ed',      
           to: options.phone,
         }) 
        .then(message => console.log(message.sid)) 
        .done();
}
  

module.exports = sendMessage;







