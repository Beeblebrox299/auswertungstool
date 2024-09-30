'use client'

import React from "react";
import { useEffect, useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaTrashAlt, FaPlusCircle, FaPencilAlt, FaSave, FaUndoAlt } from "react-icons/fa";

interface FormValues{
    categories:{
        id: number,
        name: string, 
        assignedTo: number[],
    }[]
}

const CategoryEdit: React.FC = () => {
    const categoryIdRef = useRef(0)

    const { control, reset, register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            categories: [],
        },
    });

    // get categories and current highest ID from local storage
    useEffect(() => {
        const id = localStorage.getItem("highestCategoryId")
        categoryIdRef.current = (id != null) ? JSON.parse(id) : 0;
        const StringifiedCategories = localStorage.getItem("categories");
        if (StringifiedCategories) {
            const categoryArray = JSON.parse(StringifiedCategories);
            reset({categories: categoryArray.map((category: {name: string, assignedTo: []}) => ({value: category}))})
        }
        else {
            reset({categories:[{name: ""}]})
        }
    }, [reset]);

    const [newCategory, setNewCategory] = useState<string>("");

    const handleAppend = () => {
        append({ id: categoryIdRef.current, name: newCategory, assignedTo: [] });
        categoryIdRef.current = categoryIdRef.current + 1;
        setNewCategory('');
    }

    const { fields: categories, append, remove } = useFieldArray({
        control,
        name: "categories", 
    });

    const removeCategory = (index: number) => {
        // Check if Category is assigned to at least one contribution. If yes, ask for confirmation before deleting
        if (categories[index].assignedTo[0]) {
            // TODO: Ask for confirmation
            return
        }
        remove(index)
    }

    // Save FormValues to local Storage
    const onSubmit = (data: FormValues) => {
        // TODO: Check if category name already exists (maybe already onChange)
        const categories:Object[] = data.categories
        localStorage.setItem("categories", JSON.stringify(categories))
        localStorage.setItem("highestCategoryId", JSON.stringify(categoryIdRef.current))
        //TODO: Success message
    };

    function editCategoryName(index: number): void {
        // TODO: Edit Name
        throw new Error("Function not implemented.");
    }

    return(
        <form className="inputForm" onSubmit={handleSubmit(onSubmit)}>
            {categories.map((category, index) => (
                <div key={category.id}>
                    Kategorie {index + 1}: 
                    <span className="info">{categories[index].name}</span>
                    <button type="button" className="btn" onClick={() => editCategoryName(index)}>
                        <span className="icon"><FaPencilAlt/></span>
                        <span className="btn-label">Umbenennen</span>
                    </button>
                    <button type="button" className="btn" onClick={() => removeCategory(index)}>
                        <span className="icon"><FaTrashAlt/></span>
                        <span className="btn-label">Löschen</span> 
                    </button>
                </div>
            ))}
            <div>
            <input 
                type="text" 
                value={newCategory} 
                onChange={e => setNewCategory(e.target.value)} 
                placeholder="Neue Kategorie" 
            />
            <button type="button" className="btn" onClick={() => handleAppend()}>
                <span className="icon"><FaPlusCircle/></span>
                <span className="btn-label">Kategorie hinzufügen</span>
            </button>
            </div>
            <br/>
            <button type="submit" className="btn">
                <span className="icon"><FaSave/></span>
                <span className="btn-label">Speichern</span>
            </button>
            <button type="reset" className="btn">
                <span className="icon"><FaUndoAlt/></span>
                <span className="btn-label">Änderungen rückgängig machen</span>
            </button>
        </form>
    )
};

export default CategoryEdit