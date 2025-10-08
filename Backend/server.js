const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Your mail id', 
    pass: '16 charecters pass key', 
  },
});

app.post('/send-mail', async (req, res) => {
  const { email, name, message } = req.body;

  const mailOptions = {
    from: 'your mail id same as above',
    to: email,
    subject: `Message from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send email: ' + error.message);
  }
});

app.listen(2000, () => {
  console.log('Server running at http://localhost:2000');
});


// npm init -y               # (only if you haven't initialized the project)
// npm install express       # Web server framework
// npm install nodemailer    # For sending emails
// npm install cors          # To handle cross-origin requests
// npm install body-parser   # To parse JSON requests (optional if using express.json())