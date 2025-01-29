import React from "react";
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, LabelList, Cell } from "recharts";

const data = [
  { name: 'Goal', value: 80, color: "#333533" },
  { name: 'Achieved', value: 20, color: "#38b000" },
];


export default function SimpleTreeMap() {

  return (
    <ResponsiveContainer>
      <PieChart>
        <Tooltip />
        <Legend/>
        <Pie dataKey="value" data={data} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          <LabelList
            fill="#fff" fontWeight="bold"
            dataKey="value"
            position="inside"
            offset={8}
            className="fill-foreground"
            fontSize={15}
            formatter={(value) => `${value}%`}
            color='white'
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}