export type TDados = {
    columnName: string;
    type: 'sumStart' | 'normal' | 'sumEnd';
    items: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: string;
    })[];
}

const dados: TDados[] = [
    {
        columnName: "totalPolidas",
        type: "sumStart", //buscar uma identificação melhor para a coluna de soma
        items: [
            {
                name: "chapas",
                value: "4693"
            },
            {
                name: "m2",
                value: 27672.74
            }
        ]
    },
    {
        columnName: "A",
        type: "normal",
        items: [
            {
                name: "chapas",
                value: 2558
            },
            {
                name: "m2",
                value: 15279.14 
            },
        ]
    },
    {
        columnName: "AB",
        type: "normal",
        items: [
            {
                name: "chapas",
                value: 890
            },
            {
                name: "m2",
                value: 5165.25 
            },
        ]
    },
    {
        columnName: "B",
        type: "normal",
        items: [
            {
                name: "chapas",
                value: 668
            },
            {
                name: "m2",
                value: 3909.40 
            },
        ]
    },
    {
        columnName: "B+",
        type: "normal",
        items: [
            {
                name: "chapas",
                value: 328
            },
            {
                name: "m2",
                value: 1870.25
            },
        ]
    },
    {
        columnName: "Outras",
        type: "normal",
        items: [
            {
                name: "chapas",
                value: 249
            },
            {
                name: "m2",
                value: 1448.7 
            },
        ]
    },
    {
        columnName: "Total Brutas",
        type: "sumEnd",
        items: [
            {
                name: "chapas",
                value: 1643
            },
            {
                name: "m2",
                value: 9990.78 
            },
        ]
    },
]

export default dados