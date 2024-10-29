'use client';

import { Image } from '@/app/utils';
import { Document, Page, Text, View, Image as PDFImage } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>PDF wird erstellt...</p>,
  },
);

const Report: React.FC = () => {
    const [reportContent, setReportContent] = useState<{titel: string,einleitung: string,images: Image[]}>({titel: "", einleitung: "", images: []});
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        const storedReportString = localStorage.getItem("report");
        const storedReport = (storedReportString) ? JSON.parse(storedReportString) : [];
        setReportContent(storedReport);
        const storedImagesString = localStorage.getItem("images");
        const storedImages = (storedImagesString) ? JSON.parse(storedImagesString) : [];
        setImages(storedImages);
    }, [])

    return (
        <div className='h-screen w-screen'>
            <PDFViewer className='pl-52 h-full w-full'>
                <Document>
                    <Page size="A4">
                        <View style={{ color: 'black', textAlign: 'center', margin: 30, fontSize: 30 }}>
                            <Text>{reportContent.titel}</Text>
                        </View>
                        <View style={{fontSize: 12, margin: 10}}>
                            <Text>{reportContent.einleitung + "\n \n"}</Text>
                            {images.map((image, index) => (
                                <View key={index}>
                                <Text>{image.description + "\n\n"} 
                                    
                                </Text>
                                <Text>Abbildung : {image.name}</Text>
                                <PDFImage style={{}} src={image.src}/>
                                </View>
                            ))}
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
}

export default Report;