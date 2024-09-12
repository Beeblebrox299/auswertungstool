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
                  setContributionArray([...contributionArray, ...results.data]);
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
        <div>
        <form onSubmit={handleSubmit}>
            <input type="file" accept=".csv, .xls, .ods" onChange={e => handleChange(e.target.files)}/>
            <br></br><br></br>
            <p><button type="submit">Hochladen</button><br></br>{messageText}</p>
        </form>
        <h2>Beiträge</h2>
        {contributionArray.length > 0 ? (
            <table>
                <thead>
                    <tr>
                        {/* Zeige die Schlüssel als Spaltenüberschriften */}
                        {Array.from(new Set(contributionArray.flatMap(Object.keys))).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                        {contributionArray.map((contribution, index) => (
                            <tr key={index}>
                                {/* Dynamisch die Werte anzeigen, wobei die Keys überprüft werden */}
                                {Array.from(new Set(contributionArray.flatMap(Object.keys))).map((key) => (
                                    <td key={key}>
                                        {contribution[key] !== undefined ? contribution[key] : 'N/A'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
            </table>
        ) : (   
            <p>Keine Beiträge vorhanden.</p>
        )}
    </div>
    );
}

export default FileUpload;