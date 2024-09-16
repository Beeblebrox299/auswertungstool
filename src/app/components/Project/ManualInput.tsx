import { useState, useEffect } from "react";

const ManualInput: React.FC = () => {
    const [storedContributions, setStoredContributions] = useState<string|null>(null)
    useEffect(() => {
        setStoredContributions(localStorage.getItem("contributions"));
    }, [])
    const contributionArray:any[] = (storedContributions != null) ? JSON.parse(storedContributions) : [];
    const contributionKeys:string[] = Array.from(new Set(contributionArray.flatMap(Object.keys)));

    const [inputValues, setInputValues] = useState<Record<string, string>>({});
    const handleInputChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues(inputValues => ({
            ...inputValues,
            [key]: event.target.value,
        }));
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        let contributions: Object[]
        if (storedContributions == null) {
            contributions = [inputValues]
        }
        else {
            contributions = [...JSON.parse(storedContributions), inputValues]
        }
        localStorage.setItem("contributions", JSON.stringify(contributions))
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