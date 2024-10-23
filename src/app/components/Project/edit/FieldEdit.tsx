'use client'

import { Field, generateId, getFields } from "@/app/utils";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaTrashAlt, FaPlusCircle, FaPencilAlt, FaTimesCircle, FaSave } from "react-icons/fa";


const FieldEdit: React.FC = () => {
    const [fields, setFields] = useState<Field[]>([]);
    const [newFieldName, setNewFieldName] = useState<string>("");
    const [newFieldType, setNewFieldType] = useState<string>("text");

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

        let fieldType: "text"|"number"|string[]

        if (newFieldType === "options") {
            fieldType = [] //TODO: Add options to array
        } 
        else if (newFieldType === "text" || newFieldType === "number") {
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
        setNewFieldType("text");
    }

    // TODO: Button fo renaming instead of displaying an input field (like in CategoryEdit)
    // TODO: Ask for type of field (text, number, one of x options...) and store them for better manual input and visualisation
    return(<div className="displayBlock">
        <h1>Datenfelder</h1>
        <div className="grid gap-y-8">
        {fields.map((field, index) => (
            <div key={field.name}>
                <div className="info">
                    Name: &nbsp;
                    <span className="info border">{field.name}</span>
                </div>
                <div className="info">Art: &nbsp;
                    <span className="info border">{(Array.isArray(field.type)) ? "Benutzerdefinierte Auswahlmöglichkeiten" : field.type}</span>
                    {/* TODO: Auswahlmöglichkeiten anzeigen */}
                </div>
                <button type="button" className="btn" onClick={() => editFieldName(index)}>
                    <span className="icon"><FaPencilAlt/></span>
                    <span className="btn-label">Umbenennen</span>
                </button>
                <button type="button" className="btn info" onClick={() => removeField(index)}>
                    <span className="icon"><FaTrashAlt/></span>
                    <span className="btn-label">Löschen</span> 
                </button>
            </div>
        ))}
            <div id="newFieldButton" className="info">
                <button type="button" className="btn" onClick={() => toggleNewFieldForm(true)}>
                    <span className="icon"><FaPlusCircle/></span>
                    <span className="btn-label">Neues Datenfeld hinzufügen</span>
                </button>
            </div>
            <form id="newFieldForm" className="hidden" onSubmit={e => handleSubmit(e)}>
                <div className="info">Name: </div>
                <input 
                    type="text" 
                    value={newFieldName} 
                    onChange={e => setNewFieldName(e.target.value)} 
                    placeholder="Name"
                />
                <div className="info">Art: </div>
                <select className="info border" onChange={e => setNewFieldType(e.target.value)}>
                    <option value="string">Text</option>
                    <option value="number">Zahl</option>
                    <option value="options">Auswahlmöglichkeiten festlegen</option>
                </select>
                {(newFieldType === "options") && (<>Options Auswahl</>)}
                <button type="submit" className="btn">
                    <span className="icon"><FaSave/></span>
                    <span className="btn-label">Neue Kategorie speichern</span>
                </button>
                <button className="btn" onClick={(event) => {
                    event.preventDefault();
                    toggleNewFieldForm(false);
                }}>
                    <span className="icon"><FaTimesCircle/></span>
                    <span className="btn-label">Abbrechen</span>
                </button>
            </form>
        </div>
    </div>
    )
};

export default FieldEdit