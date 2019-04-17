
const accountSid = 'ACa4523403df61957ea3ee2dc41df8ae32';
const authToken = '47b85c5369f95dc6f4ac57a9855198dd';

const client = require('twilio')(accountSid, authToken);

client.messages.create(
  {
    to: '+12063519326',
    from: '+12063393758',
    body: 'Wheres my money?',
  },
  (err, message) => {
    console.log(message.sid);
  }
);


