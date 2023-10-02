const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();

    // connect with the smtp
    let transporter = await nodemailer.createTransport({
        host: "smtp.gmail.email",
        port: 587,
        auth: {
            user: "mertprojemaili@gmail.com",
            pass: "otypwlryhvpwmdoe",
        },
    });

    let info = await transporter.sendMail({
        from: '"XEQ 👻" <mertprojemaili@gmail.com>', // sender address
        to: "mertaygun97@gmail.com", // list of receivers
        subject: "Hello XEQ", // Subject line
        text: "Hello XEQ", // plain text body
        html: "<b>Hello XEQ</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    res.json(info);
};

module.exports = sendMail;


/*
const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const subject = document.getElementById("subject").value;
const phone = document.getElementById("phone").value;
const message = document.getElementById("message").value;
*/

