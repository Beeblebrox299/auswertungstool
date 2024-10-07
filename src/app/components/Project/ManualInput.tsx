import { useState, useEffect } from "react";
import { generateId, getArrayFromStorage } from "@/app/utils";

const ManualInput: React.FC = () => {
    const [storedContributions, setStoredContributions] = useState<Record<string, any>[]>([]);
    const [inputValues, setInputValues] = useState<Record<string, any>>({});
    useEffect(() => {
        const contributionArray = getArrayFromStorage("contributions")
        setStoredContributions(contributionArray);
    }, [])
    const contributionsWithoutId = storedContributions.map(contribution => ({ ...contribution }));
    contributionsWithoutId.forEach((contribution) => {
        delete contribution.id;
    });
    const contributionKeys:string[] = Array.from(new Set(contributionsWithoutId.flatMap(Object.keys)));

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
        const newContribution:Record<string, any> = {
            ...inputValues,
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
                <button type="submit">Abschicken</button>
            </form>
        </div>
    );
}

export default ManualInput;