import React, {useState, useRef} from "react";
import { Contribution, generateId, getContributions } from "@/app/utils";
import Papa from "papaparse";

interface PopupProps {
    fields: string[],
    onSelect: Function,
};

const CategoryStep: React.FC<PopupProps> = ({fields, onSelect}) => {
    const [selected, setSelected] = useState<string>("none");

    return (
        <div>
            <h2>In welchem Feld befinden sich die Kategorien, die Sie später bearbeiten möchten?</h2>
            <select defaultValue={"none"} onChange={(e) => setSelected(e.target.value)} className="info">
                <option value={"none"}>
                    Keins
                </option>
                {fields.map((field) => (
                    <option key={field} value={field}>
                        {field}
                    </option>
                ))}
            </select>
            <button className="btn" onClick={() => onSelect(selected)}>OK</button>
        </div>
    )
};

const FileUpload: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    // useStates for conditional rendering
    const [fileUploaded, setFileUploaded] = useState<boolean>(false);
    const [categoryFieldSet, setCategoryFieldSet] = useState<boolean>(false);

    const [fields, setFields] = useState<string[]>([]);

    // File uploaded by user
    const [file, setFile] = useState<File|null>(null);

    // parsed file
    const [data, setData] = useState<Record<string, any>|null>(null)

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
                    setFields(results.meta.fields);
                    setData(results.data);
                    setFileUploaded(true);
                },
              });
        }

        else {
            setMessageText("Bitte eine Datei auswählen!");
        };
        return
    };

    const handleSelect = (selectedField: string) => {
        /* 
        TODO: 
        - convert values of selectedField names to category-IDs
        - set "category" property

        Bigger Todos:
        - Enable Multi-Category contributions
            -> Ask user for seperator in file values

        copied from handleSubmit:
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
        setMessageText('"' + file.name + '" wurde hochgeladen'); */
        setCategoryFieldSet(true)
    }

    return(
        <div>
        {(!fileUploaded && !categoryFieldSet) && (
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".csv" ref={fileInputRef} onChange={e => handleChange(e.target.files)}/>
                <br/>
                <button type="submit" className="btn">Hochladen</button>
                <br/>
            </form>
        )}
        {(fileUploaded && !categoryFieldSet) && (
            <CategoryStep 
                fields={fields}
                onSelect={handleSelect}
            />
        )}
        {messageText}
        {(fileUploaded && categoryFieldSet) && (
            <button>Weitere Datei hochladen</button>
        )}
        </div>
    );
}

export default FileUpload;