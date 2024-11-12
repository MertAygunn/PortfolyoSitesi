import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phone, subject, message } = req.body;

        // Nodemailer ile e-posta gönderme işlemi
        const transporter = nodemailer.createTransport({
            service: 'gmail', // veya kullanmak istediğin başka bir servis
            auth: {
                user: process.env.EMAIL_USER, // E-posta adresin
                pass: process.env.EMAIL_PASS, // E-posta şifren
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER, // Alıcı e-posta adresi
            subject: subject,
            text: `İsim: ${name}\nTelefon: ${phone}\nMesaj: ${message}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'E-posta başarıyla gönderildi!' });
        } catch (error) {
            return res.status(500).json({ error: 'E-posta gönderme sırasında bir hata oluştu.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}