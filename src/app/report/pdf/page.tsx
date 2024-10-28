'use client';

import { Document, Page, PDFViewer, Text } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';

const Report: React.FC = () => {
    const [reportContent, setReportContent] = useState<[]>([]);

    useEffect(() => {
        const storedReportString = localStorage.getItem("report");
        const storedReport = (storedReportString) ? JSON.parse(storedReportString) : [];
        setReportContent(storedReport);
    })

    return (
        <div className='h-screen w-screen'>
            <PDFViewer className='pl-52 h-full w-full'>
                <Document>
                    <Page size="A4">
                        <Text>Bericht!</Text>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
}

export default Report;