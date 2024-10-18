import { getCategories, Category, Contribution } from "@/app/utils";
import React, { useEffect, useState } from "react";

const CodingBox: React.FC<{contributionWithId: Contribution, contributionArray: Contribution[]}> = ({contributionWithId, contributionArray}) => {
    const [categoryIds, setCategoryIds] = useState<number[]>([]);
    const [categories, setCategories] = useState<Category[]>([])
    
    const contributionContent: Record<string, any> = {...contributionWithId};
    delete contributionContent.id;
    delete contributionContent.categories;

    const contributionKeys: string[] = Object.keys(contributionContent);

    useEffect(() => {
        setCategories(getCategories());
    },[])

    const setDefault = () => {
        if (!contributionContent.categories) {
            return "default"
        }
        return contributionContent.categories
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!categoryIds) {
            throw new Error("CategoryId empty")
        }
        categories.forEach(category => {
            if (categoryIds.includes(category.id)) {
                category.assignedTo.push(contributionWithId.id)
            }
        });
        contributionArray.forEach(contribution => {
            if (contribution.id === contributionWithId.id) {
                contribution.categories = [...contribution.categories, ...categoryIds];
            }
        });
        if (typeof window !== "undefined"){
            localStorage.setItem("contributions", JSON.stringify(contributionArray))
            localStorage.setItem("categories", JSON.stringify(categories))
        }
    };
    
    // TODO: Beitrag nach Speichern / Bestätigen ausblenden (mit "confirmed" bool o. Ä.)
    // TODO: Multi-Category
    return(
        <div className="displayBlock">
            <span className="info">
                {contributionKeys.map((key) => (
                    <div className="info border" style={{whiteSpace: "pre-wrap"}} key={key}><b>{key}:</b> <br/>{contributionContent[key]}</div>
                ))}
                <form onSubmit={e => handleSubmit(e)}>
                    <select id="categorySelect" defaultValue={setDefault()} className="info border" onChange={e => setCategoryIds([...categoryIds, parseInt(e.target.value)])}>
                        <option disabled value="default">Kategorie auswählen...</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <button className="btn" type="submit">Speichern</button>
                </form>
            </span>
        </div>
    );
}

export default CodingBox;