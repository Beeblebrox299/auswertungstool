'use client';

import React from "react";
import CategoryEdit from "@/app/components/Project/edit/CategoryEdit";
import FieldEdit from "@/app/components/Project/edit/FieldEdit";
import FileUpload from "@/app/components/Project/edit/FileUpload";

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
            <FieldEdit/>
            <CategoryEdit/>
        </div>
        </>  
    )
}

export default Init;