'use client';

import React from "react";
import FileUpload from "@/app/components/Project/edit/FileUpload";

/*
TODO: Make the distinction between categories and fields clearer.
*/

const Init: React.FC = () => {
    return (
        <div className="displayBlock info">
            <h1>Datei hochladen</h1>
            <FileUpload/>
        </div>
    )
}

export default Init;