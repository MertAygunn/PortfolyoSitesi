// api/sendEmail.js
import nodemailer from "nodemailer"; // Nodemailer modülünü içe aktar

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, phone, subject, message } = req.body;

    // Nodemailer için taşıyıcıyı oluştur
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS kullanımı için false
      auth: {
        user: process.env.EMAIL_USER, // Çevresel değişken
        pass: process.env.EMAIL_PASS, // Çevresel değişken
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Gönderen e-posta adresi
      to: "mertprojemaili@gmail.com", // Hedef e-posta adresi
      subject: subject,
      text: `Ad: ${name}\nEmail: ${email}\nTelefon: ${phone}\nMesaj: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "E-posta gönderildi!" });
    } catch (error) {
      console.error("E-posta gönderim hatası:", error); // Hata mesajını konsola yaz
      res.status(500).json({ error: "E-posta gönderilemedi." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
