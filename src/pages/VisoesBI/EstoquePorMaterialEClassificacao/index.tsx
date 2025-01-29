import Breadcrumb from 'Components/Common/Breadcrumb'
import StockColumn from 'pages/VisoesBI/Stock/_stockColumn'
import React from 'react'
import { Container } from 'reactstrap'
import { dados as nodes } from './_dados'
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

const Estoque = (props: Props) => {
    const [search, setSearch] = React.useState("");

    const handleSearch = (event) => {
        setSearch(event.target.value);
      };
    
      const data = {
        nodes: nodes.filter((item) =>
          item.Material.toLowerCase().includes(search.toLowerCase())
        ),
      };
    

    const theme = useTheme([
        getTheme(),
        {
            HeaderRow: `
            background-color: #FFA200 !important;
            color: white
          `,
            Row: `
            &:nth-of-type(odd) {
              background-color: #FFFFFF !important;
            }
    
            &:nth-of-type(even) {
              background-color: #E1E7F8 !important;
            }
            &:hover {
            background-color: red
            }
          `,
        },
    ]);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb title="Estoque por Material e Classificação" breadPath={[{ link: "#", name: "Estoque por Material e Classificação" }]} />
                    <div className='d-flex flex-wrap gap-3'>
                        <div>
                            <label htmlFor="search">
                                Busca pelo Material:&nbsp;
                                <input id="search" type="text" value={search} onChange={handleSearch} />
                            </label>
                            <br />
                            <div>
                                <Table className='' data={data} theme={theme}>
                                    {(tableList) => (
                                        <>
                                            <Header>
                                                <HeaderRow>
                                                    <HeaderCell>Material</HeaderCell>
                                                    <HeaderCell>A</HeaderCell>
                                                    <HeaderCell>AB.</HeaderCell>
                                                    <HeaderCell>B</HeaderCell>
                                                    <HeaderCell>B+</HeaderCell>
                                                    <HeaderCell>Out.</HeaderCell>
                                                    <HeaderCell>Total</HeaderCell>
                                                </HeaderRow>
                                            </Header>

                                            <Body>
                                                {tableList.map((item, index) => (
                                                    <Row key={index} item={item}>
                                                        <Cell>{item.Material}</Cell>
                                                        <Cell >{item['A']}</Cell>
                                                        <Cell>{item['AB']}</Cell>
                                                        <Cell>{item['B']}</Cell>
                                                        <Cell>{item['B+']}</Cell>
                                                        <Cell>{item['Out.']}</Cell>
                                                        <Cell style={{fontWeight: 'bold'}}>{item['Total']}</Cell>
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

export default Estoque