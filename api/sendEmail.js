export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phone, subject, message } = req.body;

        // Burada e-posta gönderme işlemini gerçekleştirin.
        // Örneğin, Nodemailer veya başka bir kütüphane kullanabilirsiniz.

        // Başarılı bir yanıt gönderin
        return res.status(200).json({ message: 'E-posta başarıyla gönderildi!' });
    } else {
        // Eğer GET isteği gelirse 405 hatası döndür
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}