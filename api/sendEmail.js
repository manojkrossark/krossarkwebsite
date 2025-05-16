import nodemailer from 'nodemailer';
import axios from 'axios';

const secretKey = process.env.RECAPTCHA_SECRET;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

export default async function handler(req, res) {
    console.log(" /api/sendEmail hit with method:", req.method);
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ type: 'danger', message: 'Method Not Allowed' });
  }

  const { name, email, subject, message, organization, 'g-recaptcha-response': captchaToken } = req.body;

  if (!captchaToken) {
    return res.status(400).json({
      type: 'danger',
      message: 'reCAPTCHA verification failed. Please try again.',
    });
  }

  try {
    // reCAPTCHA verification
    const captchaRes = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: secretKey,
          response: captchaToken,
        },
      }
    );

    if (!captchaRes.data.success) {
      return res.status(400).json({
        type: 'danger',
        message: 'reCAPTCHA failed.',
      });
    }

    if (!name || !email || !message) {
      return res.status(400).json({
        type: 'danger',
        message: 'All fields are required.',
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      secure: true,
    });

    await transporter.sendMail({
      from: email,
      replyTo: email,
      to: 'info@krossark.com',
      subject: subject || 'Contact us',
      html: `
        <h2>Contact Form Submission</h2>
        <strong>Name:</strong> ${name}<br>
        <strong>Email:</strong> ${email}<br>
        ${organization ? `<strong>Organization:</strong> ${organization}<br>` : ''}
        <strong>Subject:</strong> ${subject}<br><br>
        <strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}
      `,
    });

    return res.status(200).json({ type: 'success', message: 'Message sent successfully.' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: 'danger', message: 'Server error: ' + error.message });
  }
}
