'use client';

import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";

/*
TODO: Make the distinction between categories and fields clearer.
*/

const Init: React.FC = () => {
    const [projectInitialised, setProjectInitialised] = useState<boolean>(false);
    const [inputValues, setInputValues] = useState<Object[]>([]);

    const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({
            ...inputValues,
            [key]: event.target.value,
        });
    };

    const handleSubmit = (event:FormEvent) => {
        event.preventDefault();
        if (typeof window !== "undefined") {
            localStorage.setItem("projectDetails", JSON.stringify(inputValues));
            setProjectInitialised(true);
        }

    };


    return (
        <>
        {(!projectInitialised) ? (
            <div className="displayBlock">
                <h1>Initialisierung des Projekts</h1>
                <form className="info border" onSubmit={handleSubmit}>
                    <div className="info">
                        <label>Ort der Beteiligung: </label>
                        <input type="text" onChange={handleChange("place")}/>
                    </div>
                    <div className="info">
                        <label>Anfangsdatum der Beteiligung: </label>
                        <input type="date" onChange={handleChange("startDate")}/>
                    </div>
                    <div className="info">
                        <label>Enddatum der Beteiligung: </label>
                        <input type="date"  onChange={handleChange("endDate")}/>
                    </div>
                    <div className="info">
                        <label>Es konnten mehrere Kategorien pro Beitrag ausgewählt werden: </label>
                        <input type="checkbox" onChange={handleChange("multiCategory")}/>
                    </div>
                    <button type="submit" className="btn">Projekt anlegen</button>
                </form>
            </div>
        ) : (
        <>
        <div className="displayBlock">
            <h1>Das Projekt wurde eingerichtet! Fügen Sie jetzt die Beiträge hinzu.</h1>
            <div className="info">
                <h2>Möchten Sie zuerst Beiträge aus einer CSV-Datei importieren? (empfohlen)</h2>
                <Link href={"/edit/file-upload"} className="btn">Datei hochladen</Link>
            </div>
            <br/>
            <div className="info">
                <h2>Oder möchten Sie die ersten Beiträge manuell eingeben?</h2>
                <Link href={"/edit/categories"} className="btn">Manuelle Eingabe</Link>
            </div>
        </div>
        </>)}
        </>  
    )
}

export default Init;