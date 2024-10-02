import { useEffect, useState } from "react";

const ContributionTable: React.FC = () => {
    const [contributions, setContributions] = useState<Object[]|null>(null)
    useEffect(() => {
        const contributionString = localStorage.getItem("contributions")
        let contributionArray:any[] = (contributionString != null) ? JSON.parse(contributionString) : [];
        contributionArray.forEach( (contribution) => {
            delete contribution.id;
        })
        setContributions(contributionArray);
    }, [])
    const contributionArray:any[] = (contributions != null) ? contributions : [];
    const contributionKeys:string[] = Array.from(new Set(contributionArray.flatMap(Object.keys)));

    return(
        <div>
            {contributionArray.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            {contributionKeys.map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                            {contributionArray.map((contribution, index) => (
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