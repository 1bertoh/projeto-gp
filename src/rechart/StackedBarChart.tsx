import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

const StackedBarChart = () => {
    const data = [
        {
            name: 'Edmar Almeida',
            goal: 80,
            achieved: 20,
        },
        {
            name: 'Rafael Belge',
            goal: 50,
            achieved: 50,
        },
        {
            name: 'Sandro Guioto',
            goal: 30,
            achieved: 70,
        },
        {
            name: 'Thiago Borges',
            goal: 10,
            achieved: 90,
        },

    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                layout="vertical" // Transforma em gráfico vertical
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                
            >
                <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                <XAxis type="number" /> {/* Eixo X para valores numéricos */}
                <YAxis dataKey="name" type="category" /> {/* Eixo Y com as categorias */}
                <Tooltip />
                <Legend/>
                <Bar dataKey="achieved" stackId="a" fill="#38b000" >
                    <LabelList
                        fill="#fff" fontWeight="bold"
                        dataKey="achieved"
                        position="inside"
                        offset={8}
                        className="fill-foreground"
                        fontSize={20}
                        formatter={(value) => `${value}%`}
                        color='white'
                    />
                </Bar>
                <Bar dataKey="goal" stackId="a" fill="#333533">
                    <LabelList
                        fill="#fff" fontWeight="bold"
                        dataKey="goal"
                        position="inside"
                        offset={8}
                        className="fill-foreground"
                        fontSize={20}
                        formatter={(value) => `${value}%`}
                        color='white'
                    />

                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default StackedBarChart;
