'use client'

import html2canvas from "html2canvas";
import { AgePieChart, CategoriesBarChart } from "../components/Project/view/Graphics";
import { MutableRefObject, useRef } from "react";

const Analysis: React.FC = () => {
    const categoryChartRef = useRef<HTMLDivElement>(null)
    const ageChartRef = useRef<HTMLDivElement>(null)

    const exportChart = (chartRef: MutableRefObject<HTMLDivElement | null>) => {
        if (chartRef.current === null) return;
        html2canvas(chartRef.current).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            window.open(imgData);
            if (typeof window !== "undefined") {
                const imagesString = localStorage.getItem("images");
                const imagesArray: string[] = (imagesString) ? JSON.parse(imagesString) : [];
                imagesArray.push(imgData);
                localStorage.setItem("images", JSON.stringify(imagesArray))
            }
        });
    };

    return(<>
        <div className="displayBlock">
            <div className="info" ref={categoryChartRef}>
                <h2>Verteilung der Kategorien (Mehrfachnennung möglich)</h2><br/>
                <CategoriesBarChart/>
            </div>
            <button className="btn" onClick={() => exportChart(categoryChartRef)}>Abbildung zum Bericht hinzufügen</button>
        </div>
        <div className="displayBlock">
            <div className="info" ref={ageChartRef}>
                <h2>Verteilung von Altersgruppen</h2><br/>
                <AgePieChart/>
            </div>
            <button className="btn" onClick={() => exportChart(ageChartRef)}>Abbildung zum Bericht hinzufügen</button>
        </div>
        </>
    )
};

export default Analysis;