import { useEffect, useState } from "react";
import { getArrayFromStorage } from "@/app/utils";

const ContributionTable: React.FC = () => {
    const [contributions, setContributions] = useState<Record<string, any>[]>([])
    useEffect(() => {
        const contributionArray = getArrayFromStorage("contributions", false)
        setContributions(contributionArray);
    }, [])
    const contributionKeys:string[] = Array.from(new Set(contributions.flatMap(Object.keys)));

    return(
        <div>
            {contributions.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            {contributionKeys.map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {contributions.map((contribution, index) => (
                            <tr key={index}>
                                {contributionKeys.map((key) => (
                                    <td key={key}>
                                        {contribution[key] !== undefined ? contribution[key] : 'N/A'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (   
                <p>Keine Beiträge vorhanden.</p>
            )}
        </div>
    );
}

export default ContributionTable;