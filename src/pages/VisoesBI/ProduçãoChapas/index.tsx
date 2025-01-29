import Breadcrumb from 'Components/Common/Breadcrumb'
import StockColumn from './_stockColumn'
import React from 'react'
import { Container } from 'reactstrap'
import { dados, table as nodes } from './_dados'
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
} from "@table-library/react-table-library/table";


// import {axios as axiosFetch} from 'axios'

type Props = {}

const ProducaoChapas = (props: Props) => {

    const data = { nodes };

    const theme = useTheme([
        getTheme(),
        {
            HeaderRow: `
            background-color: #ffffff !important;
          `,
            Row: `
            &:nth-of-type(odd) {
              background-color: #ffffff !important;
            }
    
            &:nth-of-type(even) {
              background-color: #EFEFEF !important;
            }
            &:hover {
            background-color: red
            }
          `,
        },
    ]);

    const COLUMNS = [
        { label: "Material", renderCell: (item) => item.Material },
        { label: "Data", renderCell: (item) => item.Data },
        { label: "Qtd", renderCell: (item) => item.Qtd },
        { label: "M2", renderCell: (item) => item.M2 },
        { label: "Bloco", renderCell: (item) => item.Bloco },
        { label: "Class", renderCell: (item) => item.Class },
        { label: "Status", renderCell: (item) => item.Status },
    ];


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb title="Produção de Chapas Ontem e Hoje" breadPath={[{ link: "#", name: "Produção de Chapas de Ontem e de Hoje" }]} />
                    <div className='d-flex gap-3'>
                        <div className='d-flex gap-3'>
                            {
                                dados.map((dado) => <StockColumn dados={dado} />)
                            }
                        </div>
                        <div>
                            <div>
                                <div
                                    style={{
                                        textAlign: 'center', backgroundColor: '#535353', fontWeight: 'bold', color: 'white', fontSize: '1.5rem'
                                    }}
                                >
                                    Materiais em Produção
                                </div>
                                <Table className='' data={data} theme={theme}>
                                    {(tableList) => (
                                        <>
                                            <Header>
                                                <HeaderRow>
                                                    <HeaderCell>Material</HeaderCell>
                                                    <HeaderCell>Data</HeaderCell>
                                                    <HeaderCell>Qtd.</HeaderCell>
                                                    <HeaderCell>M2</HeaderCell>
                                                    <HeaderCell>Bloco</HeaderCell>
                                                    <HeaderCell>Class</HeaderCell>
                                                    <HeaderCell>Status</HeaderCell>
                                                </HeaderRow>
                                            </Header>

                                            <Body>
                                                {tableList.map((item, index) => (
                                                    <Row key={index} item={item}>
                                                        <Cell>{item.Material}</Cell>
                                                        <Cell>{item.Data}</Cell>
                                                        <Cell>{item.Qtd}</Cell>
                                                        <Cell>{item.M2}</Cell>
                                                        <Cell>{item.Bloco}</Cell>
                                                        <Cell>{item.Class}</Cell>
                                                        <Cell 
                                                            className='color-white'
                                                            style={{
                                                                backgroundColor: item.Status === 'Finalizado'? '#AC0909' : '#632B7F',
                                                            }}>{item.Status}</Cell>
                                                    </Row>
                                                ))}
                                            </Body>
                                        </>
                                    )}
                                </Table>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </React.Fragment >
    )
}

export default ProducaoChapas