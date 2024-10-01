'use client'

import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlusCircle, FaPencilAlt, FaSave, FaTrashAlt } from "react-icons/fa";

interface Category{
    id: number,
    name: string, 
    assignedTo: number[],
}

const CategoryEdit: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategoryName, setNewCategoryName] = useState<string>("");

    const { control, reset, register, handleSubmit } = useForm({
        defaultValues: {
            categories: [],
        },
    });

    // get categories and current highest ID from local storage
    useEffect(() => {
        const StringifiedCategories = localStorage.getItem("categories");
        if (StringifiedCategories) {
            setCategories(JSON.parse(StringifiedCategories))
        }
    }, []);

    const handleAppend = () => {
        const newCategory:Category = {
            // id setting should be changed if software is used by multiple users simultaneously
            id: (new Date).getTime(), 
            name: "",
            assignedTo: [],
        }
        setCategories([...categories, newCategory])
        setNewCategoryName('');
    }
    
    // Save FormValues to local Storage
    const onSubmit = (data: any) => {
        // TODO: Check if category name already exists (maybe already onChange)
        const categories:Object[] = data.categories
        localStorage.setItem("categories", JSON.stringify(categories))
        //TODO: Success message
    };

    function editCategoryName(index: number): void {
        // TODO: Edit Name
        throw new Error("Function not implemented.");
    };

    return(
        <form className="inputForm" onSubmit={handleSubmit(onSubmit)}>
            {categories.map((category, index) => (
                <div key={category.id}>
                    Kategorie {index + 1}: 
                    <span className="info">{category.name}</span>
                    <button type="button" className="btn" onClick={() => editCategoryName(index)}>
                        <span className="icon"><FaPencilAlt/></span>
                        <span className="btn-label">Umbenennen</span>
                    </button>
                        <button type="button" className="btn" onClick={() => {
                            if (window.confirm("Kategorie löschen?")) {
                            };
                            }}
                        >
                        <span className="icon"><FaTrashAlt/></span>
                        <span className="btn-label">Löschen</span> 
                        </button>
                </div>
            ))}
            <div>
            <div id="newCategoryButton">
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
            <div id="newCategoryForm" className="hidden">
            <input 
                type="text" 
                value={newCategoryName} 
                onChange={e => setNewCategoryName(e.target.value)} 
                placeholder="Neue Kategorie" 
            />
            <button type="button" className="btn" onClick={() => handleAppend()}>
                <span className="icon"><FaSave/></span>
                <span className="btn-label">Neue Kategorie speichern</span>
            </button>
            </div>
            </div>
        </form>
    )
};

export default CategoryEdit