import { Contribution, getContributions } from "@/app/utils";
import { useState, useEffect } from "react";
import CodingBox from "./CodingBox";

const Coding: React.FC = () => {
    const [contributions, setContributions] = useState<Contribution[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const contributionArray = getContributions()
        setContributions(contributionArray);
        setLoading(false);
    }, []);

    if (loading) {
        return(<></>)
    };
    
    return(
        <div className="displayBlock">
           {contributions.length > 0 ? (
                <span>
                    {contributions.map((contribution, index) => (
                        <CodingBox key={index} contributionWithId={contribution} contributionArray={contributions}/>
                    ))}
                </span>
            ) : (   
                <p>Keine Beiträge vorhanden.</p>
            )}
        </div>
    );
}

export default Coding;