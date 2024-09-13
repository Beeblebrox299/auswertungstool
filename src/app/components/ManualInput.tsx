import { useState } from "react";
import { useContribution } from "../Contexts";

const ManualInput: React.FC = () => {
    const { contributionArray, setContributionArray } = useContribution();
    const contributionKeys = Array.from(new Set(contributionArray.flatMap(Object.keys)));

    const [inputValues, setInputValues] = useState<Record<string, string>>({});
    const handleInputChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues(inputValues => ({
            ...inputValues,
            [key]: event.target.value,
        }));
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setContributionArray([...contributionArray, inputValues])
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