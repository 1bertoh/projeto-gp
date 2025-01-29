import Breadcrumb from 'Components/Common/Breadcrumb';
import React from 'react';
import { Container } from 'reactstrap';
import {
    Bar,
    CartesianGrid,
    ComposedChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

// Dados originais
const data = [
    {
        name: 'Carrara',
        vendas: [
            { nome: 'Alcir Soares', valor: 120, cor: '#01B8AA' },
            { nome: 'Bruno Gullo', valor: 240, cor: '#374649' },
            { nome: 'Cleuson Benedito', valor: 890, cor: '#FD625E' },
            { nome: 'José Marcos', valor: 710, cor: '#F2C80F' },
            { nome: 'Kleber Massena', valor: 580, cor: '#5F6B6D' },
            { nome: 'Tiago Paiva', valor: 670, cor: '#A66999' },
        ],
    },
    {
        name: 'Verde Ubatuba',
        vendas: [
            { nome: 'Alcir Soares', valor: 150, cor: '#01B8AA' },
            { nome: 'Bruno Gullo', valor: 320, cor: '#374649' },
            { nome: 'Cleuson Benedito', valor: 910, cor: '#FD625E' },
            { nome: 'José Marcos', valor: 730, cor: '#F2C80F' },
            { nome: 'Kleber Massena', valor: 600, cor: '#5F6B6D' },
            { nome: 'Tiago Paiva', valor: 680, cor: '#A66999' },
        ],
    },
    {
        name: 'Branco Paraná',
        vendas: [
            { nome: 'Alcir Soares', valor: 170, cor: '#01B8AA' },
            { nome: 'Bruno Gullo', valor: 310, cor: '#374649' },
            { nome: 'Cleuson Benedito', valor: 880, cor: '#FD625E' },
            { nome: 'José Marcos', valor: 690, cor: '#F2C80F' },
            { nome: 'Kleber Massena', valor: 540, cor: '#5F6B6D' },
            { nome: 'Tiago Paiva', valor: 720, cor: '#A66999' },
        ],
    },
    {
        name: 'Preto São Gabriel',
        vendas: [
            { nome: 'Alcir Soares', valor: 140, cor: '#01B8AA' },
            { nome: 'Bruno Gullo', valor: 290, cor: '#374649' },
            { nome: 'Cleuson Benedito', valor: 940, cor: '#FD625E' },
            { nome: 'José Marcos', valor: 770, cor: '#F2C80F' },
            { nome: 'Kleber Massena', valor: 620, cor: '#5F6B6D' },
            { nome: 'Tiago Paiva', valor: 740, cor: '#A66999' },
        ],
    },
    {
        name: 'Marrom Imperial',
        vendas: [
            { nome: 'Alcir Soares', valor: 130, cor: '#01B8AA' },
            { nome: 'Bruno Gullo', valor: 340, cor: '#374649' },
            { nome: 'Cleuson Benedito', valor: 890, cor: '#FD625E' },
            { nome: 'José Marcos', valor: 710, cor: '#F2C80F' },
            { nome: 'Kleber Massena', valor: 530, cor: '#5F6B6D' },
            { nome: 'Tiago Paiva', valor: 650, cor: '#A66999' },
        ],
    },
    {
        name: 'Granito Rosa',
        vendas: [
            { nome: 'Alcir Soares', valor: 190, cor: '#01B8AA' },
            { nome: 'Bruno Gullo', valor: 300, cor: '#374649' },
            { nome: 'Cleuson Benedito', valor: 970, cor: '#FD625E' },
            { nome: 'José Marcos', valor: 740, cor: '#F2C80F' },
            { nome: 'Kleber Massena', valor: 510, cor: '#5F6B6D' },
            { nome: 'Tiago Paiva', valor: 790, cor: '#A66999' },
        ],
    },
    {
        name: 'Crema Marfil',
        vendas: [
            { nome: 'Alcir Soares', valor: 160, cor: '#01B8AA' },
            { nome: 'Bruno Gullo', valor: 310, cor: '#374649' },
            { nome: 'Cleuson Benedito', valor: 920, cor: '#FD625E' },
            { nome: 'José Marcos', valor: 680, cor: '#F2C80F' },
            { nome: 'Kleber Massena', valor: 590, cor: '#5F6B6D' },
            { nome: 'Tiago Paiva', valor: 720, cor: '#A66999' },
        ],
    },
    {
        name: 'Branco Ceará',
        vendas: [
            { nome: 'Alcir Soares', valor: 110, cor: '#01B8AA' },
            { nome: 'Bruno Gullo', valor: 260, cor: '#374649' },
            { nome: 'Cleuson Benedito', valor: 890, cor: '#FD625E' },
            { nome: 'José Marcos', valor: 690, cor: '#F2C80F' },
            { nome: 'Kleber Massena', valor: 500, cor: '#5F6B6D' },
            { nome: 'Tiago Paiva', valor: 780, cor: '#A66999' },
        ],
    },
    {
        name: 'Travertino Romano',
        vendas: [
            { nome: 'Alcir Soares', valor: 150, cor: '#01B8AA' },
            { nome: 'Bruno Gullo', valor: 330, cor: '#374649' },
            { nome: 'Cleuson Benedito', valor: 910, cor: '#FD625E' },
            { nome: 'José Marcos', valor: 750, cor: '#F2C80F' },
            { nome: 'Kleber Massena', valor: 600, cor: '#5F6B6D' },
            { nome: 'Tiago Paiva', valor: 740, cor: '#A66999' },
        ],
    },
    {
        name: 'Aurora Pérola',
        vendas: [
            { nome: 'Alcir Soares', valor: 180, cor: '#01B8AA' },
            { nome: 'Bruno Gullo', valor: 280, cor: '#374649' },
            { nome: 'Cleuson Benedito', valor: 950, cor: '#FD625E' },
            { nome: 'José Marcos', valor: 720, cor: '#F2C80F' },
            { nome: 'Kleber Massena', valor: 570, cor: '#5F6B6D' },
            { nome: 'Tiago Paiva', valor: 770, cor: '#A66999' },
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

type Props = {};

const VolumePorMaterial = (props: Props) => {
    return (
        <div className='d-flex gap-3 align-items-center' style={{marginRight: 50}}>
            <div className='w-100'>
                <h4 className='text-center'>Volume por Material</h4>
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart
                        layout="vertical"
                        data={transformedData}
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
                        {stackKeys.map((key) => (
                            <Bar key={key} dataKey={key} stackId="a" fill={colorMap[key]} barSize={30} />
                        ))}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <div>
                <div className='d-flex gap-2 align-items-center'>
                    <div style={{width: 10, height: 10, backgroundColor: '#01B8AA'}} className='rounded-circle'></div>
                    <span >Alci Soares</span>
                </div>
                <div className='d-flex gap-2 align-items-center'>
                    <div style={{width: 10, height: 10, backgroundColor: '#374649'}} className='rounded-circle'></div>
                    <span>Bruno Gullo</span>
                </div>
                <div className='d-flex gap-2 align-items-center'>
                    <div style={{width: 10, height: 10, backgroundColor: '#FD625E'}} className='rounded-circle'></div>
                    <span>Cleuson Benedito</span>
                </div>
                <div className='d-flex gap-2 align-items-center'>
                    <div style={{width: 10, height: 10, backgroundColor: '#F2C80F'}} className='rounded-circle'></div>
                    <span>Jose Marcos</span>
                </div>
                <div className='d-flex gap-2 align-items-center'>
                    <div style={{width: 10, height: 10, backgroundColor: '#5F6B6D'}} className='rounded-circle'></div>
                    <span>Kleber Massena</span>
                </div>
                <div className='d-flex gap-2 align-items-center'>
                    <div style={{width: 10, height: 10, backgroundColor: '#A66999'}} className='rounded-circle'></div>
                    <span>Tiago Paiva</span>
                </div>
            </div>
        </div>
    );
};

export default VolumePorMaterial;
