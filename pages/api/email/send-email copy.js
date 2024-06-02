// Import nodemailer
import nodemailer from 'nodemailer';

// Create a transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '09d0447fbb7965',
        pass: 'd70a35c429c8ca'
    }
});

// Define the handler function for the API route
export default async function handler(req, res) {
    // Check if the request method is POST
    if (req.method === 'POST') {
        // Define the mail options
        const mailOptions = {
            from: 'sakil.hossain@codeclouds.com',
            to: 'sakil.hossain@codeclouds.com',
            subject: 'Test Email',
            text: 'This is a test email from your Next.js application.'
        };

        try {
            // Send the email
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        }
    } else {
        // If the request method is not POST, return a 405 Method Not Allowed status
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
