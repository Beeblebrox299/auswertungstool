import { useEffect, useState } from "react";
import { getCategories, getContributions } from "@/app/utils";

const ContributionTable: React.FC = () => {
    const [contributions, setContributions] = useState<Record<string, any>[]>([])
    useEffect(() => {
        const contributionArray = getContributions()
        const categoryArray = getCategories()
        const contributionContentArray: Record<string, any>[] = [...contributionArray];
        contributionContentArray.forEach(contribution => {
            const getCategoryName = () => {
                const category = categoryArray.find(category => {
                    return category.id === contribution.category
                })
                if (!category) {
                    return "Keine Kategorie"
                }
                return category.name
            }
            delete contribution.id;
            contribution.category = getCategoryName()
        });
        setContributions(contributionContentArray);
    }, [])
    const contributionKeys:string[] = Array.from(new Set(contributions.flatMap(Object.keys)));

    return(
        <div>
            {contributions.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            {contributionKeys.map((key) => (
                                <th key={key}>{key === "category" ? "Kategorie" : key}</th>
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