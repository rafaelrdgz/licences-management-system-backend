import transporter from "../configs/emailTransporterConfig.js";
import ReportsServices from "../services/reportsServices.js";
import {
  driverReport,
  examsPerformedReport,
  expiredLicensesReport,
  infractionsByTypeReport,
  issuedLicensesReport,
  registeredInfractionsReport,
} from "../utils/createPdf.js";

export const getDriverReport = async (req, res) => {
  try {
    const driverId = req.params.driverId;
    const result = await ReportsServices.getDriverReport(driverId);
    res.status(200).json(result.rows[0].get_conductor_details);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const sendDriverReport = async (req, res) => {
  try {
    const { info } = req.body;
    const email = req.user.email; // Obtiene el email del payload del token

    // Generar el PDF en memoria
    const doc = driverReport(info);

    // Guardar el PDF en un buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer")); // Convertir ArrayBuffer a Buffer

    // Enviar el PDF por correo electrónico
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Ficha del conductor",
      text: "Adjunto encontrarás la ficha del conductor solicitada.",
      attachments: [
        {
          filename: "Ficha_de_Conductor.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log(`PDF enviado a ${email}`);

    // Responder con el PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Ficha_de_Conductor.pdf"'
    );
    res.send(Buffer.from(pdfBuffer));
  } catch (err) {
    console.error("Error al generar o enviar el PDF:", err);
    res.status(500).send({ message: "Error al generar el PDF" });
  }
};

export const getLicensesReport = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const result = await ReportsServices.getLicensesReport(startDate, endDate);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const sendLicensesReport = async (req, res) => {
  try {
    const { info } = req.body;
    const email = req.user.email; // Obtiene el email del payload del token

    // Generar el PDF en memoria
    const doc = issuedLicensesReport(info);

    // Guardar el PDF en un buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer")); // Convertir ArrayBuffer a Buffer

    // Enviar el PDF por correo electrónico
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reporte de licencias emitidas",
      text: "Adjunto encontrarás el reporte solicitado.",
      attachments: [
        {
          filename: "Licencias_emitidas.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log(`PDF enviado a ${email}`);

    // Responder con el PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Licencias_emitidas.pdf"'
    );
    res.send(Buffer.from(pdfBuffer));
  } catch (err) {
    console.error("Error al generar o enviar el PDF:", err);
    res.status(500).send({ message: "Error al generar el PDF" });
  }
};

export const getExamsReport = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const result = await ReportsServices.getExamsReport(startDate, endDate);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const sendExamReport = async (req, res) => {
  try {
    const { info } = req.body;
    const email = req.user.email; // Obtiene el email del payload del token

    // Generar el PDF en memoria
    const doc = examsPerformedReport(info);

    // Guardar el PDF en un buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer")); // Convertir ArrayBuffer a Buffer

    // Enviar el PDF por correo electrónico
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reporte de examenes realizados",
      text: "Adjunto encontrarás el reporte solicitado.",
      attachments: [
        {
          filename: "Examenes_realizados.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log(`PDF enviado a ${email}`);

    // Responder con el PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Examenes_realizados.pdf"'
    );
    res.send(Buffer.from(pdfBuffer));
  } catch (err) {
    console.error("Error al generar o enviar el PDF:", err);
    res.status(500).send({ message: "Error al generar el PDF" });
  }
};

export const getInfractionsReport = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const result = await ReportsServices.getInfractionsReport(
      startDate,
      endDate
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const sendInfractionsReport = async (req, res) => {
  try {
    const { info } = req.body;
    const email = req.user.email; // Obtiene el email del payload del token

    // Generar el PDF en memoria
    const doc = registeredInfractionsReport(info);

    // Guardar el PDF en un buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer")); // Convertir ArrayBuffer a Buffer

    // Enviar el PDF por correo electrónico
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reporte de infracciones registradas",
      text: "Adjunto encontrarás el reporte solicitado.",
      attachments: [
        {
          filename: "Infracciones_registradas.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log(`PDF enviado a ${email}`);

    // Responder con el PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Infracciones_registradas.pdf"'
    );
    res.send(Buffer.from(pdfBuffer));
  } catch (err) {
    console.error("Error al generar o enviar el PDF:", err);
    res.status(500).send({ message: "Error al generar el PDF" });
  }
};

export const getExpiredLicensesReport = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const result = await ReportsServices.getExpiredLicensesReport(
      startDate,
      endDate
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const sendExpiredLicensesReport = async (req, res) => {
  try {
    const { info } = req.body;
    const email = req.user.email; // Obtiene el email del payload del token

    // Generar el PDF en memoria
    const doc = expiredLicensesReport(info);

    // Guardar el PDF en un buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer")); // Convertir ArrayBuffer a Buffer

    // Enviar el PDF por correo electrónico
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reporte de licencias vencidas",
      text: "Adjunto encontrarás el reporte solicitado.",
      attachments: [
        {
          filename: "Licencias_vencidas.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log(`PDF enviado a ${email}`);

    // Responder con el PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Licencias_vencidas.pdf"'
    );
    res.send(Buffer.from(pdfBuffer));
  } catch (err) {
    console.error("Error al generar o enviar el PDF:", err);
    res.status(500).send({ message: "Error al generar el PDF" });
  }
};

export const getInfractionsByType = async (req, res) => {
  const { year } = req.params;
  console.log(year);
  try {
    const result = await ReportsServices.getInfractionsByType(year);
    res.json(result.rows[0].get_infractions_by_type);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getInfractionsByYear = async (req, res) => {
  const { year } = req.params;
  console.log(year);
  try {
    const result = await ReportsServices.getInfractionsByYear(year);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const sendInfractionsByTypeAndYearReport = async (req, res) => {
  try {
    const { info } = req.body;
    const email = req.user.email; // Obtiene el email del payload del token

    // Generar el PDF en memoria
    const doc = infractionsByTypeReport(info);

    // Guardar el PDF en un buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer")); // Convertir ArrayBuffer a Buffer

    // Enviar el PDF por correo electrónico
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reporte de infracciones por tipo",
      text: "Adjunto encontrarás el reporte solicitado.",
      attachments: [
        {
          filename: "Infracciones_por_tipo.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log(`PDF enviado a ${email}`);

    // Responder con el PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Infracciones_por_tipo.pdf"'
    );
    res.send(Buffer.from(pdfBuffer));
  } catch (err) {
    console.error("Error al generar o enviar el PDF:", err);
    res.status(500).send({ message: "Error al generar el PDF" });
  }
};
