'use client';

import { Image } from '@/app/utils';
import React, { useEffect, useState } from 'react';

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
        <div className='displayBlock'>
            Erstelle PDF...
        </div>
    );
}

export default Report;