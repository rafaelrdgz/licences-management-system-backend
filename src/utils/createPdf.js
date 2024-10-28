import { jsPDF } from "jspdf"; // Asegúrate de importar correctamente jsPDF
import "jspdf-autotable"; // Importa el módulo de autoTable
import dayjs from "dayjs";

export const entityReport = (info) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Ficha de Entidad Asociada", 20, 20);

  doc.setFontSize(12);
  doc.text(`Código de entidad: ${info.code}`, 20, 40);
  doc.text(`Nombre: ${info.name}`, 20, 50);
  doc.text(`Tipo: ${info.type}`, 20, 60);
  doc.text(`Dirección: ${info.address}`, 20, 70);
  doc.text(`Teléfono: ${info.phone}`, 20, 80);
  doc.text(`Email: ${info.email}`, 20, 90);
  doc.text(`Nombre del director: ${info.directorName}`, 20, 100);

  return doc;
};

export const centerReport = (info) => {
  const pdf = new jsPDF();

  // Configurar el título y la imagen del logo
  pdf.setFontSize(20);
  pdf.text("Ficha del Centro", 20, 30);
  //pdf.text('Ficha del Centro', 105, 30, { align: "right" });

  /*if (info.logo) {
      pdf.addImage(info.logo, "PNG", 80, 40, 30, 30); // Ajustar la posición y tamaño del logo
    }*/

  pdf.setFontSize(12);
  let yPosition = 40;

  // Configurar el contenido de los campos
  const fields = [
    { label: "Nombre:", value: info.name },
    {
      label: "Dirección:",
      value: info.address,
    },
    { label: "Teléfono:", value: info.phone },
    {
      label: "Nombre del director:",
      value: info.directorName,
    },
    { label: "Jefe de Recursos Humanos:", value: info.humanResourcesName },
    {
      label: "Responsable de Contabilidad:",
      value: info.accountantName,
    },
    {
      label: "Secretario del Sindicato:",
      value: info.syndicateSecretaryName,
    },
  ];

  // Escribir cada campo en el PDF
  fields.forEach((field) => {
    pdf.text(`${field.label} ${field.value}`, 20, yPosition);
    yPosition += 10; // Espacio entre líneas
  });

  return pdf;
};

export const driverReport = (info) => {
  const doc = new jsPDF(); // Crea una nueva instancia de jsPDF

  doc.setFontSize(18);
  doc.text("Ficha de Conductor", 20, 20);

  doc.setFontSize(12);
  doc.text(`Número de identidad: ${info.id}`, 20, 40);
  doc.text(`Nombre: ${info.name}`, 20, 50);
  doc.text(`Apellidos: ${info.lastNames}`, 20, 60);
  doc.text(`Dirección: ${info.address}`, 20, 70);
  doc.text(`Teléfono: ${info.phoneNumber}`, 20, 80);
  doc.text(`Estado de licencia: ${info.licenseStatus}`, 20, 90);

  doc.setFontSize(16);
  doc.text("Licencias emitidas", 20, 100);

  const licenses = info.licensesRows.map((license) => [
    license.id,
    license.category,
    license.issueDate,
    license.expirationDate,
  ]);

  // Usa autoTable para crear la tabla de licencias
  doc.autoTable({
    head: [
      ["Número de licencia", "Tipo", "Fecha de emisión", "Fecha de expiración"],
    ],
    body: licenses,
    startY: 110,
    theme: "striped",
    headStyles: { fillColor: [22, 160, 133] },
  });

  if (info.noDataInfractions === false) {
    doc.addPage();
    doc.setFontSize(16);
    doc.text("Infracciones registradas", 20, 20);

    const infractions = info.infractionsRows.map((infraction) => [
      infraction.id,
      infraction.type,
      infraction.date,
      infraction.pointsdeDucted,
    ]);

    // Usa autoTable para crear la tabla de infracciones
    doc.autoTable({
      head: [["Código", "Tipo", "Fecha", "Puntos deducidos"]],
      body: infractions,
      startY: 30,
      theme: "striped",
      headStyles: { fillColor: [22, 160, 133] },
    });
  }

  return doc; // Devuelve el documento PDF
};

