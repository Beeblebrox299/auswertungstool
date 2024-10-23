import { useEffect, useState } from "react";
import { getCategories, getContributions, getFields } from "@/app/utils";

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
            contribution.Kategorien = getCategoryNames();
            delete contribution.id;
            delete contribution.categories;
        });
        setContributions(contributionContentArray);
        setLoading(false);
    }, []);

    const fields = getFields();

    if (loading) {
        return(<></>)
    }

    return(
        <div>
            {contributions.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            {fields.map((field) => (
                                <th key={field.id}>{field.name}</th>
                            ))}
                            <th key="categories">Kategorie(n)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contributions.map((contribution, index) => (
                            <tr key={index}>
                                {fields.map((field) => (
                                    <td style={{whiteSpace: "pre-wrap"}} key={field.id}>
                                        {contribution[field.id] !== undefined ? contribution[field.id] : 'N/A'}
                                    </td>
                                ))}
                                <td key="categories" style={{whiteSpace: "pre-wrap"}}>{contribution.Kategorien}</td>
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