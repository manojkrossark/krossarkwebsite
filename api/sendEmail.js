import nodemailer from 'nodemailer';
import axios from 'axios';

export default async function handler(req, res) {
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
    const secretKey = '6LdoOQ0rAAAAANbvkD1jIEWjdc88rdaPavVbMO4w';
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
        user: 'kalaiyarasan.p@krossark.com',
        pass: 'iqec nhyt ketx pibx',
      },
    });

    await transporter.sendMail({
      from: email,
      to: 'kalaiyarasan.p@krossark.com',
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
