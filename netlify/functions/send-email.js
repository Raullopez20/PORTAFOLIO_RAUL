const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  // Permitir solo peticiones POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Método no permitido",
    };
  }

  // Extraer datos del formulario
  const { name, email, message } = JSON.parse(event.body);

  // Configurar el transporte de nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail", // Cambiar si usas otro proveedor
    auth: {
      user: process.env.EMAIL_USER, // Tu correo (configurado en Netlify)
      pass: process.env.EMAIL_PASS, // Tu contraseña o token (configurado en Netlify)
    },
  });

  // Opciones del correo
  const mailOptions = {
    from: process.env.EMAIL_USER, // Remitente
    to: "raullopez20r@gmail.com", // Correo de destino
    subject: "Nuevo mensaje desde tu portafolio",
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
  };

  try {
    // Enviar el correo
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Correo enviado correctamente" }),
    };
  } catch (error) {
    // Manejo de errores
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "No se pudo enviar el correo",
        details: error.message,
      }),
    };
  }
};
