import React, {useState, useRef, useEffect} from "react";
import { Contribution, Category, generateId, getContributions, getCategories, Field, getFields } from "@/app/utils";
import Papa from "papaparse";
import Link from "next/link";



const FileUpload: React.FC = () => {
    const CategoryStep: React.FC = () => {
        // name of field that holds categories and char that seperates categories
        const [selectedField, setSelectedField] = useState<string>("none");
        const [selectedSeperator, setSelectedSeperator] = useState<string>("");
        let multiCategoryEnabled = useRef(true)

        useEffect(() => {
            const multiCategoryEnabledString = localStorage.getItem("multiCategoryEnabled");
            multiCategoryEnabled.current = (multiCategoryEnabledString) ? JSON.parse(multiCategoryEnabledString) : true // multiCategory is enabled by default
        });
        
        return (
            <div>
                <h2 className="info">In welchem Datenfeld befinden sich die Kategorien, die Sie später bearbeiten möchten?</h2>
                <select defaultValue={"none"} onChange={(e) => setSelectedField(e.target.value)} className="info">
                    <option value={"none"}>Es sind noch keine Kategorien in den Daten</option>
                    {fields.map((field) => (
                        <option key={field.id} value={field.name}>
                            {field.name}
                        </option>
                    ))}
                </select><br/>
                {multiCategoryEnabled.current}
                {(multiCategoryEnabled.current && selectedField !== "none") && (<>
                    <h2 className="info">Kann ein Beitrag mehrere Kategorien haben? Wenn ja, durch welches Zeichen sind die Kategorien getrennt?</h2>
                    <select defaultValue={""} onChange={(e) => setSelectedSeperator(e.target.value)}className="info">
                        <option value="">Es gibt nur eine Kategorie pro Beitrag</option>
                        <option value=";"> ; </option>
                        {/* TODO: Add more options and let user input custom seperator value */}
                    </select><br/></>
                )}  
                <button className="btn" onClick={() => { 
                    setCategoryField(selectedField);
                    setCategorySeperator(selectedSeperator);
                    setCategoryFieldSet(true);
                }}>
                    OK
                </button>
            </div>
        )
    };

    // Detect field types and let user confirm (hardcoded because of time)
    const FieldStep:React.FC = () => {

        return(
            <div className="info">
            <h2>Das Datenfeld &quot;Altergruppe&quot; scheint eine begrenzte Anzahl an Antwortmöglichkeiten zu haben. Ich konnte diese Werte finden:</h2>
                <ul className="info border">
                    <li>Keine Angabe</li>
                    <li>Unter 18 Jahre</li>
                    <li>18-30 Jahre</li>
                    <li>31-50 Jahre</li>
                    <li>51-65 Jahre</li>
                    <li>65 Jahre und älter</li>
                </ul>
                <br/>
            <h2>Wollen Sie das so speichern?</h2>
            <button className="btn" onClick={() => {
                handleSelect(categoryField, categorySeperator);
                setAgeFieldConfirmed(true);
            }}>Ja</button>
        </div>
        )
    };

    const fileInputRef = useRef<HTMLInputElement>(null)

    // useStates for conditional rendering
    const [fileUploaded, setFileUploaded] = useState<boolean>(false);
    const [categoryFieldSet, setCategoryFieldSet] = useState<boolean>(false);
    const [ageFieldConfirmed, setAgeFieldConfirmed] = useState<boolean>(false);

    // 
    const [fields, setFields] = useState<Field[]>([]);

    // File uploaded by user
    const [file, setFile] = useState<File|null>(null);

    // parsed file
    const [data, setData] = useState<[]|null>(null);


    // name of field that holds categories and char that seperates categories
    const [categoryField, setCategoryField] = useState<string>("none");
    const [categorySeperator, setCategorySeperator] = useState<string>("");

    // Message to show after user hits 'submit'
    const [messageText, setMessageText] = useState<string>('');

    useEffect(() => {
        setFields(getFields())
    }, [])

    const handleChange = (fileList: FileList|null) => {
        if (fileList != null) {
            setFile(fileList[0]);
            setMessageText('');
        };
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
                    const storedFields = [...fields]
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
                        if (fieldName === "Altersgruppe") newField.type = ["Unter 18 Jahre", "18-30 Jahre", "31-50 Jahre", "51-65 Jahre", "65 Jahre und älter"]
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
                <CategoryStep/>
            )
        }
        else if (!ageFieldConfirmed) {
            return(
                <FieldStep/>
            )
        }
    };

    return(
        <div>
            {renderFileUpload()}
            <span className="info">{messageText}</span>
            <br/>
            {(fileUploaded && categoryFieldSet && ageFieldConfirmed) && (<>
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