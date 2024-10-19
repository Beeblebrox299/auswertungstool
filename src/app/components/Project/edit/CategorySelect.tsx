import React, { useState } from "react";
import { Category } from "@/app/utils";
import { FaPlusCircle } from "react-icons/fa";

const CategorySelect: React.FC<{onCategorySelect(categoryIds: number[]): void, initialCategoryIds: number[], categories: Category[]}> = ({onCategorySelect, initialCategoryIds, categories}) => {
    
    const [categoryIds, setCategoryIds] = useState<number[]>(initialCategoryIds)

    if (categoryIds.length === 0) {
        setCategoryIds([0]);
    }

    const handleCategoryChange = (target: EventTarget & HTMLSelectElement) => {
        const index = parseInt(target.id);
        const newCategoryIds = categoryIds;
        newCategoryIds[index] = parseInt(target.value);
        setCategoryIds(newCategoryIds);
        onCategorySelect(categoryIds);
    };

    const getRemainingCategories = (index: number) => {
        const selectedCategories = categoryIds.slice(0, index).filter(id => id !== 0);
        return categories.filter(category => !selectedCategories.includes(category.id));
    };

    const addCategorySelect = (event: React.FormEvent) => {
        event.preventDefault();
        setCategoryIds([...categoryIds, 0]);
    };

    if (!categories || categories.length === 0) {
        return <></>;
    }

    return (<>
        {categoryIds.map((id, index) => ( <div key={index}>
        <select key={id} id={index.toString()} defaultValue={id.toString()} className="info border" onChange={e => handleCategoryChange(e.target)}>
            <option value="0">Keine Kategorie</option>
            {getRemainingCategories(index).map((category) => (
                <option key={category.id} value={category.id.toString()}>{category.name}</option>
            ))}
        </select>
        <br/></div>
        ))}
        {(categoryIds.length < categories.length) ? (<><button className="btn" onClick={(e => addCategorySelect(e))}>
            <span className="icon"><FaPlusCircle/></span>
            <span className="btn-label">Weitere Kategorie hinzufügen</span>
        </button>
        <br/></>) : <></>}
        </>
    );
};

export default CategorySelect;