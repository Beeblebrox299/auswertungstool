import { getCategories, Category, Contribution, getFields } from "@/app/utils";
import React, { useEffect, useState } from "react";
import CategorySelect from "./CategorySelect";

const CodingBox: React.FC<{contributionWithId: Contribution, contributionArray: Contribution[], onSave(): void}> = ({contributionWithId, contributionArray, onSave}) => {
    const contributionContent: Record<string, any> = {...contributionWithId};
    const [categoryIds, setCategoryIds] = useState<number[]>(contributionContent.categories);
    const [categories, setCategories] = useState<Category[]>([]);
    const [ wasChanged, setWasChanged ] = useState<boolean>(false);
    const fields = getFields()
    
    delete contributionContent.id;
    delete contributionContent.categories;
    delete contributionContent.categories_confirmed;

    const contributionKeys: string[] = Object.keys(contributionContent);

    useEffect(() => {
        setCategories(getCategories());
    },[]);

    const getFieldName = (id: number) => {
        const field = fields.find(field => field.id === id);
        return (field) ? field.name : "Konnte Bezeichnung nicht finden"
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        categories.forEach(category => {
            if (categoryIds.includes(category.id)) {
                category.assignedTo.push(contributionWithId.id)
            }
        });
        contributionArray.forEach(contribution => {
            if (contribution.id === contributionWithId.id) {
                contribution.categories_confirmed = true;
                contribution.categories = categoryIds;
            }
        });
        if (typeof window !== "undefined"){
            localStorage.setItem("contributions", JSON.stringify(contributionArray))
            localStorage.setItem("categories", JSON.stringify(categories))
        }
        else throw new Error("window undefined");
        onSave();
    };

    const handleCategoryChange = (newCategoryIds?: number[]) => {
        if (newCategoryIds) {
            setCategoryIds(newCategoryIds); 
        };
        setWasChanged(true);
    }

    const handleReset = () => {
        setCategoryIds(contributionWithId.categories); 
        setWasChanged(false);
    };
    
    return(
        <div className="displayBlock">
            <span className="info">
                {contributionKeys.map((key) => (
                    <div className="info border" style={{whiteSpace: "pre-wrap"}} key={key}><b>{getFieldName(parseInt(key))}:</b> <br/>{contributionContent[key]}</div>
                ))}
                <form onSubmit={e => handleSubmit(e)}>
                    <CategorySelect
                    onCategorySelect={(newCategoryIds) => handleCategoryChange(newCategoryIds)}
                    initialCategoryIds={categoryIds}
                    categories={categories}
                    />
                    <button className="btn" type="submit">{(wasChanged) ? "Speichern" : "Bestätigen"}</button>
                    {(wasChanged) ? (<button className="btn" onClick={handleReset}>Zurücksetzen</button>) : <></>} {/* FIXME: Only works sometimes, haven't figured out the cause */}
                </form>
            </span>
        </div>
    );
}

export default CodingBox;