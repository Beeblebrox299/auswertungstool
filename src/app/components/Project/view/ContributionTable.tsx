import { useEffect, useState } from "react";
import { getCategories, getContributions } from "@/app/utils";

const ContributionTable: React.FC = () => {
    const [contributions, setContributions] = useState<Record<string, any>[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const contributionArray = getContributions()
        const categoryArray = getCategories()
        const contributionContentArray: Record<string, any>[] = [...contributionArray];
        contributionContentArray.forEach(contribution => {
            const getCategoryNames = () => {
                const categories = categoryArray.filter(category => {
                    return contribution.categories.includes(category.id)
                })
                const categoryNames = categories.map(category => "- " + category.name)
                return categoryNames.join("\n")
            }
            contribution.Kategorie = getCategoryNames();
            delete contribution.id;
            delete contribution.categories;
        });
        setContributions(contributionContentArray);
        setLoading(false);
    }, [])
    const contributionKeys:string[] = Array.from(new Set(contributions.flatMap(Object.keys)));

    if (loading) {
        return(<></>)
    }

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
                                    <td style={{whiteSpace: "pre-wrap"}} key={key}>
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