import { useEffect, useState } from "react";
import { Category, Contribution, generateId, getCategories, getContributions } from "@/app/utils";
import { FaPlusCircle } from "react-icons/fa";

const ManualInput: React.FC = () => {
    const [storedContributions, setStoredContributions] = useState<Contribution[]>([]);
    const [inputValues, setInputValues] = useState<Record<string, any>>({});
    const [categoryIds, setCategoryIds] = useState<number[]>([0])
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        setStoredContributions(getContributions());
        setCategories(getCategories())
    }, []);

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
        if (Object.keys(inputValues).length == 0 && (categoryIds.filter((id) => id !== 0).length === 0)) {
            throw new Error ("No input")
        }
        setCategoryIds(categoryIds.filter((id) => id !== 0))
        const newContribution: Contribution = {
            ...inputValues,
            categories: categoryIds,
            id: generateId(),
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

    const handleCategoryChange = (target: EventTarget & HTMLSelectElement) => {
        const index = parseInt(target.id);
        const newCategoryIds = categoryIds;
        newCategoryIds[index] = parseInt(target.value);
        setCategoryIds(newCategoryIds);
    };

    const getRemainingCategories = (index: number) => {
        const selectedCategories = categoryIds.slice(0, index).filter(id => id !== 0);
        return categories.filter(category => !selectedCategories.includes(category.id));
    };

    const addCategorySelect = (event: React.FormEvent) => {
        event.preventDefault()
        if (categoryIds.length < categories.length) {
            setCategoryIds([...categoryIds, 0])
        }
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                {contributionKeys.map(key => (
                    key !== "categories" && (
                    <div key={key}>
                        <label>{key}:</label>
                        <input
                            type="text"
                            value={inputValues[key] || ''}
                            onChange={handleInputChange(key)}
                        />
                    </div>
                )))}
                {categoryIds.map((id, index) => ( <div key={index}>
                    <select key={id} id={index.toString()} defaultValue={id} className="info border" onChange={e => handleCategoryChange(e.target)}>
                        <option value="0">Keine Kategorie</option>
                        {getRemainingCategories(index).map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <br/></div>
                    ))}
                    <button className="btn" onClick={e => addCategorySelect(e)}>
                        <span className="icon"><FaPlusCircle/></span>
                        <span className="btn-label">Weitere Kategorie hinzufügen</span>
                    </button>
                    <br/>
                <button className="btn" type="submit">Abschicken</button>
            </form>
        </div>
    );
}

export default ManualInput;