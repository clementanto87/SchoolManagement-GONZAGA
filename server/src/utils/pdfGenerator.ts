import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateApplicationForm = () => {
    return new Promise<Buffer>((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            const buffers: Buffer[] = [];

            // Collect PDF data
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });

            // Add content to the PDF
            doc.fontSize(20).text('GONZAGA MATRIC HIGHER SEC SCHOOL', {
                align: 'center',
                underline: true
            });

            doc.moveDown();
            doc.fontSize(16).text('Student Admission Form', {
                align: 'center'
            });

            doc.moveDown();
            doc.fontSize(12).text('Personal Information', {
                underline: true
            });

            // Add form fields
            doc.moveDown(0.5);
            doc.text('Student Name: _________________________________________________');
            doc.moveDown(1);
            doc.text('Date of Birth: _________________   Gender: ___________________');
            doc.moveDown(1);
            doc.text('Grade Applying For: ______________  Academic Year: ___________');
            doc.moveDown(1);
            doc.text('Previous School: _____________________________________________');

            doc.moveDown(1.5);
            doc.fontSize(12).text('Parent/Guardian Information', {
                underline: true
            });

            doc.moveDown(0.5);
            doc.text('Parent/Guardian Name: ________________________________________');
            doc.moveDown(1);
            doc.text('Contact Number: _________________  Email: ____________________');
            doc.moveDown(1);
            doc.text('Address: ____________________________________________________');
            doc.moveDown(1);
            doc.text('City: ____________________  State: ________  ZIP: __________');

            doc.moveDown(2);
            doc.font('Helvetica-Oblique').fontSize(10).text('Please submit this completed form along with the required documents to the school office.', {
                align: 'center'
            });

            // Finalize the PDF
            doc.end();
        } catch (error) {
            console.error('Error generating PDF:', error);
            reject(error);
        }
    });
};
