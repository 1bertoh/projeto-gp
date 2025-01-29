import React from "react";
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Area,
    ResponsiveContainer,
    LabelList,
    Cell
} from "recharts";

export default function VerticalComposedChart(props: { value: any[] }) {
    const { value } = props
    const total = value.reduce((acc, item) => acc + item.value, 0);
    const dataWithPercentage = value.map(item => ({
        ...item,
        percentage: ((item.value / total) * 100).toFixed(2), // Porcentagem com 2 casas decimais
    }));
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width={'100%'}>
                <ComposedChart
                    layout="vertical"
                    data={dataWithPercentage}
                    margin={{
                        top: 20,
                        right: 50,
                        bottom: 20,
                        left: 20
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis hide type="number" />
                    <YAxis axisLine={false}  dataKey="name" type="category" scale="band" />
                    <Tooltip />
                    {/* <Legend /> */}
                    {/* <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
                    <Bar dataKey="value" barSize={20} fill="#413ea0" >
                        <LabelList
                            dataKey="percentage"
                            position="right" // Mostra as porcentagens na frente da barra
                            formatter={(value) => `${value}%`}
                        />
                        {dataWithPercentage.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                    {/* <Line dataKey="uv" stroke="#ff7300" /> */}
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
