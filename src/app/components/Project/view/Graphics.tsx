import { getCategories, getContributions, getFields } from "@/app/utils";
import { useEffect, useState } from "react";
import { BarChart, XAxis, YAxis, Bar, PieChart, Pie } from "recharts";

export const CategoriesBarChart: React.FC = () => {
    const [isClient, setIsClient] = useState<boolean>(false);
    useEffect (() => {
        setIsClient(true)
    }, []);

    const data: {name: string, value: number}[] = [];
    const categories = getCategories();
    categories.sort((a, b) => b.assignedTo.length - a.assignedTo.length);
    categories.forEach((category => {
        data.push({name: category.name, value: category.assignedTo.length})
    }));

    const maxWidth: number = 800;
    const width: number = ((data.length * 150 + 200) < maxWidth) ? data.length * 150 + 200 : maxWidth;

    const renderAxisTicks = ({ x, y, payload }: {x:number, y:number, payload:{value:string, [key:string]: any}}) => {
        return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
                {payload.value}
            </text>
        </g>
        );
    };

    return( 
        <div>
            {isClient && (
            <BarChart width={width} height={width/1.5} data={data}>
                <XAxis height={175} dataKey="name" tick={renderAxisTicks} interval={0}/>
                <YAxis width={120}/>
                <Bar dataKey="value" barSize={(width-300) / data.length} fill="lightgrey" label/>
            </BarChart>
            )}
        </div>
    );
};

const CategoriesBarChartByAge:React.FC = () => {
    return(<>This is a beautiful Chart!</>)
}

export const AgePieChart: React.FC = () => {
    const [isClient, setIsClient] = useState<boolean>(false);
    useEffect (() => {
        setIsClient(true)
    }, []);
    
    const contributions = getContributions();
    const fields = getFields();
    const ageFieldId = JSON.stringify(fields.find(field => field.name === "Altersgruppe")?.id);
    const data:{name:string, value:number}[] = []
    contributions.forEach((contribution) => {
        const index = data.findIndex(item => item.name === contribution[(ageFieldId) ? ageFieldId : "Altersgruppe"])
        if (index === -1) {
            data.push({name: contribution[ageFieldId], value: 1})
        }
        else {
            data[index].value += 1
        }
    });
    data.sort((a, b) => b.value - a.value);

    const RADIAN = Math.PI / 180;    
    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, name}:{name:string, [key:string]:any}) => {
        const percentRadius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const nameRadius = percentRadius + 100;

        const percentX = cx + percentRadius * Math.cos(-midAngle * RADIAN);
        const percentY = cy + percentRadius * Math.sin(-midAngle * RADIAN);

        const nameX = cx + nameRadius * Math.cos(-midAngle * RADIAN);
        const nameY = cy + nameRadius * Math.sin(-midAngle * RADIAN);

        return (<>
            <text x={percentX} y={percentY} fill="black" textAnchor={percentX > cx ? 'start' : 'end'} dominantBaseline="central">
                {(percent*100).toFixed(2)}%
            </text>
            <text x={nameX} y={nameY} fill="black" textAnchor={percentX > cx ? 'start' : 'end'} dominantBaseline="central">
                {name}
            </text>
        </>
        );
      };

    return(
        <div>
        {isClient && (
            <PieChart width={650} height={400}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    label={renderCustomizedLabel}
                    fill="lightgrey"
                    width={150}
                    height={150}
                >
                </Pie>
            </PieChart>
        )}
        </div>
    )
};