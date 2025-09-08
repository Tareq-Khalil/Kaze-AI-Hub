const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config()

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://kaze-ai-hub.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));
app.use(express.json());

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Handle all HTTP methods for /api/contact
app.all('/api/contact', async (req, res) => {
  const method = req.method;
  
  try {
    if (method === 'GET') {
      // Handle GET requests - return endpoint info
      res.status(200).json({
        success: true,
        message: 'Contact endpoint is working',
        method: 'GET',
        info: 'Use POST method with name, email, subject, and message to send contact form'
      });
    }
    
    // Handle POST requests - send email
    else if (method === 'POST') {
      const { name, email, subject, message } = req.body;

      // Validate input
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'All fields are required (name, email, subject, message)',
          method: 'POST'
        });
      }

      // Get team emails from environment variable
      const teamEmails = process.env.TEAM_EMAILS ? 
        process.env.TEAM_EMAILS.split(',').map(email => email.trim()) : 
        [process.env.EMAIL_USER];

      // Email options (now properly inside the POST handler)
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: teamEmails,                      // Nodemailer accepts array directly
        replyTo: email,
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      };

      // Send email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ 
        success: true, 
        message: 'Message sent successfully to team!',
        method: 'POST'
      });
    }
    
    else if (method === 'PUT') {
      // Handle PUT requests
      res.status(200).json({
        success: true,
        message: 'PUT request received',
        method: 'PUT',
        info: 'PUT method is supported but no specific functionality implemented'
      });
    }
    
    else if (method === 'DELETE') {
      // Handle DELETE requests
      res.status(200).json({
        success: true,
        message: 'DELETE request received',
        method: 'DELETE',
        info: 'DELETE method is supported but no specific functionality implemented'
      });
    }
    
    else if (method === 'PATCH') {
      // Handle PATCH requests
      res.status(200).json({
        success: true,
        message: 'PATCH request received',
        method: 'PATCH',
        info: 'PATCH method is supported but no specific functionality implemented'
      });
    }
    
    else {
      // Handle any other HTTP methods
      res.status(200).json({
        success: true,
        message: `${method} request received`,
        method: method,
        info: `${method} method is supported but no specific functionality implemented`
      });
    }
    
  } catch (error) {
    console.error(`Error handling ${method} request:`, error);
    res.status(500).json({ 
      success: false, 
      message: `Failed to process ${method} request. Please try again later.`,
      method: method,
      error: error.message
    });
  }
});

// Root endpoint to test server
app.all('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running!',
    method: req.method,
    endpoints: {
      '/': 'Server status (supports all methods)',
      '/api/contact': 'Contact form endpoint (supports all methods)'
    }
  });
});

module.exports = app;


console.log("server is running")
