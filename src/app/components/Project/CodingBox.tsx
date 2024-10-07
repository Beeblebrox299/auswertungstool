import { getArrayFromStorage } from "@/app/utils";
import React from "react";

const CodingBox: React.FC<{contributionWithId: Record<string, any>, contributionArray:Record<string, any>[]}> = ({contributionWithId, contributionArray}) => {
    const contributionContent = {...contributionWithId};
    delete contributionContent.id;
    const contributionKeys: string[] = Object.keys(contributionContent);
    const categories = getArrayFromStorage("categories")
    // TODO: save category selection
    return(
        <div className="displayBlock">
            <span className="info">
                {contributionKeys.map((key) => (
                    <div className="info border" key={key}><b>{key}:</b> <br/>{contributionContent[key]}</div>
                ))}
                <select defaultValue={"default"} className="info border">
                    <option disabled value="default">Kategorie auswählen...</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </span>
            <button className="btn">Speichern</button>
        </div>
    );
}

export default CodingBox;