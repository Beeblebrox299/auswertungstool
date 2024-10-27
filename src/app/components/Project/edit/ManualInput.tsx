import { useEffect, useState } from "react";
import { Category, Contribution, generateId, getCategories, getContributions, getFields } from "@/app/utils";
import CategorySelect from "./CategorySelect";

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
                    <div className="formContainer" key={field.id}>
                        <h2>{field.name}: </h2>
                        {(typeof field.type === "string" ? 
                            ((field.name === "Beschreibung") ?
                                <textarea 
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
                        <select className="info" defaultValue={"Keine Angabe"}>
                            <option value="Keine Angabe" disabled>Auswählen</option>
                            {field.type.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        )}   
                    </div>
                ))}
                <h2>Kategorie(n): </h2>
                <CategorySelect
                    onCategorySelect={(newCategoryIds) => {if (newCategoryIds) setCategoryIds(newCategoryIds)}}
                    initialCategoryIds={categoryIds}
                    categories={categories}
                    /><br/>
                <button className="btn" type="submit">Abschicken</button>
            </form>
        </div>
    );
}

export default ManualInput;