import { useEffect, useState } from "react";
import { Image } from "@/app/utils";


const defaultProject = {
    place: "[STADT]",
    startDate: "[STARTDATUM]",
    endDate: "[ENDDATUM]",
    multiCategory: "on"
}

const ReportForm: React.FC = () => {
    const getEinleitung = (project: {place: string, startDate: string, endDate: string, multiCategory: string}) => {
        return "Vom " + project.startDate + " bis zum " + project.endDate + " konnten BürgerInnen in " + project.place + " Beiträge abgeben. \nDie Ergebnisse möchten wir in diesem Bericht vorstellen."
    };

    const [graphics, setGraphics] = useState<Image[]>([]);
    const [title, setTitle] = useState<string>("Bürgerbeteiligung in " + defaultProject.place)
    const [einleitung, setEinleitung] = useState<string>(getEinleitung(defaultProject));
    useEffect (() => {
        const storedGraphics = localStorage.getItem("images");
        setGraphics((storedGraphics) ? JSON.parse(storedGraphics) : []);
        const storedProject = localStorage.getItem("projectDetails");
        setEinleitung((storedProject) ? getEinleitung(JSON.parse(storedProject)) : getEinleitung(defaultProject));
        setTitle("Bürgerbeteiligung in " + ((storedProject) ? JSON.parse(storedProject)["place"] : defaultProject.place));
    }, []);

    const storeReport = (event: React.FormEvent) => {
        const bericht: {[key: string]: any} = {
            titel: title,
            einleitung: einleitung,
            images: [],
        };
        graphics.forEach((graphic, index) => {
            const textarea = document.getElementById("description" + index)
            graphic.description = (textarea instanceof HTMLTextAreaElement) ? textarea.value : "";
            console.log(textarea, graphic.description)
        });
        if (typeof window !== "undefined") {
            localStorage.setItem("report", JSON.stringify(bericht));
            localStorage.setItem("images", JSON.stringify(graphics))
        };
    }

    return (
        <div className="displayBlock">
            <h1>Bericht erstellen</h1>
            <form>
                <div className="info border">
                    <h2>Titel des Berichts: </h2>
                    <input type="text" id="title" value={title} className="w-1/2" onChange={(e) => setTitle(e.target.value)}></input>
                </div><br/>
                <div className="info border">
                    <h2>Einleitung: </h2>
                    <textarea cols={100} rows={8} value={einleitung} onChange={(e) => setEinleitung(e.target.value)}/>
                </div>
                <div className="info border">
                    <h2>Grafiken</h2>
                    {graphics.map((image, index) => (
                        <div className="info border" key={index}>
                            <h2>{image.name}</h2>
                            <label>Grafik:</label>
                            <img src={image.src}/>
                            <br/><br/>
                            <label>Beschreibung der Grafik: </label><br/>
                            <textarea id={"description" + index} cols={50} rows={8} defaultValue={image.description}/>
                            <br/>
                            <button className="btn" onClick={(event) => {
                                event.preventDefault();
                                const updatedGraphics = [...graphics];
                                updatedGraphics.splice(index, 1);
                                console.log(graphics, updatedGraphics, index)
                                setGraphics(updatedGraphics);
                                localStorage.setItem("images", JSON.stringify(updatedGraphics));
                            }}>
                                Grafik entfernen
                            </button>
                        </div>
                    ))}
                </div>
                <button className="btn" onClick={(event) => {event.preventDefault(); storeReport(event); window.location.href = "/auswertungstool/report/pdf"}}>Bericht erstellen</button>
            </form>
        </div>
    )
};

export default ReportForm;