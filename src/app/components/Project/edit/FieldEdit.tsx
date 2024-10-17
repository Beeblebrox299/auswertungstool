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
        const fields = localStorage.getItem("fields");
        if (fields) {
            const fieldsArray = JSON.parse(fields);
            reset({fields: fieldsArray.map((field: string) => ({value: field}))})
        }
        else {
            reset({fields:[{value: ""}]})
        }
    }, [reset]);

    const removeField = (index: number) => {
        // TODO: Check if field is used in at least one contribution. If yes, ask for confirmation before deleting
        remove(index)
    }

    const onSubmit = (data: FormValues) => {
        // TODO: Check if field already exists (maybe already onChange)
        const fields:string[] = data.fields.map((item) => item.value)
        if (typeof window !== "undefined"){
            localStorage.setItem("fields", JSON.stringify(fields))
        };
    };
    // TODO: Button fo renaming instead of displaying an input field (like in CategoryEdit)
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
                <button type="button" className="btn info" onClick={() => removeField(index)}>
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