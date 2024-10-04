import React, {useState, useRef} from "react";
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

    const parseFromStorage = (type:string) => {
        const stored = localStorage.getItem(type);
        const storedArray:any[] = (stored != null) ? JSON.parse(stored) : [];
        return storedArray
    }

    // parse file & update contributions in localStorage
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (file != null) {
              Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function (results: any) {
                    const nextContributionIdJson = localStorage.getItem("nextContributionId");
                    let nextContributionId: number = (nextContributionIdJson != null) ? JSON.parse(nextContributionIdJson) : 0;
                    const newFields = results.meta.fields;
                    // TODO: Ask user, which field (if any) holds the categorisation and whether to merge any column with an existing field -> Convert categories from string to references to category objects and update project fields
                    const storedFields = parseFromStorage("fields");
                    const fields = Array.from(new Set([...storedFields, ...newFields]));
                    localStorage.setItem("fields", JSON.stringify(fields))
                    const newContributions = results.data
                    const storedContributions = parseFromStorage("contributions");
                    storedContributions.forEach(contribution => {
                        contribution.id = nextContributionId;
                        nextContributionId++;
                    });
                    const contributions = [...storedContributions, ...newContributions];
                    localStorage.setItem("contributions", JSON.stringify(contributions));
                    localStorage.setItem("nextContributionId", JSON.stringify(nextContributionId));
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