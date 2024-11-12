import nodemailer from 'nodemailer';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phone, subject, message } = req.body;

        // Nodemailer ile e-posta gönderme ayarları
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.OUTLOOK_USER, // Çevresel değişken
                pass: process.env.OUTLOOK_PASSWORD, // Çevresel değişken
            },
        });

        // E-posta içeriği
        const mailOptions = {
            from: process.env.OUTLOOK_USER, // Gönderen e-posta adresi
            to: email, // Alıcı e-posta adresi (formdan gelen)
            subject: subject, // Formdan gelen konu
            text: message, // Formdan gelen mesaj
        };

        // E-posta gönderme işlemi
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(200).json({ message: 'E-posta başarıyla gönderildi!' });
        });
    } else {
        // Eğer GET isteği gelirse 405 hatası döndür
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}