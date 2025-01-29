import { TDados } from "pages/VisoesBI/Stock/dados"

const dados: TDados[] = [
    {
        columnName: "Programados",
        type: "sumStart", //buscar uma identificação melhor para a coluna de soma
        items: [
            {
                name: "chapas",
                value: 149
            },
            {
                name: "m2",
                value: 995.12
            }
        ]
    },
    {
        columnName: "Finalizado",
        type: "normal",
        items: [
            {
                name: "chapas",
                value: 132
            },
            {
                name: "m2",
                value: 836.52 
            },
        ]
    },
]

const table = [
    {
        Material: 'Branco Itaunas',
        Data: '15/01/2025',
        Qtd: 63,
        M2: 408.81,
        Bloco: 11853,
        Class: 'S/C',
        Status: 'Programado',
    },
    {
        Material: 'Verde Perola',
        Data: '15/01/2025',
        Qtd: 47,
        M2: 303.81,
        Bloco: 11844,
        Class: 'B+',
        Status: 'Finalizado',
    },
    {
        Material: 'Verde Ubatuba',
        Data: '16/01/2025',
        Qtd: 43,
        M2: 276.81,
        Bloco: 11825,
        Class: 'S/C',
        Status: 'Programado',
    },
    {
        Material: 'Verde Ubatuba',
        Data: '16/01/2025',
        Qtd: 43,
        M2: 269.61,
        Bloco: 11833,
        Class: 'S/C',
        Status: 'Programado',
    },
]

export {dados, table}