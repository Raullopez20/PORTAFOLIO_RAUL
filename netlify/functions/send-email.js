const { createTransport } = require("nodemailer");

exports.handler = async (event) => {
  try {
    console.log("Received event:", event);

    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Método no permitido" }),
      };
    }

    const { name, email, message } = JSON.parse(event.body);
    console.log("Parsed body:", { name, email, message });

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Faltan datos del formulario" }),
      };
    }

    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "raullopez20r@gmail.com",
      subject: "Nuevo mensaje desde tu portafolio",
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Correo enviado correctamente" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "No se pudo enviar el correo",
        details: error.message,
      }),
    };
  }
};
