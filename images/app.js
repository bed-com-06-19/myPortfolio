const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Change this to your desired port

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (assuming your HTML and CSS are in a 'public' folder)
app.use(express.static('public'));

// POST endpoint to handle form submission
app.post('/submitForm', (req, res) => {
  const { name, email, message } = req.body;

  // Replace the following with your email configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
    }
  });

  // Replace the following with your email settings
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'blessingskelvinsaka@gmail.com', // Your email address
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
