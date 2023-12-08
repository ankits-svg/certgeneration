const express = require("express");
const { CertModel } = require("../models/cert.models");
const certRouter = express.Router();
const PDFDocument = require("pdfkit");
const fs = require("fs");


function formatCurrentDate() {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const currentDate = new Date();
  return new Intl.DateTimeFormat("en-US", options).format(currentDate);
}

certRouter.post("/pdf", (req, res) => {
  const { studentId, certtype, body, name, cofounder, founder } = req.body;
  // Create a PDF document
  const doc = new PDFDocument({ layout: "landscape", size: "A4" });

  // Logo image URL
  const logoPath = "assets/logo.png";
//   const logoPath2="";

  // Set response headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${studentId}_certificate.pdf`
  );

  doc.pipe(res);

  doc.rect(0, 0, doc.page.width, doc.page.height); // Change color code as needed

  doc
    .image(logoPath, 320, 50, {
      fit: [150, 60],
      align: "center",
      valign: "center",
    })
    .stroke();

    doc
    .image("assets/medal.png", 520, 100, {
      fit: [380, 170],
      align: "center",
      valign: "center",
    })
    .stroke();
  
  doc
    .font("Times-Bold")
    .fontSize(40)
    .fillColor("orange")
    .text("CERTIFICATE", 256, 120)
    .moveDown(0.5);
  
  doc
    .font("Times-Bold")
    .fontSize(10)
    .fillColor("skyblue")
    .text("* * * This is to certify that * * *", 310, 180)
    .moveDown(0.5);

  doc
    .font("Times-BoldItalic")
    .fontSize(34)
    .fillColor("orange")
    .text(`${name}`, 290, 240, {
      underline: true,
    })
    .moveDown(0.5);

  
  doc
    .font("Times-Roman")
    .fontSize(14)
    .fillColor("gray")
    .text(`has successfully cleared the assessment.`, 280, 290)
    .moveDown(0.5);

  doc
    .font("Times-Roman")
    .fontSize(14)
    .fillColor("gray")
    .text(
      `This achievement is awarded in recognition of the recipient's dedication, commitment,`,
      170,
      320
    )
    .moveDown(0.5);

    doc
    .font("Times-Roman")
    .fontSize(14)
    .fillColor("gray")
    .text(
      `and outstanding performance in ${body}, we wish him/her for endeavour future.`,
      200,
      340
    )
    .moveDown(0.5);

    
  
    doc.font('Helvetica-Bold').fontSize(19).text(`${founder}, Founder.`, doc.page.width - 320, doc.y+100, { align: 'right' });

    doc.moveTo(doc.page.width - 220, doc.y - 40).lineTo(doc.page.width - 70, doc.y - 40).lineWidth(0.6).stroke();

    doc.moveDown(0.5);
    
    doc.font("Times-Bold")
            .fontSize(14)
            .fillColor("gray")
            .text(
                `Date : ${formatCurrentDate()}`,
                130,
               450
            )
            .moveDown(0.5);

            doc.font("Times-Bold")
            .fontSize(14)
            .fillColor("gray")
            .text(
                `Certificate Id : ${studentId}`,
                330,
               507
            )
            .moveDown(0.5);

    // Border design
    doc.lineWidth(12).strokeColor('orange');
    doc.rect(20, 20, 804, 560).stroke(); // Border around the main content

    doc.circle(40, 40, 20);
    doc.stroke();

    // Circle design in the top-right corner
    doc.circle(doc.page.width - 40, 40, 20);
    doc.stroke();

    // Circle design in the bottom-left corner
    doc.circle(40, doc.page.height - 40, 20);
    doc.stroke();

    // Circle design in the bottom-right corner
    doc.circle(doc.page.width - 40, doc.page.height - 40, 20);
    doc.stroke();

  doc.end();
});


module.exports = {
  certRouter,
};
