const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, '')));

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: 'telikadama3@gmail.com', // Replace with yiour email
        pass: 'JayCode@12', // Replace with your email password or app-specific password
    },
});

// Endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
    const { name, email, phone, date, time } = req.body;

    try {
        // Validate form data
        if (!name || !email || !phone || !date || !time) {
            throw new Error('All fields are required.');
        }

        // Send email
        const mailOptions = {
            from: 'your-email@gmail.com', // Sender email
            to: 'telikaadama3@gmail.com', // Receiver email
            subject: 'New Booking Request',
            text: `
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                Preferred Date: ${date}
                Preferred Time: ${time}
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error:', error.message); // Log the error message
        res.status(500).json({ message: `An error occurred: ${error.message}` });
    }
});

// Serve the frontend HTML file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  'booking.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});