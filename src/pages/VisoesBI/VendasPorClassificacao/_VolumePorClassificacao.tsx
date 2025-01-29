import Breadcrumb from 'Components/Common/Breadcrumb';
import React from 'react';
import { Container } from 'reactstrap';
import {
    Bar,
    CartesianGrid,
    Cell,
    ComposedChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

type Props = {};

const VolumePorClassificacao = (props: Props) => {
    const data = [
        {
            name: 'A',
            value: 100,
            color: "#2654B8"
        },
        {
            name: 'Ab',
            value: 80,
            color: "#D4AD00"
        },
        {
            name: 'B+',
            value: 50,
            color: "#374649"
        },
        {
            name: 'B',
            value: 15,
            color: "#01B8AA"
        },
        {
            name: 'BS',
            value: 2,
            color: "#00AC55"
        },

    ];

    return (
        <div>
            <div className='w-100'>
                <h4 className='text-center'>Volume por Classificação</h4>
                <ResponsiveContainer width="100%" height={200}>
                    <ComposedChart
                        layout="vertical"
                        data={data}
                        margin={{
                            top: 20,
                            bottom: 20,
                        }}
                        
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis reversed type="number" hide />
                        <YAxis
                            orientation='right'
                            dataKey="name"
                            type="category"
                            scale="auto"
                            width={100} // Espaço suficiente para os nomes longos
                            tick={{ fontSize: 12, fill: '#000' }} // Ajusta fonte e cor dos nomes
                        />
                        <Tooltip />
                        {/* Criar as barras empilhadas com cores específicas */}
                        <Bar activeBar={{ stroke: 'red', strokeWidth: 2 }} dataKey={'value'} fill={'color'} barSize={20} >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default VolumePorClassificacao;
