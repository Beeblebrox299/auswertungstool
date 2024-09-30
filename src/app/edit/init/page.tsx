'use client';

import React from "react";
import CategoryEdit from "@/app/components/Project/CategoryEdit";
import FieldEdit from "@/app/components/Project/FieldEdit";
import FileUpload from "@/app/components/Project/FileUpload";

/*
TODO: Add input for fields. Make the distinction between categories and fields very clear.
TODO: Can a contribution have more than one category?
*/

const Init: React.FC = () => {
    return (
        <>
        <div>
            Möchten Sie das Projekt aus einer CSV-Datei erstellen?
            <FileUpload/>
        </div>
        <br/>
        <div>
            Bitte wählen Sie aus, welche Datenfelder die Beiträge haben
            <FieldEdit/>

            Bitte wählen Sie mögliche Kategorien
            <CategoryEdit/>
        </div>
        </>  
    )
}

export default Init;