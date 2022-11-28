import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateResults = (roll) => {
  console.log('generate results');
  const input = document.getElementById(`pdfArea-${roll}`);
  html2canvas(input, {
    logging: true,
    letterRendering: 1,
    useCORS: true,
    allowTaint: true,
  }).then((canvas) => {
    const imgWidth = 208;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const imgData = canvas.toDataURL('img/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    setTimeout(() => {
      pdf.save(`${roll}.pdf`);
    }, roll * 700);
  });
};
