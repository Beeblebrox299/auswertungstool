'use client';

import React, {useState} from "react";
import Papa from "papaparse";
import { useContribution } from "../Contexts";

const FileUpload: React.FC = () => {
    const { contributionArray, setContributionArray } = useContribution()

    // File uploaded by user
    const [file, setFile] = useState<File|null>(null);

    // Message to show after user hits 'submit'
    const [messageText, setMessageText] = useState<string>('');

    const handleChange = (fileList: FileList|null) => {
        if (fileList != null) {
            setFile(fileList[0]);
            setMessageText('');
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (file != null) {
              Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function (results: any) {
                  setContributionArray([...contributionArray, ...results.data])
                },
              });

            setMessageText("Datei wurde hochgeladen");
        }

        else {
            setMessageText("Bitte eine Datei auswählen!");
        };
        return
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="file" accept=".csv, .xls, .ods" onChange={e => handleChange(e.target.files)}/>
            <button type="submit">Hochladen</button>
            <p>{messageText}</p>
        </form>
    );
}

export default FileUpload;