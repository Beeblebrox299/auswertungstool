'use client'

import React from "react";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaTrashAlt, FaPlusCircle } from "react-icons/fa";

interface FormValues{
    categories:{value: string}[]
}

const CategoryEdit: React.FC = () => {
    const { control, reset, register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            categories: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "categories",
    });

    useEffect(() => {
        const categories = localStorage.getItem("categories");
        if (categories) {
            const categoryArray = JSON.parse(categories);
            reset({categories: categoryArray.map((category: string) => ({value: category}))})
        }
        else {
            reset({categories:[{value: ""}]})
        }
    }, [reset]);

    const removeCategory = (index: number) => {
        // TODO: Check if Category is assigned to at least one contribution. If yes, ask for confirmation before deleting
        remove(index)
    }

    const onSubmit = (data: FormValues) => {
        // TODO: Does this need to be handled differently if categories already exist? 
        // TODO: Do I want to store references to contributions along with the category name? -> Object[] instead of string[]
        const categories:string[] = data.categories.map((item) => item.value)
        localStorage.setItem("categories", JSON.stringify(categories))
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
                <div key={field.id}>
                <input type="string" key={field.id}
                {...register(`categories.${index}.value`)} 
                defaultValue={field.value}/>
                <button type="button" onClick={() => removeCategory(index)}><FaTrashAlt/></button>
                </div>
            ))}
            <button type="button" onClick={() => append({value: ""})}><FaPlusCircle/></button>
            <br/>
            <button type="submit">Speichern</button>
        </form>
    )
};

export default CategoryEdit