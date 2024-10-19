import { getCategories, Category, Contribution } from "@/app/utils";
import React, { useEffect, useState } from "react";
import CategorySelect from "./CategorySelect";

const CodingBox: React.FC<{contributionWithId: Contribution, contributionArray: Contribution[]}> = ({contributionWithId, contributionArray}) => {
    const [categoryIds, setCategoryIds] = useState<number[]>(contributionWithId.categories);
    const [categories, setCategories] = useState<Category[]>([])
    
    const contributionContent: Record<string, any> = {...contributionWithId};
    delete contributionContent.id;
    delete contributionContent.categories;

    const contributionKeys: string[] = Object.keys(contributionContent);

    useEffect(() => {
        setCategories(getCategories());
    },[]);

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
                contribution.categories = categoryIds;
            }
        });
        if (typeof window !== "undefined"){
            localStorage.setItem("contributions", JSON.stringify(contributionArray))
            localStorage.setItem("categories", JSON.stringify(categories))
        }
    };
    
    // TODO: Beitrag nach Speichern / Bestätigen ausblenden (mit "confirmed" bool o. Ä.)
    return(
        <div className="displayBlock">
            <span className="info">
                {contributionKeys.map((key) => (
                    <div className="info border" style={{whiteSpace: "pre-wrap"}} key={key}><b>{key}:</b> <br/>{contributionContent[key]}</div>
                ))}
                <form onSubmit={e => handleSubmit(e)}>
                    <CategorySelect
                    onCategorySelect={(newCategoryIds) => {setCategoryIds(newCategoryIds)}}
                    initialCategoryIds={categoryIds}
                    categories={categories}
                    />
                    <button className="btn" type="submit">Speichern</button>
                </form>
            </span>
        </div>
    );
}

export default CodingBox;