import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phone, subject, message } = req.body;

        // Nodemailer ile e-posta gönderme işlemi
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com', // Outlook SMTP sunucusu
            port: 587, // TLS portu
            secure: false, // TLS kullanıldığı için false
            auth: {
                user: process.env.OUTLOOK_USER, // Vercel'den alınan Outlook e-posta adresi
                pass: process.env.OUTLOOK_PASSWORD, // Vercel'den alınan Outlook şifresi
            },
        });

        const mailOptions = {
            from: process.env.OUTLOOK_USER, // Gönderen e-posta adresi
            to: 'mertaygun97@gmail.com', // Alıcı e-posta adresini buraya yazın
            subject: subject,
            text: `İsim: ${name}\nTelefon: ${phone}\nMesaj: ${message}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'E-posta başarıyla gönderildi!' });
        } catch (error) {
            console.error('E-posta gönderim hatası:', error);
            return res.status(500).json({ error: 'E-posta gönderme sırasında bir hata oluştu.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}