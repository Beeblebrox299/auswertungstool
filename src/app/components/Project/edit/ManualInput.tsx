import { useEffect, useState } from "react";
import { Category, Contribution, generateId, getCategories, getContributions, getFields } from "@/app/utils";
import { FaPlusCircle } from "react-icons/fa";
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

    const handleInputChange = (key: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
                        <label>{field.name}:</label>
                        <input
                            type="text"
                            value={inputValues[field.id] || ''}
                            onChange={handleInputChange(field.id)}
                        />
                    </div>
                ))}
                <CategorySelect
                    onCategorySelect={(newCategoryIds) => {if (newCategoryIds) setCategoryIds(newCategoryIds)}}
                    initialCategoryIds={categoryIds}
                    categories={categories}
                    />
                <button className="btn" type="submit">Abschicken</button>
            </form>
        </div>
    );
}

export default ManualInput;