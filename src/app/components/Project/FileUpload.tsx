import React, {useState} from "react";
import Papa from "papaparse";

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
    // parse file & update contributionArray
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (file != null) {
              Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function (results: any) {
                    const storedContributions = localStorage.getItem("contributions");
                    let contributions: Object[]
                    if (storedContributions == null) {
                        contributions = results.data
                    }
                    else {
                        contributions = [...JSON.parse(storedContributions), ...results.data]
                    }
                    localStorage.setItem("contributions", JSON.stringify(contributions))
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
        </div>
    );
}

export default FileUpload;