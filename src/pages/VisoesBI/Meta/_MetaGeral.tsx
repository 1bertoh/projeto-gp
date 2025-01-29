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

// Dados originais
const data = [
    {
        name: 'Meta Geral',
        vendas: [
            { nome: 'Meta', valor: 37, cor: '#FEBA31' },
            { nome: 'Desafio GP', valor: 36, cor: '#19E20B' },
            { nome: '% Atingida', valor: 6, cor: '#483FC3' },
        ],
    },

];


// Criar um mapeamento global de cores por vendedor
const colorMap: Record<string, string> = {};
data.forEach((item) =>
    item.vendas.forEach((venda) => {
        colorMap[venda.nome] = venda.cor; // Associar cada vendedor à sua cor
    })
);

// Transformar os dados para o formato correto para o Recharts
const transformedData = data.map((item) => {
    const vendas = item.vendas.reduce((acc, venda) => {
        acc[venda.nome] = venda.valor; // Adiciona o nome como chave e o valor como valor
        return acc;
    }, {});

    return {
        name: item.name,
        ...vendas, // Adiciona os valores ao objeto principal
    };
});

// Extrair os nomes dos vendedores para as stacks
const stackKeys = Object.keys(colorMap);
console.log(stackKeys, transformedData, 'batatas')

type Props = {};

const MetaGeral = (props: Props) => {

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
            <div className='w-100'>
                <h4 className='text-center'>Meta Geral</h4>
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart
                        data={transformedData}
                        margin={{
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis orientation='top' axisLine={false} hide dataKey={'name'} scale={'auto'} type="category" />

                        {/* Criar as barras empilhadas com cores específicas */}
                        {stackKeys.map((key) => (
                            <Bar key={key} dataKey={key} color='white' fill={colorMap[key]} barSize={60} >
                                <LabelList dataKey={key} position="inside" content={renderCustomLabel} />
                            </Bar>
                        ))}
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

export default MetaGeral;
