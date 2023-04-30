const express = require('express');
const Mailchimp = require('mailchimp-api-v3');
const bodyParser = require('body-parser')
const mailchimp = new Mailchimp('80a79dbab2b0428630075cc0e788bdf6-us14');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/',(req,res)=>{
  const email = req.body.email
  const fName = req.body.fName
  const lName = req.body.lName

  mailchimp.post('/lists/029a93955f/members', {
    email_address: email,
        merge_fields: {
          FNAME: fName,
          LNAME: lName
        },
        status: 'subscribed'
  })
  .then(function(response) {
    res.send('Subscriber added successfully: ' + response.email_address);
  })
  .catch(function(error) {
    res.send('Error adding subscriber: ' + error.message);
  });
})

app.listen(3000, () => console.log('Example app is listening on port 3000.'));