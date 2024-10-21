import { getCategories, getContributions } from "@/app/utils";
import { PieChart, Pie } from "recharts";

const Graphics: React.FC = () => {
    const categories = getCategories();
    const contributions = getContributions();

    //TODO: Make graphs

    const RenderPieChart = () => {
        return (
        <div>This is not a pie chart</div>
    )};

    return( 
        <div>
            <RenderPieChart/>
        </div>
    );
}

export default Graphics;