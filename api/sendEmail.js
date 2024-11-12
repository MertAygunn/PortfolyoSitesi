import nodemailer from 'nodemailer';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phone, subject, message } = req.body;

        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.OUTLOOK_USER, // E-posta adresiniz
                pass: process.env.OUTLOOK_PASSWORD, // Uygulama şifresi
            },
        });

        const mailOptions = {
            from: process.env.OUTLOOK_USER, // Gönderen e-posta adresi
            to: email, // Alıcı e-posta adresi
            subject: subject, // Konu
            text: message, // Mesaj içeriği
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(200). json({ message: 'Email sent successfully', info });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}