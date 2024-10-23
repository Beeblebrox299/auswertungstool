'use client'

import { Field, generateId, getFields } from "@/app/utils";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaTrashAlt, FaPlusCircle, FaPencilAlt, FaTimesCircle, FaSave } from "react-icons/fa";


const FieldEdit: React.FC = () => {
    const [fields, setFields] = useState<Field[]>([]);
    const [newFieldName, setNewFieldName] = useState<string>("");
    const [newFieldType, setNewFieldType] = useState<string>("text");
    const [fieldOptions, setFieldOptions] = useState<string[]>(["Option 1"])

    useEffect (() =>{
        setFields(getFields())
    }, []);

    const removeField = (index: number) => {
        //TODO: Ask for confirmation
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
        if (typeof window !== "undefined") {
            localStorage.setItem("fields", JSON.stringify(updatedFields));
        };
    };

    const editFieldName = (index: number) => {
        const newName = window.prompt("Geben Sie den neuen Namen ein", fields[index].name);
        if (newName == "" || newName == null) {
            throw new Error("Category name cannot be empty")
        };
        const newFieldArray = Array.from(fields);
        newFieldArray[index].name = newName;
        saveChanges(newFieldArray);
    };

    const toggleNewFieldForm = (showForm: boolean) => {
        const newFieldForm:HTMLElement|null = document.getElementById("newFieldForm");
        const newFieldButton:HTMLElement|null = document.getElementById("newFieldButton");
        if (newFieldForm && newFieldButton) {
            if (showForm) {
                newFieldForm.style.display = "inline-flex";
                newFieldButton.style.display = "none";
            }
            else {
                newFieldButton.style.display = "inline-flex";
                newFieldForm.style.display = "none";}
        }
        else {
            throw new Error("FieldForm or FieldButton is null")
        }
    };

    const saveChanges = (newFieldArray: Field[]): void => {
        setFields(newFieldArray);
        if (typeof window !== "undefined"){
            localStorage.setItem("fields", JSON.stringify(newFieldArray))
        };
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (newFieldName == "") {
            throw new Error("Category name cannot be empty")
        };

        let fieldType: "Text"|"Zahl"|string[]

        if (newFieldType === "options") {
            fieldType = fieldOptions;
        } 
        else if (newFieldType === "Text" || newFieldType === "Zahl") {
            fieldType = newFieldType
        }
        else {
            throw new Error("invalid FieldType")
        };
    
        const newField:Field = {
            id: generateId(),
            name: newFieldName,
            type: fieldType
        };

        saveChanges([...fields, newField]);
        setNewFieldName('');
        toggleNewFieldForm(false);
    }

    return(<div className="displayBlock">
        <h1>Datenfelder</h1>
        <div className="grid gap-y-8">
        {fields.map((field, index) => (
            <div key={field.name} className="info border">
                    <h2>{field.name}</h2>
                <div className="info">Art: &nbsp;
                    <span className="info border">{(Array.isArray(field.type)) ? "Benutzerdefinierte Auswahlmöglichkeiten" : field.type}</span>
                    <button type="button" className="btn">
                        <span className="icon"><FaPencilAlt/></span>
                        <span className="btn-label">Ändern</span>
                    </button>
                    {/* TODO: Auswahlmöglichkeiten anzeigen */}
                </div>
                <div className="info">
                <button type="button" className="btn" onClick={() => editFieldName(index)}>
                    <span className="icon"><FaPencilAlt/></span>
                    <span className="btn-label">Umbenennen</span>
                </button>
                <button type="button" className="btn info" onClick={() => removeField(index)}>
                    <span className="icon"><FaTrashAlt/></span>
                    <span className="btn-label">Löschen</span> 
                </button>
                </div>
            </div>
        ))}
        </div>
        <div id="newFieldButton" className="info">
            <button type="button" className="btn" onClick={() => toggleNewFieldForm(true)}>
                <span className="icon"><FaPlusCircle/></span>
                <span className="btn-label">Neues Datenfeld hinzufügen</span>
            </button>
        </div>
        <div id="newFieldForm" className="hidden info">
            <div className="info">Name: <input 
                type="text" 
                value={newFieldName} 
                onChange={e => setNewFieldName(e.target.value)} 
                placeholder="Name"
            />
            </div>
            <div className="info">Art: 
            <select className="info border" onChange={e => setNewFieldType(e.target.value)}>
                <option value="Text">Text</option>
                <option value="Zahl">Zahl</option>
                <option value="options">Auswahlmöglichkeiten festlegen</option>
            </select></div>
            {(newFieldType === "options") && (<div>
                {fieldOptions.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        defaultValue={option}
                        onChange={(event) => {
                            const updatedOptions = [...fieldOptions];
                            updatedOptions[index] = event.target.value;
                            setFieldOptions(updatedOptions);
                        }}/>
                ))}
                <button type="button" className="btn" onClick={() => {setFieldOptions([...fieldOptions, "Option " + (fieldOptions.length+1)])}}>
                    <span className="icon"><FaPlusCircle/></span>
                </button>
            </div>)}
            <div className="info">
            <button type="submit" className="btn" onClick={e => handleSubmit(e)}>
                <span className="icon"><FaSave/></span>
                <span className="btn-label">Neues Datenfeld speichern</span>
            </button>
            <button className="btn" onClick={(event) => {
                event.preventDefault();
                toggleNewFieldForm(false);
            }}>
                <span className="icon"><FaTimesCircle/></span>
                <span className="btn-label">Abbrechen</span>
            </button>
            </div>
        </div>
    </div>
    )
};

export default FieldEdit