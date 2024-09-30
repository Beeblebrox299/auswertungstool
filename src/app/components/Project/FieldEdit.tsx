'use client'

import React from "react";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaTrashAlt, FaPlusCircle } from "react-icons/fa";

interface FormValues{
    fields:{value: string}[]
}

// TODO: support renaming of categories/fields
const FieldEdit: React.FC = () => {
    const { control, reset, register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            fields: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "fields",
    });

    useEffect(() => {
        const categories = localStorage.getItem("fields");
        if (categories) {
            const categoryArray = JSON.parse(categories);
            reset({fields: categoryArray.map((category: string) => ({value: category}))})
        }
        else {
            reset({fields:[{value: ""}]})
        }
    }, [reset]);

    const removeCategory = (index: number) => {
        // TODO: Check if Category is assigned to at least one contribution. If yes, ask for confirmation before deleting
        remove(index)
    }

    const onSubmit = (data: FormValues) => {
        // TODO: Do I want to store references to contributions along with the category name? -> Object[] instead of string[]
        // TODO: Check if category already exists (maybe already onChange)
        const categories:string[] = data.fields.map((item) => item.value)
        localStorage.setItem("fields", JSON.stringify(categories))
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Datenfelder</h1>
            <div className="grid gap-y-8">
            {fields.map((field, index) => (
                <div key={field.id}>
                Name: &nbsp;
                <input type="string" key={field.id}
                {...register(`fields.${index}.value`)} 
                defaultValue={field.value}/> 
                <br/>
                Art: &nbsp;
                <select name="type">
                    <option value="string">Text</option>
                    <option value="number">Zahl</option>
                </select>
                <br/>
                <button type="button" onClick={() => removeCategory(index)}><FaTrashAlt/></button>
                </div>
            ))}
            </div>
            <button type="button" onClick={() => append({value: ""})}><FaPlusCircle/></button>
            <br/>
            <button type="submit">Speichern</button>
        </form>
    )
};

export default FieldEdit