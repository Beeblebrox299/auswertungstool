'use client'

import React from "react";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaTrashAlt, FaPlusCircle } from "react-icons/fa";

interface FormValues{
    fields:{value: string}[]
}

// TODO: Rework variable names
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
        const categories = sessionStorage.getItem("fields");
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
        sessionStorage.setItem("fields", JSON.stringify(categories))
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="displayBlock">
            <h1>Datenfelder</h1>
            <div className="grid gap-y-8">
            {fields.map((field, index) => (
                <div key={field.id}>
                <span className="info">
                Name: &nbsp;
                <input type="string" className="info border" key={field.id}
                {...register(`fields.${index}.value`)} 
                defaultValue={field.value}/>
                </span>
                <span className="info">Art: &nbsp;
                <select name="type" className="info border">
                    <option value="string">Text</option>
                    <option value="number">Zahl</option>
                </select>
                </span>
                <button type="button" className="btn info" onClick={() => removeCategory(index)}>
                    <span className="icon"><FaTrashAlt/></span>
                    <span className="btn-label">Löschen</span> 
                </button>
                </div>
            ))}
            </div>
            <button type="button" className="btn" onClick={() => append({value: ""})}>
                <span className="icon"><FaPlusCircle/></span>
                <span className="btn-label">Neues Datenfeld hinzufügen</span></button>
            <br/>
            <button type="submit" className="btn">Speichern</button>
        </form>
    )
};

export default FieldEdit