import jsPDF from 'jspdf';

export const generateCertificatePDF = (certificate, currentUser) => {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Background
  pdf.setFillColor(253, 252, 251);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Certificate area
  const margin = 20;
  const certX = margin;
  const certY = margin;
  const certWidth = pageWidth - (margin * 2);
  const certHeight = pageHeight - (margin * 2);
  
  // Gold border
  pdf.setFillColor(180, 134, 52);
  pdf.rect(certX, certY, certWidth, certHeight, 'F');
  
  // White inner area
  pdf.setFillColor(255, 255, 255);
  pdf.rect(certX + 3, certY + 3, certWidth - 6, certHeight - 6, 'F');
  
  // Inner border
  pdf.setDrawColor(180, 134, 52);
  pdf.setLineWidth(1);
  pdf.rect(certX + 10, certY + 10, certWidth - 20, certHeight - 20, 'S');

  // Content area
  const contentX = certX + 15;
  const contentY = certY + 15;
  const contentWidth = certWidth - 30;
  const contentHeight = certHeight - 30;

  // Layout with fixed positions
  let y = contentY + 10;
  
  // Header
  pdf.setTextColor(180, 134, 52);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('EDULEARNT', pageWidth/2, y, { align: 'center' });
  
  y += 6;
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Platform Pembelajaran Teknologi Indonesia', pageWidth/2, y, { align: 'center' });

  y += 10;
  // Decorative line
  pdf.setDrawColor(180, 134, 52);
  pdf.setLineWidth(0.5);
  pdf.line(contentX + 40, y, contentX + contentWidth - 40, y);

  y += 15;
  // Title
  pdf.setTextColor(25, 25, 25);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('SERTIFIKAT', pageWidth/2, y, { align: 'center' });
  
  y += 7;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('PENYELESAIAN KURSUS', pageWidth/2, y, { align: 'center' });

  y += 12;
  // Content
  pdf.setTextColor(60, 60, 60);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Dengan ini menyatakan bahwa', pageWidth/2, y, { align: 'center' });

  y += 10;
  // Name
  pdf.setTextColor(25, 25, 25);
  const studentName = currentUser?.name || certificate.user?.name || 'Nama Siswa';
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(studentName.toUpperCase(), pageWidth/2, y, { align: 'center' });
  
  y += 2;
  // Name underline
  const nameWidth = pdf.getTextWidth(studentName.toUpperCase()) * 14/12;
  pdf.setDrawColor(180, 134, 52);
  pdf.setLineWidth(0.5);
  pdf.line(pageWidth/2 - nameWidth/2 - 5, y, pageWidth/2 + nameWidth/2 + 5, y);

  y += 10;
  // Course text
  pdf.setTextColor(60, 60, 60);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text('telah berhasil menyelesaikan kursus', pageWidth/2, y, { align: 'center' });

  y += 8;
  // Course name
  pdf.setTextColor(25, 25, 25);
  const courseName = certificate.course?.title || 'Nama Kursus';
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`"${courseName}"`, pageWidth/2, y, { align: 'center' });

  y += 8;
  // Level
  pdf.setTextColor(60, 60, 60);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  const courseLevel = certificate.course?.level || 'Semua Tingkat';
  pdf.text(`Tingkat ${courseLevel} - Pembelajaran Coding, AI, dan Robotika`, pageWidth/2, y, { align: 'center' });

  y += 6;
  // Achievement
  pdf.setFontSize(8);
  pdf.text('dengan menguasai seluruh materi pembelajaran yang telah ditetapkan', pageWidth/2, y, { align: 'center' });

  // Details box
  y += 15;
  const boxX = contentX + 15;
  const boxWidth = contentWidth - 30;
  const boxHeight = 15;
  
  pdf.setFillColor(248, 250, 252);
  pdf.rect(boxX, y, boxWidth, boxHeight, 'F');
  pdf.setDrawColor(180, 134, 52);
  pdf.setLineWidth(0.3);
  pdf.rect(boxX, y, boxWidth, boxHeight, 'S');
  
  // Details text
  pdf.setTextColor(25, 25, 25);
  pdf.setFontSize(7);
  pdf.setFont('helvetica', 'bold');
  
  const issueDate = new Date(certificate.issued_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  // Left side - Certificate number
  pdf.text('Nomor Sertifikat:', boxX + 5, y + 5);
  pdf.setFont('helvetica', 'normal');
  pdf.text(certificate.certificate_number, boxX + 5, y + 10);
  
  // Right side - Date
  pdf.setFont('helvetica', 'bold');
  pdf.text('Tanggal Penerbitan:', boxX + boxWidth - 50, y + 5);
  pdf.setFont('helvetica', 'normal');
  pdf.text(issueDate, boxX + boxWidth - 50, y + 10);

  // Footer - positioned after details box
  y += 20; // Add space after details box
  const footerY = y;
  
  pdf.setTextColor(25, 25, 25);
  pdf.setFontSize(7);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Yogyakarta, ' + issueDate, contentX + 15, footerY);
  
  pdf.setFontSize(6);
  pdf.text('PT. EduLearnt Indonesia', contentX + 15, footerY + 4);
  
  // Signature line
  pdf.setDrawColor(180, 134, 52);
  pdf.setLineWidth(0.3);
  pdf.line(contentX + 10, footerY + 8, contentX + 50, footerY + 8);
  
  pdf.setFontSize(6);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Tim EduLearnt', contentX + 20, footerY + 12);
  
  // Verification
  pdf.setFontSize(5);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Verifikasi: www.edulearnt.com/verify', contentX + contentWidth - 50, footerY + 6);

  // Save
  const fileName = `Sertifikat_EduLearnt_${studentName.replace(/\s+/g, '_')}_${certificate.certificate_number}.pdf`;
  pdf.save(fileName);
};