import { Category, Contribution, getCategories, getContributions, getFields } from "@/app/utils";
import Link from "next/link";
import { useEffect, useState } from "react"
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

const CategoryAccordion: React.FC = () => {
    console.log("he")
    const [openCategory, setOpenCategory] = useState<number|null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [contributions, setContributions] = useState<Contribution[]>([]);
    const fields = getFields();

    useEffect (() => {
        const storedCategories = getCategories();
        storedCategories.sort((a, b) => b.assignedTo.length - a.assignedTo.length);
        setCategories(storedCategories);
        setContributions(getContributions());
    }, []);

    const toggleOpenCategory = (categoryId: number) => {
        setOpenCategory((openCategory === categoryId) ? null : categoryId)
    };

    const getContributionContent = (contribution: Contribution) => {
        const contributionContent: Record<string, any> = {...contribution};

        delete contributionContent.id;
        delete contributionContent.categories;
        delete contributionContent.categories_confirmed;
        
        return (
            <div className="info border">
                {fields.map((field) => (
                    <div className="info border" style={{whiteSpace: "pre-wrap"}} key={field.id}>
                        <b>{field.name}:</b> <br/>{contributionContent[field.id]}
                    </div>
                ))}
            </div>
        )
    }
    return (<>
        <div className="displayBlock">
        {categories.map((category) =>(
            <div key={category.id} className="info border">
                <h2 onClick={() => toggleOpenCategory(category.id)}>{(openCategory !== category.id) ? <FaArrowRight/> : <FaArrowDown/>} {category.name} ({category.assignedTo.length} {(category.assignedTo.length === 1) ? "Beitrag" : "Beiträge"})</h2>
                {openCategory === category.id && (
                    <ul>
                        {contributions.filter((contribution) => contribution.categories.includes(category.id)).map((contributionWithCategory) => (
                            <li key={contributionWithCategory.id}>
                                {getContributionContent(contributionWithCategory)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        ))}
        </div>
        <div className="displayBlock">
            <h1>Nächste Schritte: </h1>
            <Link className="btn" href={"/analysis"}>Diagramme erstellen</Link>
            <Link className="btn" href={"/report"}>Bericht erstellen</Link>
        </div>
        </>
    )
};

export default CategoryAccordion;