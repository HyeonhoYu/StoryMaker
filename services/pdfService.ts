
declare const jspdf: any;
declare const html2canvas: any;

export const downloadBookAsPDF = async (title: string): Promise<void> => {
    const { jsPDF } = jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const bookElement = document.getElementById('book-content-for-pdf');

    if (!bookElement) {
        console.error('Book content element not found for PDF generation.');
        return;
    }

    const pages = bookElement.querySelectorAll('.pdf-page') as NodeListOf<HTMLElement>;
    const totalPages = pages.length;

    for (let i = 0; i < totalPages; i++) {
        const page = pages[i];
        try {
            const canvas = await html2canvas(page, {
                scale: 2, 
                useCORS: true, 
                logging: false,
                backgroundColor: '#fdf2f8' // Match BG color
            });
            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            if (i > 0) {
                pdf.addPage();
            }
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        } catch (error) {
            console.error(`Error capturing page ${i + 1} for PDF:`, error);
        }
    }

    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    pdf.save(`${safeTitle}_storybook.pdf`);
};
