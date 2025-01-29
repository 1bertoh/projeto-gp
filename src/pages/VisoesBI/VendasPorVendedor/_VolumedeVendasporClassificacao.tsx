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
        name: 'josé Marcos',
        vendas: [
            { nome: 'A', valor: 37, cor: '#072ac8' },
            { nome: 'AB', valor: 36, cor: '#f6ae2d' },
            { nome: 'B', valor: 6, cor: '#2f4858' },
            { nome: 'BS', valor: 0, cor: '#17c3b2' },
            { nome: 'B+', valor: 21, cor: '#4c934c' },
        ],
    },
    {
        name: 'Bruno Gullo',
        vendas: [
            { nome: 'A', valor: 35, cor: '#072ac8' },
            { nome: 'AB', valor: 49, cor: '#f6ae2d' },
            { nome: 'B', valor: 6, cor: '#2f4858' },
            { nome: 'BS', valor: 0, cor: '#17c3b2' },
            { nome: 'B+', valor: 10, cor: '#4c934c' },
        ],
    },
    {
        name: 'Kleber Massena',
        vendas: [
            { nome: 'A', valor: 64, cor: '#072ac8' },
            { nome: 'AB', valor: 25, cor: '#f6ae2d' },
            { nome: 'B', valor: 4, cor: '#2f4858' },
            { nome: 'BS', valor: 0, cor: '#17c3b2' },
            { nome: 'B+', valor: 6, cor: '#4c934c' },
        ],
    },
    {
        name: 'Cleuson Benedito',
        vendas: [
            { nome: 'A', valor: 59, cor: '#072ac8' },
            { nome: 'AB', valor: 14, cor: '#f6ae2d' },
            { nome: 'B', valor: 3, cor: '#2f4858' },
            { nome: 'BS', valor: 0, cor: '#17c3b2' },
            { nome: 'B+', valor: 24, cor: '#4c934c' },
        ],
    },
    {
        name: 'Aki Soares',
        vendas: [
            { nome: 'A', valor: 36, cor: '#072ac8' },
            { nome: 'AB', valor: 40, cor: '#f6ae2d' },
            { nome: 'B', valor: 0, cor: '#2f4858' },
            { nome: 'BS', valor: 0, cor: '#17c3b2' },
            { nome: 'B+', valor: 24, cor: '#4c934c' },
        ],
    },
    {
        name: 'Tiago Paiva',
        vendas: [
            { nome: 'A', valor: 50, cor: '#072ac8' },
            { nome: 'AB', valor: 18, cor: '#f6ae2d' },
            { nome: 'B', valor: 2, cor: '#2f4858' },
            { nome: 'BS', valor: 0, cor: '#17c3b2' },
            { nome: 'B+', valor: 30, cor: '#4c934c' },
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

const VolumeVendasByClassificacao = (props: Props) => {

    const renderCustomLabel = (props) => {
        const { x, y, width, height, value } = props;
        const fontSize = height < 15 ? 0 : 12; // Ajusta o tamanho da fonte com base na largura da barra
    
        return (
            <text
                x={x + width / 2}
                y={y + height / 2}
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontSize: `${fontSize}px`, fontWeight: 'bold' }}
            >
                {value}%
            </text>
        );
    };

    return (
        <div>
            <div className='w-100'>
                <h4 className='text-center'>Volume de Vendas por Classificação</h4>
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart
                        data={transformedData}
                        margin={{
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey={'name'} scale={'auto'} type="category" />

                        {/* Criar as barras empilhadas com cores específicas */}
                        {stackKeys.map((key) => (
                            <Bar key={key} dataKey={key} stackId="a" color='white' fill={colorMap[key]} barSize={60} >
                                <LabelList dataKey={key} position="inside" content={renderCustomLabel} />

                            </Bar>
                        ))}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <div className='d-flex justify-content-center gap-3 w-100'>
                <span className="d-flex align-items-center gap-1">
                    <span style={{ backgroundColor: '#072ac8', width: '1rem', height: '1rem' }} className='d-inline-block rounded-circle'></span>
                    <span>A</span>
                </span>
                <span className="d-flex align-items-center gap-1">
                    <span style={{ backgroundColor: '#f6ae2d', width: '1rem', height: '1rem' }} className='d-inline-block rounded-circle'></span>
                    <span>AB</span>
                </span>
                <span className="d-flex align-items-center gap-1">
                    <span style={{ backgroundColor: '#2f4858', width: '1rem', height: '1rem' }} className='d-inline-block rounded-circle'></span>
                    <span>B</span>
                </span>
                <span className="d-flex align-items-center gap-1">
                    <span style={{ backgroundColor: '#17c3b2', width: '1rem', height: '1rem' }} className='d-inline-block rounded-circle'></span>
                    <span>B S</span>
                </span>
                <span className="d-flex align-items-center gap-1">
                    <span style={{ backgroundColor: '#4c934c', width: '1rem', height: '1rem' }} className='d-inline-block rounded-circle'></span>
                    <span>B+</span>
                </span>
            </div>
        </div>
    );
};

export default VolumeVendasByClassificacao;
