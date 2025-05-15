import nodemailer from 'nodemailer';

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Invalid request method.' });
  }

  const { name, email, company, jobTitle } = req.body;

  if (!name || !company || !jobTitle || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ status: 'error', message: 'Invalid name or email.' });
  }

  // Create reusable transporter object using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass, // Gmail App Password 
    },
  });

  const pdfLink = 'https://krossarkwebsite.vercel.app/assets/pdf/sample.pdf'; // Use actual hosted URL

  const mailOptions = {
    from: '"Krossark" <kalaiyarasan.p@krossark.com>',
    to: email,
    subject: 'Download Your Whitepaper from Krossark',
    html: `
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thanks for your interest in our whitepaper.</p>
      <p> <strong>Company:</strong> ${company}<br>
          <strong>Job Title:</strong> ${jobTitle}
          </p>
      <p><a href="${pdfLink}" download="KROSSARK.pdf" style="padding:10px 15px;background:#007BFF;color:white;text-decoration:none;border-radius:5px;">Click here to download</a></p>
      <p>Regards,<br>Krossark Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ status: 'success', message: `Email sent to ${email}.` });
  } catch (error) {
    res.status(500).json({ status: 'error', message: `Mailer Error: ${error.message}` });
  }
}
