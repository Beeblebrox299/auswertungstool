'use client'

import React from "react";
import { useEffect, useState } from "react";
import { generateId } from "@/app/utils";
import { FaPlusCircle, FaPencilAlt, FaSave, FaTrashAlt } from "react-icons/fa";

interface Category{
    id: number,
    name: string, 
    assignedTo: number[],
}

const CategoryEdit: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategoryName, setNewCategoryName] = useState<string>("");

    // get categories from local storage
    useEffect(() => {
        const StringifiedCategories = localStorage.getItem("categories");
        if (StringifiedCategories) {
            setCategories(JSON.parse(StringifiedCategories))
        }
    }, []);

    const saveChanges = (newCategoryArray: Category[]): void => {
        setCategories(newCategoryArray);
        localStorage.setItem("categories", JSON.stringify(newCategoryArray))
    }
    
    // Save FormValues to local Storage
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (newCategoryName == "") {
            throw new Error("Category name cannot be empty")
        }
        const newCategory:Category = {
            id: generateId(),
            name: newCategoryName,
            assignedTo: []
        };
        saveChanges([...categories, newCategory])
        setNewCategoryName('');
        // TODO: Check if category name already exists (maybe already onChange)
    };

    const editCategoryName = (index: number): void =>{
        // TODO: Edit Name
        throw new Error("Function not implemented.");
    };

    const confirmDelete = (timesUsed: number): string => {
        const baseMessage = "Kategorie löschen? "
        const specificMessage = (timesUsed > 0) ? "Sie ist " + timesUsed + " Kategorien zugewiesen" : "Sie wird aktuell nicht verwendet."
        return baseMessage + specificMessage
    }

    return(
        <div className="displayBlock">
            {categories.map((currentCategory, index) => (
                <div key={currentCategory.id} className="info">
                    Kategorie {index + 1}: 
                    <span className="info border">{currentCategory.name}</span>
                    <button type="button" className="btn" onClick={() => editCategoryName(index)}>
                        <span className="icon"><FaPencilAlt/></span>
                        <span className="btn-label">Umbenennen</span>
                    </button>
                        <button type="button" className="btn" onClick={() => {
                            if (window.confirm(confirmDelete(currentCategory.assignedTo.length))) {
                                // TODO: Remove reference from assigned contributions
                                saveChanges(categories.filter(category => category !== currentCategory));
                            };
                            }}
                        >
                        <span className="icon"><FaTrashAlt/></span>
                        <span className="btn-label">Löschen</span> 
                        </button>
                </div>
            ))}
            <div>
            <div id="newCategoryButton" className="info">
            <button type="button" className="btn" onClick={() => {
                const newCategoryForm:HTMLElement|null = document.getElementById("newCategoryForm");
                const newCategoryButton:HTMLElement|null = document.getElementById("newCategoryButton");
                if (newCategoryForm && newCategoryButton) {
                    console.log(newCategoryButton)
                    newCategoryForm.style.display = "inline-flex";
                    newCategoryButton.style.display = "none";
                    console.log(newCategoryButton)
                }
                else {
                    throw new Error("CategoryForm or CategoryButton is null")
                }
                }}
            >
                <span className="icon"><FaPlusCircle/></span>
                <span className="btn-label">Neue Kategorie hinzufügen</span>
            </button>
            </div>
            <form id="newCategoryForm" className="hidden" onSubmit={e => handleSubmit(e)}>
            <input 
                type="text" 
                value={newCategoryName} 
                onChange={e => setNewCategoryName(e.target.value)} 
                placeholder="Neue Kategorie"
            />
            <button type="submit" className="btn">
                <span className="icon"><FaSave/></span>
                <span className="btn-label">Neue Kategorie speichern</span>
            </button>
            </form>
            </div>
        </div>
    )
};

export default CategoryEdit