'use client';

import Coding from "@/app/components/Project/edit/Coding";
import Link from "next/link";

const CodingPage: React.FC = () => {
    return(
        <div>
            <Coding/>
            <div className="displayBlock">
                <h1>Nächste Schritte: </h1>
                <Link className="btn" href={"/overview"}>Alle Beiträge ansehen</Link>
                <Link className="btn" href={"/analysis"}>Diagramme erstellen</Link>
            </div>
        </div>
    )
};

export default CodingPage;