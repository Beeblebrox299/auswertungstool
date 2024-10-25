'use client';

import React from "react";
import FileUpload from "@/app/components/Project/edit/FileUpload";
import Link from "next/link";

/*
TODO: Make the distinction between categories and fields clearer.
*/

const Init: React.FC = () => {
    return (
        <>
        <div className="displayBlock">
            <h1>Möchten Sie das Projekt aus einer CSV-Datei erstellen?</h1>
            <FileUpload/>
        </div>
        <br/>
        <div className="displayBlock">
            <h1>Oder möchten Sie die ersten Beiträge manuell eingeben?</h1>
            <Link href={"/edit/init/manual"} className="btn">Manuelle Eingabe</Link>
        </div>
        </>  
    )
}

export default Init;