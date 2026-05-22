const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/submitForm', (req, res) => {

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'blessingskelvinsaka@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}
Email: ${email}
Message: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {

    if (error) {
      console.log(error);
      return res.status(500).send('Error sending email');
    }

    res.status(200).send('Message sent successfully!');

  });

});

app.listen(port, async () => {

  const url = `http://localhost:${port}`;

  console.log(`Server running at ${url}`);

  const open = (await import('open')).default;

  open(url);

});