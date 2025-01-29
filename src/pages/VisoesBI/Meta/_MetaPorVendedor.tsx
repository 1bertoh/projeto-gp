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

const MetaPorVendedor = (props: Props) => {
    const data = [
        { name: 'Alci Soares', Meta: 100, 'Desafio GP': 120, '% Atingida': 68 },
        { name: 'Bruno Gullo', Meta: 100, 'Desafio GP': 110, '% Atingida': 26 },
        { name: 'Cleuson Benedito', Meta: 100, 'Desafio GP': 107, '% Atingida': 41 },
        { name: 'José Marcos', Meta: 100, 'Desafio GP': 107, '% Atingida': 55 },
        { name: 'Kleber Massena', Meta: 100, 'Desafio GP': 120, '% Atingida': 35 },
        { name: 'Tiago Paiva', Meta: 100, 'Desafio GP': 100, '% Atingida': 16 },
    ];

    return (
        <div>
            <div className='w-100'>
                <h4 className='text-center'>Meta Por Vendedor</h4>
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart
                        layout="vertical"
                        data={data}
                        margin={{
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis type="number" tick={false} orientation='top' axisLine={false} />
                        <YAxis  
                            dataKey="name"
                            type="category"
                            scale="auto"
                            width={100} // Espaço suficiente para os nomes longos
                            tick={{ fontSize: 12, fill: '#000' }} // Ajusta fonte e cor dos nomes
                        />
                        <Tooltip />
                        {/* Criar as barras empilhadas com cores específicas */}
                        <Bar key={`1-meta`} dataKey={'Meta'} fill={"#FEBA31"} barSize={40} >
                            <LabelList
                                dataKey="Meta"
                                position="right" // Mostra as porcentagens na frente da barra
                                formatter={(value) => `${value}%`}
                            />
                        </Bar>
                        <Bar key={'2-desafio'} dataKey={'Desafio GP'} fill={"#19E20B"} barSize={40} />
                        <Bar key={'3-Atingida'} dataKey={"% Atingida"} fill={"#483FC3"} barSize={40} >
                            <LabelList
                                dataKey="% Atingida"
                                position="right" // Mostra as porcentagens na frente da barra
                                formatter={(value) => `${value}%`}
                            />
                        </Bar>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <div className='d-flex justify-content-center gap-3 w-100'>
                <span className="d-flex align-items-center gap-1">
                    <span style={{ backgroundColor: '#FEBA31', width: '1rem', height: '1rem' }} className='d-inline-block rounded-circle'></span>
                    <span>Meta</span>
                </span>
                <span className="d-flex align-items-center gap-1">
                    <span style={{ backgroundColor: '#19E20B', width: '1rem', height: '1rem' }} className='d-inline-block rounded-circle'></span>
                    <span>Desafio GP</span>
                </span>
                <span className="d-flex align-items-center gap-1">
                    <span style={{ backgroundColor: '#483FC3', width: '1rem', height: '1rem' }} className='d-inline-block rounded-circle'></span>
                    <span>% Atingida</span>
                </span>
            </div>
        </div>
    );
};

export default MetaPorVendedor;