export const issuedLicensesReport = (info) => {
  const doc = new jsPDF();

  const startDate = dayjs(info.startDate);
  const endDate = dayjs(info.endDate);

  // Título del reporte
  doc.setFontSize(18);
  doc.text("Reporte de Licencias Emitidas en un Período de Tiempo", 20, 20);

  // Subtítulo con fechas
  doc.setFontSize(12);
  doc.text(`Desde: ${startDate.format("DD/MM/YYYY").toString()}`, 20, 30);
  doc.text(`Hasta: ${endDate.format("DD/MM/YYYY").toString()}`, 20, 40);

  // Licencias emitidas
  if (info.rows.length > 0) {
    const tableColumn = [
      "Código de licencia",
      "ID del conductor",
      "Categoria",
      "Fecha de emisión",
      "Fecha de vencimiento",
      "Estado de licencia",
    ];
    const tableRows = [];

    info.rows.forEach((row) => {
      const rowData = [
        row.id,
        row.driverId,
        row.category,
        row.issueDate,
        row.expirationDate,
        row.licenseStatus,
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      theme: "striped",
      headStyles: { fillColor: [22, 160, 133] },
    });
  } else {
    doc.text(
      "No se encontraron registros para el período seleccionado.",
      20,
      50
    );
  }

  return doc;
};

export const examsPerformedReport = (info) => {
  const doc = new jsPDF();

  const startDate = dayjs(info.startDate);
  const endDate = dayjs(info.endDate);

  doc.setFontSize(18);
  doc.text("Reporte de Exámenes Realizados en un Período de Tiempo", 20, 20);

  doc.setFontSize(12);
  doc.text(
    `Fecha de inicio: ${startDate.format("DD/MM/YYYY").toString()}`,
    20,
    40
  );
  doc.text(`Fecha de fin: ${endDate.format("DD/MM/YYYY").toString()}`, 20, 50);

  // Convertir las filas del DataGrid en un formato adecuado para autoTable
  const examenes = info.rows.map((row) => [
    row.id,
    row.personId,
    row.type,
    row.date,
    row.result,
    row.entityCode,
  ]);

  doc.autoTable({
    head: [
      [
        "Código del exámen",
        "Id del cliente",
        "Tipo",
        "Fecha",
        "Resultado",
        "Entidad",
      ],
    ],
    body: examenes,
    startY: 60,
    theme: "striped",
    headStyles: { fillColor: [22, 160, 133] },
  });

  return doc;
};

export const registeredInfractionsReport = (info) => {
  const doc = new jsPDF();

  const startDate = dayjs(info.startDate);
  const endDate = dayjs(info.endDate);

  // Título del PDF
  doc.setFontSize(18);
  doc.text(
    "Reporte de Infracciones Registradas en un Período de Tiempo",
    20,
    20
  );

  // Fechas de inicio y fin
  doc.setFontSize(12);
  doc.text(
    `Fecha de inicio: ${startDate.format("DD/MM/YYYY").toString()}`,
    20,
    40
  );
  doc.text(`Fecha de fin: ${endDate.format("DD/MM/YYYY").toString()}`, 20, 50);

  // Formato de los datos para la tabla
  const infracciones = info.rows.map((row) => [
    row.id,
    row.licenseId,
    row.type,
    row.date,
    row.address,
    row.pointsDeducted,
    row.paid,
  ]);

  // Generación de la tabla con autoTable
  doc.autoTable({
    head: [
      [
        "Código de infracción",
        "ID del conductor",
        "Tipo",
        "Fecha",
        "Lugar",
        "Puntos deducidos",
        "Estado de pago",
      ],
    ],
    body: infracciones,
    startY: 60,
    theme: "striped",
    headStyles: { fillColor: [22, 160, 133] },
  });

  return doc;
};

export const infractionsByTypeReport = (info) => {
  const doc = new jsPDF();

  // Título del documento
  doc.setFontSize(18);
  doc.text("Reporte Consolidado de Infracciones", 14, 22);
  doc.setFontSize(14);
  doc.text(`Año: ${info.year}`, 14, 30);

  // Resumen por tipo de infracción
  doc.setFontSize(16);
  doc.text("Resumen por tipo", 14, 40);

  // Tabla de tipos de infracción
  doc.autoTable({
    startY: 50,
    head: [
      [
        "Tipo",
        "Cantidad",
        "Total de Puntos Deducidos",
        "Multas Pagadas",
        "Multas Pendientes",
      ],
    ],
    body: info.typesRows.map((row) => [
      row.id,
      row.quantity,
      row.pointsDeducted,
      row.infractionsPaid,
      row.infractionsNoPaid,
    ]),
  });

  // Infracciones registradas
  doc.setFontSize(16);
  doc.text("Infracciones registradas", 14, 100);

  // Tabla de infracciones registradas
  doc.autoTable({
    startY: 110,
    head: [
      [
        "Código de Infracción",
        "Tipo",
        "Fecha",
        "Puntos Deducidos",
        "Estado del Pago",
      ],
    ],
    body: info.infractionsRows.map((row) => [
      row.id,
      row.type,
      row.date,
      row.pointsDeducted,
      row.paid,
    ]),
  });

  return doc;
};

export const expiredLicensesReport = (info) => {
  const doc = new jsPDF();

  const startDate = dayjs(info.startDate);
  const endDate = dayjs(info.endDate);

  // Título del PDF
  doc.setFontSize(18);
  doc.text("Reporte de Conductores con Licencias Vencidas", 20, 20);

  // Fechas de inicio y fin
  doc.setFontSize(12);
  doc.text(
    `Fecha de inicio: ${startDate.format("DD/MM/YYYY").toString()}`,
    20,
    40
  );
  doc.text(`Fecha de fin: ${endDate.format("DD/MM/YYYY").toString()}`, 20, 50);

  if (info.rows.length > 0) {
    // Formato de los datos para la tabla
    const licencias = info.rows.map((row) => [
      row.id,
      row.driverId,
      row.category,
      row.expirationDate,
      row.licenseStatus,
    ]);

    // Generación de la tabla con autoTable
    doc.autoTable({
      head: [
        [
          "Código de licencia",
          "Número de identidad",
          "Tipo de licencia",
          "Fecha de vencimiento",
          "Estado de licencia",
        ],
      ],
      body: licencias,
      startY: 60,
      theme: "striped",
      headStyles: { fillColor: [22, 160, 133] },
    });
  } else {
    doc.setFontSize(18);
    doc.text("No hay datos para mostrar", 20, 70);
  }

  return doc;
};
