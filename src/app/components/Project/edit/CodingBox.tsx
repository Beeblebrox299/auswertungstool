import { getCategories, Category, Contribution } from "@/app/utils";
import React, { useState } from "react";

const CodingBox: React.FC<{contributionWithId: Contribution, contributionArray: Contribution[]}> = ({contributionWithId, contributionArray}) => {
    const [categoryId, setCategoryId] = useState<string|null>(null)
    
    const contributionContent: Record<string, any> = {...contributionWithId};
    delete contributionContent.id;
    delete contributionContent.category;

    const contributionKeys: string[] = Object.keys(contributionContent);
    const categories: Category[] = getCategories();

    const setDefault = () => {
        if (!contributionContent.category) {
            return "default"
        }
        return contributionContent.category
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!categoryId) {
            throw new Error("CategoryId empty")
        }
        categories.forEach(category => {
            if (category.id === JSON.parse(categoryId)) {
                category.assignedTo.push(contributionWithId.id)
            }
        });
        contributionArray.forEach(contribution => {
            if (contribution.id === contributionWithId.id) {
                contribution.categories.push(JSON.parse(categoryId))
            }
        });
        if (typeof window !== "undefined"){
            localStorage.setItem("contributions", JSON.stringify(contributionArray))
            localStorage.setItem("categories", JSON.stringify(categories))
        }
    };
    
    return(
        <div className="displayBlock">
            <span className="info">
                {contributionKeys.map((key) => (
                    <div className="info border" key={key}><b>{key}:</b> <br/>{contributionContent[key]}</div>
                ))}
                <form onSubmit={e => handleSubmit(e)}>
                    <select id="categorySelect" defaultValue={setDefault()} className="info border" onChange={e => setCategoryId(e.target.value)}>
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