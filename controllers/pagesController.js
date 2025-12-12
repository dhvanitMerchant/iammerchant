const Author = require('../models/author');
require('dotenv').config();

exports.show = (req, res) => {
    const path = (req.path === '/') ? '/home' : req.path;
    
    //render the view
    res.render(`pages${path}`);
};


exports.create = (req, res) => {
  // using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
Author.findOne({
  _id: req.session.userId
})
.then(author => {
  
  Author.create(req.body.author)
  .then(() => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: req.body.author.email,
    from: 'dhvanit24merchant@gmail.com',
    subject: 'There is no failure. Only feedback.',
    text: 'Dhvanit Merchant',
    html: '<p>Dear '+req.body.author.firstName+' '+req.body.author.lastName+'<br><br>Thanks For Your Feedback!!<br>'
  };

  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
   
      if (error.response) {
        console.error(error.response.body)
      }
    }
  })();
  console.log(req.body.author.comments)


    req.flash('success', 'Thank you for your Feedback 😍🤗');
    res.redirect('./#contact');
  })
  .catch(err => {
    req.flash('error', `ERROR: ${err}`);
    res.redirect('/');
  });
  
})
.catch(err => {
  req.flash('error', `ERROR: ${err}`);
  res.redirect('/');
});
};
