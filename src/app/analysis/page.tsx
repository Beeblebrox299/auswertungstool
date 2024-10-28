'use client'

import html2canvas from "html2canvas";
import { AgePieChart, CategoriesBarChart } from "../components/Project/view/Graphics";
import { MutableRefObject, useRef, useState } from "react";
import { Image } from "../utils";
import Link from "next/link";

const Analysis: React.FC = () => {
    const categoryChartRef = useRef<HTMLDivElement>(null);
    const ageChartRef = useRef<HTMLDivElement>(null);
    const [CategoryChartExported, setCategoryChartExported] = useState<boolean>(false);
    const [ageChartExported, setAgeChartExported] = useState<boolean>(false);

    const exportChart = (chartRef: MutableRefObject<HTMLDivElement | null>, name: string) => {
        if (chartRef.current === null) return;
        html2canvas(chartRef.current).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            if (typeof window !== "undefined") {
                const imagesString = localStorage.getItem("images");
                const imagesArray: Image[] = (imagesString) ? JSON.parse(imagesString) : [];
                imagesArray.push({name: name, src: imgData});
                localStorage.setItem("images", JSON.stringify(imagesArray));
            }
        });
    };

    return(<>
        <div className="displayBlock">
            <h2>Verteilung der Kategorien (Mehrfachnennung möglich)</h2><br/>
            <div className="inline-block" ref={categoryChartRef}>
                <CategoriesBarChart/>
            </div>
            <br/>
            <button className="btn" onClick={() => {exportChart(categoryChartRef, "Verteilung der Kategorien (Mehrfachnennung möglich)"); setCategoryChartExported(true)}}>Abbildung zum Bericht hinzufügen</button><text>{(CategoryChartExported) ? "Abbildung wurde hinzugefügt!" : ""}</text>
        </div>
        <div className="displayBlock">
            <h2>Verteilung von Altersgruppen</h2><br/>
            <div className="inline-block" ref={ageChartRef}>
                <AgePieChart/>
            </div>
            <br/>
            <button className="btn" onClick={() => {exportChart(ageChartRef, "Verteilung von Altersgruppen"); setAgeChartExported(true)}}>Abbildung zum Bericht hinzufügen</button><text>{(ageChartExported) ? "Abbildung wurde hinzugefügt!" : ""}</text>
        </div>
        <div className="displayBlock">
        <h1>Nächste Schritte: </h1>
            <Link className="btn" href={"/report"}>Bericht erstellen</Link>
        </div>
        </>
    )
};

export default Analysis;