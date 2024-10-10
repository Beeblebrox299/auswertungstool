import { useState, useEffect } from "react";
import { Contribution, generateId, getCategories, getContributions } from "@/app/utils";

const ManualInput: React.FC = () => {
    const [storedContributions, setStoredContributions] = useState<Contribution[]>([]);
    const [inputValues, setInputValues] = useState<Record<string, any>>({});
    const [categoryId, setCategoryId] = useState<string|null>(null)
    const categories = getCategories()

    useEffect(() => {
        const contributionArray = getContributions();
        setStoredContributions(contributionArray);
    }, [])

    const getContributionKeys = (): string[] => {
        const keys = Array.from(new Set(storedContributions.flatMap(Object.keys)));
        return keys.filter(item => !["id", "category"].includes(item))
    }

    const contributionKeys = getContributionKeys();

    const handleInputChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues(inputValues => ({
            ...inputValues,
            [key]: event.target.value,
        }));
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (Object.keys(inputValues).length == 0) {
            throw new Error ("No input")
        }
        const newContribution: Contribution = {
            ...inputValues,
            // TODO: Add multi-category support
            categories: (categoryId) ? JSON.parse(categoryId) : null,
            id: generateId(),
        }
        const newContributionArray = storedContributions.map(contribution => ({ ...contribution }));
        newContributionArray.push(newContribution);
        localStorage.setItem("contributions", JSON.stringify(newContributionArray));
        setStoredContributions(newContributionArray);   
        setInputValues({});
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                {contributionKeys.map(key => (
                    <div key={key}>
                        <label>{key}:</label>
                        <input
                            type="text"
                            value={inputValues[key] || ''}
                            onChange={handleInputChange(key)}
                        />
                    </div>
                ))}
                    <select id="categorySelect" defaultValue={"default"} className="info border" onChange={e => setCategoryId(e.target.value)}>
                        <option value="default">Keine Kategorie</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <br/>
                <button className="btn" type="submit">Abschicken</button>
            </form>
        </div>
    );
}

export default ManualInput;