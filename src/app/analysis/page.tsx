'use client'

import { AgePieChart, CategoriesBarChart } from "../components/Project/view/Graphics";

const Analysis: React.FC = () => {
    return(
        <div>
            <CategoriesBarChart/>
            <AgePieChart/>
        </div>
    )
};

export default Analysis;