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
                imagesArray.push({name: name, src: imgData, description: (name === "Verteilung von Altersgruppen") ? "Die Verteilung der Beiträge zur Bürgerbeteiligung zeigt eine breite Altersspanne der Teilnehmenden, wobei ein deutlicher Schwerpunkt auf den älteren Altersgruppen liegt. Der größte Anteil stammt mit jeweils rund 29 % aus den Altersgruppen 51-65 Jahre sowie 65 Jahre und älter. Die mittlere Altersgruppe der 31-50-Jährigen stellt etwa 18 % der Beiträge, gefolgt von der Gruppe der unter 18-Jährigen mit rund 14 %. Jüngere Erwachsene im Alter von 18 bis 30 Jahren machen lediglich etwa 7 % der Teilnehmenden aus, und ein kleiner Anteil von rund 4 % der Beiträge kam ohne Angabe des Alters." : "Die Verteilung der Beiträge zur Bürgerbeteiligung zeigt eine klare Schwerpunktsetzung in bestimmten Themenbereichen. Die Kategorien Infrastruktur und Mobilität sowie Ressourcen, Energie und Klima führen die Liste an, was auf ein hohes Interesse der Bürgerinnen und Bürger an umwelt- und verkehrsbezogenen Themen hinweist. Es folgen die Bereiche Lebensqualität und Gesundheit sowie Bildung und Kultur, die ebenfalls von Bedeutung sind, jedoch mit geringerer Beteiligung. Die Themenfelder Wirtschaft und Wissenschaft, Bürgerdienste und Daseinsvorsorge sind weniger stark vertreten. Diese Verteilung könnte darauf hindeuten, dass die Themen rund um Infrastruktur, Umwelt und Lebensqualität besonders zentrale Anliegen der Bevölkerung darstellen. "});
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