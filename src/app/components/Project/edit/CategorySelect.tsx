import React, { useEffect, useState } from "react";
import { Category, generateId } from "@/app/utils";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const CategorySelect: React.FC<{onCategorySelect(categoryIds?: number[]): void, initialCategoryIds: number[], categories: Category[]}> = ({onCategorySelect, initialCategoryIds, categories}) => {
    
    const [categoryIds, setCategoryIds] = useState<number[]>(initialCategoryIds)

    useEffect(() => {
        setCategoryIds(initialCategoryIds);
    }, [initialCategoryIds]);

    if (categoryIds.length === 0) {
        setCategoryIds([0]);
    }

    const handleCategoryChange = (target: EventTarget & HTMLSelectElement) => {
        const index = parseInt(target.id);
        const newCategoryIds = [...categoryIds];
        if (target.value === "new") {
            const newCategoryName = window.prompt("Geben Sie den Namen der neuen Kategorie ein", "Neue Kategorie")
            if (newCategoryName === null) return
            if (newCategoryName === "") throw new Error("category name cannot be empty")
            const newCategory: Category = {
                id: generateId(),
                name: newCategoryName,
                assignedTo: [],
            };
            categories.push(newCategory);
            if (typeof window !== "undefined") {
                localStorage.setItem("categories", JSON.stringify(categories))
            };
            newCategoryIds[index] = newCategory.id;
        }
        else newCategoryIds[index] = parseInt(target.value);
        onCategorySelect(newCategoryIds);
    };

    const getRemainingCategories = (index: number) => {
        const selectedCategories = [...categoryIds];
        selectedCategories.splice(index, 1);
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
            <option value="new">Neue Kategorie erstellen</option>
        </select>
        {(index > 0) ? <button type="button" className="btn" onClick={() => {
                const updatedCategoryIds = categoryIds.filter((_, idx) => idx != index);
                onCategorySelect(updatedCategoryIds);
            }}
        >
        <span className="icon"><FaMinusCircle/></span>
        </button> : <></>}
        <br/></div>
        ))}
        {(categoryIds.length < categories.length) ? (<><button className="btn" onClick={(e => {addCategorySelect(e); onCategorySelect()})}>
            <span className="icon"><FaPlusCircle/></span>
            <span className="btn-label">Weitere Kategorie hinzufügen</span>
        </button>
        <br/></>) : <></>}
        </>
    );
};

export default CategorySelect;