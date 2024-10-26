import React, {useState, useRef, useEffect} from "react";
import { Contribution, Category, generateId, getContributions, getCategories, Field, getFields } from "@/app/utils";
import Papa from "papaparse";
import Link from "next/link";

const CategoryStep: React.FC<{fields: Field[], onSelect: Function}> = ({fields, onSelect}) => {
    const [selected, setSelected] = useState<string>("none");
    const [seperator, setSeperator] = useState<string>("");
    let multiCategoryEnabled = useRef(false)

    useEffect(() => {
        const multiCategoryEnabledString = localStorage.getItem("multiCategoryEnabled");
        multiCategoryEnabled.current = (multiCategoryEnabledString) ? JSON.parse(multiCategoryEnabledString) : true // multiCategory is enabled by default
    });
    
    return (
        <div>
            <h2 className="info">In welchem Datenfeld befinden sich die Kategorien, die Sie später bearbeiten möchten?</h2>
            <select defaultValue={"none"} onChange={(e) => setSelected(e.target.value)} className="info">
                <option value={"none"}>Es sind noch keine Kategorien in den Daten</option>
                {fields.map((field) => (
                    <option key={field.id} value={field.name}>
                        {field.name}
                    </option>
                ))}
            </select><br/>
            {(multiCategoryEnabled.current && selected !== "none") && (<>
                <h2 className="info">Kann ein Beitrag mehrere Kategorien haben? Wenn ja, durch welches Zeichen sind die Kategorien getrennt?</h2>
                <select defaultValue={""} onChange={(e) => setSeperator(e.target.value)}className="info">
                    <option value="">Es gibt nur eine Kategorie pro Beitrag</option>
                    <option value=";"> ; </option>
                    {/* TODO: Add more options and let user input custom seperator value */}
                </select><br/></>
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

    const [fields, setFields] = useState<Field[]>([]);

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
                    const fileFields: Field[] = []
                    const fileFieldNames: string[] = results.meta.fields;
                    const storedFields = getFields();
                    storedFields.forEach((field) => {
                        if (fileFieldNames.includes(field.name)) {
                            fileFields.push(field);
                            fileFieldNames.splice(fileFieldNames.indexOf(field.name), 1);
                        };
                    });
                    fileFieldNames.forEach(fieldName => {
                        const newField: Field = {
                            id: generateId(),
                            name: fieldName,
                            type: "Text"
                        };
                        fileFields.push(newField);
                    });
                    setFields(fileFields);
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

        const fieldsWithoutCategory = fields.filter(field => field.name !== selectedField);
        const categories = getCategories();
        const contributions: Contribution[] = [];

        data.forEach((contributionFromData: Contribution) => {
            const contribution: Contribution = {
                id: generateId(),
                categories: [],
                categories_confirmed: false,
            }; 
            fieldsWithoutCategory.forEach(field => {
                if (contributionFromData[field.name]) contribution[field.id] = contributionFromData[field.name];
            });
            // Check if Contribution has selected key. If so, convert to category field
            if (Object.keys(contributionFromData).includes(selectedField)) {
                let categoryNames: string[]
                if (seperator) {
                    categoryNames = contributionFromData[selectedField].split(seperator);
                    categoryNames = categoryNames.filter ((item) => {
                        return item !== ""
                    })
                }
                else {
                    categoryNames = [contributionFromData[selectedField]]
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
            };
            contributions.push(contribution);
        });

        const storedContributions = getContributions();
        if (typeof window !== "undefined"){
            localStorage.setItem("categories", JSON.stringify(categories));
            localStorage.setItem("contributions", JSON.stringify([...storedContributions, ...contributions]));
            localStorage.setItem("fields", JSON.stringify(fieldsWithoutCategory));
            setMessageText('"' + file.name + '" wurde hochgeladen');
            setCategoryFieldSet(true)
        }
    }

    const renderFileUpload = () => {
        if (!fileUploaded) {
            return (
                <form onSubmit={handleSubmit}>
                    <input type="file" accept=".csv" ref={fileInputRef} onChange={e => handleChange(e.target.files)}/>
                    <br/>
                    <button type="submit" className="btn">Hochladen</button>
                    <br/>
                </form>
            )
        }
        else if (!categoryFieldSet) {
            return (
                <CategoryStep 
                    fields={fields}
                    onSelect={handleSelect}
                />
            )
        }
    };

    return(
        <div>
        {renderFileUpload()}
        <span className="info">{messageText}</span>
        <br/>
        {(fileUploaded && categoryFieldSet) && (<>
        <button className="btn" onClick={() => {
            setFileUploaded(false); 
            setCategoryFieldSet(false);
            setMessageText("")
        }}>
            Weitere Datei hochladen
        </button>
            <Link className="btn" href={"/edit/coding"}>
                Weiter zur Codierung
            </Link>
            </>
        )}
        </div>
    );
}

export default FileUpload;