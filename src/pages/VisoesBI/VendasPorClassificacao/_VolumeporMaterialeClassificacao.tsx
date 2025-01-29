import Breadcrumb from 'Components/Common/Breadcrumb';
import React from 'react';
import { Container } from 'reactstrap';
import {
    Bar,
    CartesianGrid,
    ComposedChart,
    LabelList,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

type Props = {};

const VolumeVendasByClassificacao = (props: Props) => {
    const data = [
        {
            name: 'PRETO SÃO GABRIEL F2',
            'A': 50,
            'AB': 300,
            'B': 40,
            'BS': 0,
            'B+': 60,
        },
        {
            name: 'VERDE UBATUBA',
            'A': 100,
            'AB': 190,
            'B': 6,
            'BS': 0,
            'B+': 65,

        },
        {
            name: 'VERDE UBATUBA BR',
            'A': 50,
            'AB': 70,
            'B': 0,
            'BS': 0,
            'B+': 56,
        },
        {
            name: 'VERDE PEROLA',
            'A': 65,
            'AB': 45,
            'B': 3,
            'BS': 0,
            'B+': 36,
        },
        {
            name: 'OCRE ITABIRA',
            'A': 65,
            'AB': 45,
            'B': 17,
            'BS': 0,
            'B+': 7,
        },
        {
            name: 'BRANCO ITAUNAS',
            'A': 50,
            'AB': 60,
            'B': 20,
            'BS': 0,
            'B+': 25,
        },

    ];

    const renderCustomLabel = (props) => {
        const { x, y, width, height, value, fill } = props;
        const textColor = fill === '#ff5011' ? 'yellow' : 'black'; // Define a cor baseada em `fill`

        return (
            <text
                x={x + width / 2}
                y={y + height / 2}
                fill={'white'} // Cor dinâmica
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontSize: '12px', fontWeight: 'bold', position: 'relative', zIndex: 1000 }}
            >
                {value}%
            </text>
        );
    };

    return (
        <div>
            <div>
                <h4 className='text-center'>Volume por Material e Classificação</h4>
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart
                        layout="vertical"
                        data={data}
                        margin={{
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            scale="auto"
                            width={100} // Espaço suficiente para os nomes longos
                            tick={{ fontSize: 12, fill: '#000' }} // Ajusta fonte e cor dos nomes
                        />
                        <Tooltip />
                        {/* Criar as barras empilhadas com cores específicas */}
                        <Bar dataKey={'A'} stackId="a" fill={'#2654B8'} barSize={30} />
                        <Bar dataKey={'AB'} stackId="a" fill={"#D4AD00"} barSize={30} />
                        <Bar dataKey={'B'} stackId="a" fill={"#374649"} barSize={30} />
                        <Bar dataKey={'B+'} stackId="a" fill={"#344e41"} barSize={30} />
                        <Bar dataKey={'BS'} stackId="a" fill={"#01B8AA"} barSize={30} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <div className='d-flex justify-content-center gap-3 w-100'>
                <span className="d-flex align-items-center gap-1">
                    <span style={{ backgroundColor: '#2654B8', width: '1rem', height: '1rem' }} className='d-inline-block rounded-circle'></span>
                    <span>A</span>
                </span>
                <span className="d-flex align-items-center gap-1">
                    <span style={{ backgroundColor: '#D4AD00', width: '1rem', height: '1rem' }} className='d-inline-block rounded-circle'></span>
                    <span>AB</span>
                </span>
                <span className="d-flex align-items-center gap-1">
                    <span style={{ backgroundColor: '#374649', width: '1rem', height: '1rem' }} className='d-inline-block rounded-circle'></span>
                    <span>B</span>
                </span>
                <span className="d-flex align-items-center gap-1">
                    <span style={{ backgroundColor: '#01B8AA', width: '1rem', height: '1rem' }} className='d-inline-block rounded-circle'></span>
                    <span>B S</span>
                </span>
                <span className="d-flex align-items-center gap-1">
                    <span style={{ backgroundColor: '#00AC55', width: '1rem', height: '1rem' }} className='d-inline-block rounded-circle'></span>
                    <span>B+</span>
                </span>
            </div>
        </div>
    );
};

export default VolumeVendasByClassificacao;
