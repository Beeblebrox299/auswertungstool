'use client';

import React, {useState} from "react";

const FileUpload: React.FC = () => {

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
            const reader = new FileReader();
            reader.readAsText(file);

            // When readAsText has fisnished, log result
            reader.onloadend = () => {
                const fileContent = reader.result;
                console.log(fileContent);
              };

            setMessageText("Datei wurde hochgeladen");
        }

        else {
            setMessageText("Bitte eine Datei auswählen!");
        };
        return
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="file" accept=".csv" onChange={e => handleChange(e.target.files)}/>
            <button type="submit">Hochladen</button>
            <p>{messageText}</p>
        </form>
    );
}

export default FileUpload;