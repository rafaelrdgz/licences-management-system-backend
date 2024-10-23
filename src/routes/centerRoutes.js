import { Router } from "express";
import pool from "../DB_config.js";
import multer from "multer";

import { verifyToken } from "../jwt-middleware.js";
import { centerReport } from "../utils/createPdf.js";
import transporter from "../utils/emailTransporter.js";

const router = Router();

const storage = multer.memoryStorage(); // Almacenar en memoria para que se procese fácilmente como Buffer
const upload = multer({ storage });
router.use(verifyToken);

router.get("/center", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_centro_by_id()");
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Client not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/center", async (req, res) => {
  const {
    code,
    name,
    address,
    phone,
    directorName,
    humanResourcesName,
    accountantName,
    syndicateSecretaryName,
  } = req.body;
  const { logo: newLogoPath, oldLogoPath } = req.body;

  // Procesa la actualización del centro en la BD con los nuevos datos.
  try {
    const query = `SELECT update_centro($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    const values = [
      code,
      name,
      address,
      phone,
      directorName,
      humanResourcesName,
      accountantName,
      syndicateSecretaryName,
      newLogoPath,
    ];
    const response = await pool.query(query, values);
    res.json({
      message: "Centro actualizado exitosamente",
      response: response,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error actualizando el centro" });
  }
});

router.post("/center/pdf", verifyToken, async (req, res) => {
  try {
    const { info } = req.body;
    const email = req.user.email; // Obtiene el email del payload del token

    // Generar el PDF en memoria
    const doc = centerReport(info);

    // Guardar el PDF en un buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer")); // Convertir ArrayBuffer a Buffer

    // Enviar el PDF por correo electrónico
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Ficha del centro",
      text: "Adjunto encontrarás la ficha del centro solicitada.",
      attachments: [
        {
          filename: "Ficha_de_Centro.pdf",
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
      'attachment; filename="Ficha_de_Centro.pdf"'
    );
    res.send(Buffer.from(pdfBuffer));
  } catch (err) {
    console.error("Error al generar o enviar el PDF:", err);
    res.status(500).send({ message: "Error al generar el PDF" });
  }
});

export default router;
