import { getCategories, getContributions } from "@/app/utils";
import { PieChart, Pie } from "recharts";

const Graphics: React.FC = () => {
    const categories = getCategories();
    const contributions = getContributions();

    const RenderPieChart = () => {
        return (
        <PieChart/>
    )};

    return( 
        <div>
            <RenderPieChart/>
        </div>
    );
}

export default Graphics;