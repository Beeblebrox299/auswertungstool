import React, {useState, useRef} from "react";
import { Contribution, generateId, getContributions } from "@/app/utils";
import Papa from "papaparse";

const FileUpload: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    // File uploaded by user
    const [file, setFile] = useState<File|null>(null);

    // Message to show after user hits 'submit'
    const [messageText, setMessageText] = useState<string>('');

    const handleChange = (fileList: FileList|null) => {
        if (fileList != null) {
            setFile(fileList[0]);
            setMessageText('');
        }
    };

    // parse file & update contributions in localStorage
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (file != null) {
              Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function (results: any) {
                    const newFields: string[] = results.meta.fields;
                    // TODO: Ask user, which field (if any) holds the categorisation and whether to merge any column with an existing field -> Convert categories from string to references to category objects and update project fields
                    const storedFieldsString = localStorage.getItem("fields");
                    const storedFields:string[] = (storedFieldsString != null) ? JSON.parse(storedFieldsString) : [];
                    const fields = Array.from(new Set([...storedFields, ...newFields]));
                    localStorage.setItem("fields", JSON.stringify(fields))
                    const newContributions:Contribution[] = results.data
                    const storedContributions = getContributions();
                    newContributions.forEach(contribution => {
                        contribution.id = generateId();
                    });
                    const contributions = [...storedContributions, ...newContributions];
                    localStorage.setItem("contributions", JSON.stringify(contributions));
                    if (fileInputRef.current) {
                        fileInputRef.current.value = ""
                    }
                    setMessageText('"' + file.name + '" wurde hochgeladen');
                },
              });
        }

        else {
            setMessageText("Bitte eine Datei auswählen!");
        };
        return
    }

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <input type="file" accept=".csv" ref={fileInputRef} onChange={e => handleChange(e.target.files)}/>
            <br/>
            <button type="submit" className="btn">Hochladen</button>
            <br/>
            {messageText}
        </form>
        </div>
    );
}

export default FileUpload;