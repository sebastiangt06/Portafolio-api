const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

//server usado para enviar emails
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server iniciado en puerto 5000"));
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);
//kseslcjqyqwbxhtt

const contactEmail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "sebastiangp0612@gmail.com",
    pass: "djgssewsxncrhsio"
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: "segutierrezpe@unal.edu.co",
    subject: "Quiero contactar contigo! - Portafolio",
    html: `<p>Nombre : ${name}</p>
            <p>Correo electronico : ${email}</p>
            <p>Telefono : ${phone}</p>
            <p>Mensaje : ${message}</p>`,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message sent" });
    }
  });
});
