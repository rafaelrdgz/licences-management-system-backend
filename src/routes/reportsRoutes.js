import { Router } from "express";
import pool from "../DB_config.js";
import { verifyToken } from "../jwt-middleware.js";
import transporter from "../utils/emailTransporter.js";
import {
  driverReport,
  examsPerformedReport,
  expiredLicensesReport,
  infractionsByTypeReport,
  issuedLicensesReport,
  registeredInfractionsReport,
} from "../utils/createPdf.js";

const router = Router();
router.use(verifyToken);

router.get("/driver_report/:driverId", async (req, res) => {
  try {
    const driverId = req.params.driverId;
    const result = await pool.query("SELECT * FROM get_conductor_details($1)", [
      driverId,
    ]);
    res.status(200).json(result.rows[0].get_conductor_details);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/driver_report_pdf", verifyToken, async (req, res) => {
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
});

router.get("/licenses_report", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM get_licenses_by_date_range($1, $2)",
      [startDate, endDate]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/licenses_report_pdf", verifyToken, async (req, res) => {
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
});

router.get("/exams_report", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM get_exams_by_date_range($1, $2)",
      [startDate, endDate]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/exams_report_pdf", verifyToken, async (req, res) => {
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
});

router.get("/infractions_report", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM get_infractions_by_date_range($1, $2)",
      [startDate, endDate]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/infractions_report_pdf", verifyToken, async (req, res) => {
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
});

router.get("/expired_licenses_report", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM get_expired_licenses_by_date_range($1, $2)",
      [startDate, endDate]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/expired_licenses_report_pdf", verifyToken, async (req, res) => {
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
});

router.get("/infractions_report/by_type/:year", async (req, res) => {
  const { year } = req.params;
  console.log(year);
  try {
    const result = await pool.query(
      "SELECT * FROM get_infractions_by_type($1)",
      [year]
    );
    res.json(result.rows[0].get_infractions_by_type);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/infractions_report/by_year/:year", async (req, res) => {
  const { year } = req.params;
  console.log(year);
  try {
    const result = await pool.query(
      "SELECT * FROM get_infractions_by_year($1)",
      [year]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/infractions_report/by_type_and_year_pdf",
  verifyToken,
  async (req, res) => {
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
  }
);

export default router;
