exports.handler = async (event) => {
  try {
    // Verificar método HTTP
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Método no permitido" }),
      };
    }

    // Depurar datos recibidos
    console.log("Datos recibidos:", event.body);

    // Parsear datos del cuerpo de la solicitud
    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Faltan datos del formulario" }),
      };
    }

    // Configuración de nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Opciones del correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "raullopez20r@gmail.com",
      subject: "Nuevo mensaje desde tu portafolio",
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
    };

    // Enviar correo
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Correo enviado correctamente" }),
    };
  } catch (error) {
    console.error("Error en la función send-email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "No se pudo enviar el correo",
        details: error.message,
      }),
    };
  }
};
