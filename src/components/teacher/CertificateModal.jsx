import React from "react";
import { Dialog } from "@material-tailwind/react";
import jsPDF from "jspdf";

export default function CertificateModal({
  open,
  onClose,
  certificateData = {},
  primaryColor = "#1c96c5",
  imageSrc = "/teacher/pdf.png",
}) {
  const {
    title = "Certificado de Conclusão",
    name = "Nome do Aluno",
    course = "Curso",
    score = "Pontuação",
    issueDate = "Data de Emissão",
  } = certificateData;

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text(title, 105, 30, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#000");

    doc.text(`Parabéns!`, 105, 50, { align: "center" });
    doc.text(`Este certificado é concedido a:`, 105, 60, { align: "center" });
    doc.setFont("helvetica", "bold");
    doc.text(name, 105, 70, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.text(`Por concluir com êxito o curso:`, 105, 80, { align: "center" });
    doc.text(course, 105, 90, { align: "center" });

    doc.text(`Pontuação: ${score}`, 105, 100, { align: "center" });
    doc.text(`Emitido em: ${issueDate}`, 105, 110, { align: "center" });

    doc.save(`${name.replace(/\s+/g, "_").toLowerCase()}_certificado.pdf`);
    onClose(); // Optional: close after download
  };

  return (
    <Dialog
      open={open}
      handler={onClose}
      size="xs"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="border-2"
      style={{ borderColor: primaryColor }}
    >
      <div className="p-4 flex flex-col gap-4 items-center bg-white rounded-xl text-center">
        <img src={imageSrc} alt="certificate" className="w-1/2" />

        <p className="font-semibold text-2xl" style={{ color: primaryColor }}>
          Parabéns
        </p>
        <p className="text-gray-700">
          {name}, seu certificado foi gerado com sucesso!
        </p>

        <button
          className="w-full rounded-xl text-white font-bold text-xl py-3"
          style={{ backgroundColor: primaryColor }}
          onClick={exportPDF}
        >
          Exportar como PDF
        </button>
      </div>
    </Dialog>
  );
}
