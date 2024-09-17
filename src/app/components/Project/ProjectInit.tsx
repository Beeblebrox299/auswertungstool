'use client'

import React from "react";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaTrashAlt, FaPlusCircle } from "react-icons/fa";

interface FormValues{
    categories:{value: string}[]
}

const ProjektInit: React.FC = () => {
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
    }, [reset])

    const onSubmit = (data: FormValues) => {
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
                <button type="button" onClick={() => remove(index)}><FaTrashAlt/></button>
                </div>
            ))}
            <button type="button" onClick={() => append({value: ""})}><FaPlusCircle/></button>
            <br/>
            <button type="submit">Absenden</button>
        </form>
    )
};

export default ProjektInit