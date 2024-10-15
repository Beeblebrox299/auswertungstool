'use client'

import React from "react";
import { useState } from "react";
import { Category, generateId, getCategories, getContributions } from "@/app/utils";
import { FaPlusCircle, FaPencilAlt, FaSave, FaTrashAlt } from "react-icons/fa";

const CategoryEdit: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>(getCategories());
    const [newCategoryName, setNewCategoryName] = useState<string>("");

    const saveChanges = (newCategoryArray: Category[]): void => {
        setCategories(newCategoryArray);
        if (typeof window !== "undefined"){
            localStorage.setItem("categories", JSON.stringify(newCategoryArray))
        };
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
        const specificMessage = (timesUsed > 0) ? "Sie ist " + timesUsed + " Beiträgen zugewiesen" : "Sie wird aktuell nicht verwendet."
        return baseMessage + specificMessage
    }

    return(
        <div className="displayBlock">
            <h1>Kategorien</h1>
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
                                const contributions = getContributions()
                                contributions.forEach(contribution => {
                                    contribution.categories = contribution.categories.filter(category => category !== currentCategory.id)
                                });
                                if (typeof window !== "undefined"){
                                    localStorage.setItem("contributions", JSON.stringify(contributions));
                                };
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
                    newCategoryForm.style.display = "inline-flex";
                    newCategoryButton.style.display = "none";
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