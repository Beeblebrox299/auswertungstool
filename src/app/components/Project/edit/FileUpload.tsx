import React, {useState, useRef, useEffect} from "react";
import { Contribution, Category, generateId, getContributions, getCategories } from "@/app/utils";
import Papa from "papaparse";

interface PopupProps {
    fields: string[],
    onSelect: Function,
};

const CategoryStep: React.FC<PopupProps> = ({fields, onSelect}) => {
    const [selected, setSelected] = useState<string>("none");
    const [seperator, setSeperator] = useState<string>("");
    let multiCategoryEnabled = useRef(false)

    useEffect(() => {
        const multiCategoryEnabledString = localStorage.getItem("multiCategoryEnabled");
        multiCategoryEnabled.current = (multiCategoryEnabledString) ? JSON.parse(multiCategoryEnabledString) : false
    });
    
    return (
        <div>
            <h2>In welchem Feld befinden sich die Kategorien, die Sie später bearbeiten möchten?</h2>
            <select defaultValue={"none"} onChange={(e) => setSelected(e.target.value)} className="info">
                <option value={"none"}>Es sind noch keine Kategorien in den Daten</option>
                {fields.map((field) => (
                    <option key={field} value={field}>
                        {field}
                    </option>
                ))}
            </select>
            {multiCategoryEnabled.current && (<>
                <h2>Durch welches Zeichen sind die Kategorien getrennt?</h2>
                <select defaultValue={""} onChange={(e) => setSeperator(e.target.value)}className="info">
                    <option value="">Es gibt nur eine Kategorie pro Beitrag</option>
                    <option value=";"> ; </option>
                    {/* TODO: Add more options and let user input custom seperator value */}
                </select></>
            )}  
            <button className="btn" onClick={() => onSelect(selected, seperator)}>OK</button>
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
    const [data, setData] = useState<[]|null>(null)

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

    const handleSelect = (selectedField: string, seperator: string) => {
        if (!file || !data) {
            setMessageText("Keine Datei gefunden. Bitte Seite neu laden und nochmal versuchen!")
            throw new Error("no file selected");
        };

        const categories = getCategories();

        data.forEach((contribution: Contribution) => {
            contribution.id = generateId();
            contribution.categories = [];
            // Check if Contribution has selected key. If so, convert to category field
            if (Object.keys(contribution).includes(selectedField)) {
                let categoryNames: string[]
                if (seperator) {
                    categoryNames = contribution[selectedField].split(seperator);
                    categoryNames = categoryNames.filter ((item) => {
                        return item !== ""
                    })
                }
                else {
                    categoryNames = [contribution[selectedField]]
                };

                categoryNames.forEach(categoryName => {
                    let categoryIndex: number | null = null

                    categories.forEach((category, index) => {
                        if (category.name === categoryName) {
                            categoryIndex = index;
                        }
                    });
                    if (categoryIndex !== null) {
                        const category = categories[categoryIndex];
                        contribution.categories.push(category.id);
                        category.assignedTo.push(contribution.id);
                    }
                    else {
                        const newCategory:Category = {
                            id: generateId(),
                            name: categoryName,
                            assignedTo: [contribution.id]
                        };
                        contribution.categories.push(newCategory.id);
                        categories.push(newCategory);
                    }
                });
                delete contribution[selectedField];
            }
        });

        const storedContributions = getContributions();
        if (typeof window !== "undefined"){
            localStorage.setItem("categories", JSON.stringify(categories));
            localStorage.setItem("contributions", JSON.stringify([...storedContributions, ...data]));
            setMessageText('"' + file.name + '" wurde hochgeladen');
            setCategoryFieldSet(true)
        }
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
        <span className="info">{messageText}</span>
        <br/>
        {(fileUploaded && categoryFieldSet) && (
            <button className="btn" onClick={() => {
                setFileUploaded(false); 
                setCategoryFieldSet(false);
                setMessageText("")
            }}>
                Weitere Datei hochladen
            </button>
        )}
        </div>
    );
}

export default FileUpload;