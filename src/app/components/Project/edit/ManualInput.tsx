import { useEffect, useState } from "react";
import { Category, Contribution, generateId, getCategories, getContributions, getFields } from "@/app/utils";
import CategorySelect from "./CategorySelect";
import Link from "next/link";

const ManualInput: React.FC = () => {
    const [storedContributions, setStoredContributions] = useState<Contribution[]>([]);
    const [inputValues, setInputValues] = useState<Record<string, any>>({});
    const [categoryIds, setCategoryIds] = useState<number[]>([0])
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        setStoredContributions(getContributions());
        setCategories(getCategories())
    }, []);

    const fields = getFields();

    const handleInputChange = (key: number) => (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValues({
            ...inputValues,
            [key]: event.target.value,
        });
    };

    const handleSelect = (key: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.value === "new") {
            const index = fields.findIndex(field => field.id === key);
            if (typeof fields[index].type !== "object") return
            const newOption = window.prompt('Geben Sie die neue Option für "Altersgruppe" ein', "Altersgruppe");
            if (newOption === null) return;
            if (newOption === "") throw new Error("option cannot be empty");
            fields[index].type.push(newOption);
            if (typeof window !== "undefined") {
                localStorage.setItem("fields", JSON.stringify(fields));
            };
            setInputValues({
                ...inputValues,
                [key]: newOption,
            });
        }
        else {
            setInputValues({
                ...inputValues,
                [key]: event.target.value,
            });
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (Object.keys(inputValues).length == 0 && (categoryIds.filter((id) => id !== 0).length === 0)) {
            throw new Error ("No input")
        }
        setCategoryIds(categoryIds.filter((id) => id !== 0))
        const newContribution: Contribution = {
            ...inputValues,
            categories: categoryIds,
            id: generateId(),
            categories_confirmed: false,
        }
        const newContributionArray = storedContributions.map(contribution => ({ ...contribution }));
        newContributionArray.push(newContribution);
        if (typeof window !== "undefined"){
            localStorage.setItem("contributions", JSON.stringify(newContributionArray));
        };
        setStoredContributions(newContributionArray);   
        setInputValues({});
        setCategoryIds([0]);
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                {fields.map(field => (
                    <div key={field.id}>
                        <h2>{field.name}: </h2>
                        {(typeof field.type === "string" ? 
                            ((field.name !== "Titel") ?
                                <textarea 
                                    cols={50}
                                    rows={3}
                                    className="info"
                                    onChange={handleInputChange(field.id)} 
                                    value={inputValues[field.id]|| ''}
                                >
                                    
                                </textarea>
                                :
                                <input 
                                    className="info"
                                    type="text"
                                    value={inputValues[field.id] || ''}
                                    onChange={handleInputChange(field.id)}
                                />)
                        :
                        <select className="info" value={inputValues[field.id] || "Keine Angabe"} onChange={handleSelect(field.id)}>
                            <option value="Keine Angabe" disabled>Auswählen</option>
                            {field.type.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                            <option value="new">Neue Option erstellen</option>
                        </select>
                        )}  
                    <br/><br/> 
                    </div>
                ))}
                <h2>Kategorie(n): </h2>
                <CategorySelect
                    onCategorySelect={(newCategoryIds) => {if (newCategoryIds) setCategoryIds(newCategoryIds)}}
                    initialCategoryIds={categoryIds}
                    categories={categories}
                    /><br/>
                <button className="btn" type="submit">Speichern und weiteren Beitrag eingeben</button>
                <button className="btn" onClick={(event) => {handleSubmit(event); window.location.href = "/auswertungstool/edit/coding"}}>Speichern und weiter zur Codierung</button>
                <Link className="btn" href={"/edit/coding"}>Ohne Speichern zur Codierung</Link>
            </form>
        </div>
    );
}

export default ManualInput;