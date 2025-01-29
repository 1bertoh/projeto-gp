import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Col, Form, FormFeedback, Input, Label, Row, Table } from 'reactstrap'
import { useFormik } from "formik";

import * as Yup from 'yup';
import { getMetas, getVendedores, postMetas, putMeta } from './_request';
import { newData } from './_data';

type Props = {}

const Goal = (props: Props) => {
    const [data, setData] = useState<any[]>([]);
    const [changedCells, setChangedCells] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(false); //if this data is from  db
    const [focuseFieldValue, setFocuseFieldValue] = useState<null|number>(null); 

    const [selectedAno, setSelectedAno] = useState<number | null>(null);
    const [selectedVendedor, setSelectedVendedor] = useState<number | null>(null);

    const [editingCell, setEditingCell] = useState({ row: null, column: null });
    const [vendedores, setVendedores] = useState<any[]>([])
    const [anos, setAnos] = useState<number[]>([])


    const handleEdit = (rowIndex, column, id) => {
        setEditingCell({ row: rowIndex, column });
    };

    const handleChange = (event, rowIndex, column, id) => {
        const previousValue = data[rowIndex][column].value;

        const newData = [...data];
        newData[rowIndex][column].value = event.target.value;
        setData(newData);
    };

    const handleBlur = (event, rowIndex, column, id) => {
        setEditingCell({ row: null, column: null });
        if(Number(data[rowIndex][column].value) !== Number(focuseFieldValue)) {
            const d = {
                vendedor: selectedVendedor, // ID do vendedor
                ano: selectedAno,            // Ano
                tipo_meta: newData[rowIndex].name.value, // Tipo da meta (e.g., "Meta Mínima (R$)")
                mes: column.charAt(0).toUpperCase() + column.slice(1), // Capitaliza o mês
                valor: event.target.value,    // Valor correspondente ao mês
                // id: newData[rowIndex][column].id, 
            }
            const res = putMeta(d, id)
            setFocuseFieldValue(null)
        }
    };

    function gerarAnos(anoInicial: number, anoFinal: number) {
        if (anoInicial > anoFinal) {
            throw new Error("O ano inicial deve ser menor ou igual ao ano final.");
        }

        const anos: number[] = [];
        for (let ano = anoInicial; ano <= anoFinal; ano++) {
            anos.push(ano);
        }
        setAnos(anos.reverse());
    }

    useEffect(() => {
        const d = new Date()

        gerarAnos(2023, d.getFullYear())
        const fetch = async () => {
            const res1 = await getVendedores()
            setVendedores(res1)
        }
        fetch()
    }, [])

    const handleGetMetas = async () => {
        setIsLoading(true)
        if (selectedAno !== null && selectedVendedor !== null) {
            try {
                const res2 = await getMetas({ ano: selectedAno, vendedor: selectedVendedor })
                const structured = convertDataToUser(res2)
                setData(structured)
                setIsFirstTime(false)
            } catch (e) {
                setData(newData)
                setIsFirstTime(true)
            }
        }
        setIsLoading(false)
    }

    const reestruturarDadosParaBanco = async (dados, vendedorId, ano) => {
        const meses = [
            "janeiro", "fevereiro", "março", "abril",
            "maio", "junho", "julho", "agosto",
            "setembro", "outubro", "novembro", "dezembro"
        ];

        const registros: any[] = [];

        if (isFirstTime) {
            dados.forEach((item) => {
                meses.forEach((mes) => {
                    registros.push({
                        vendedor: vendedorId, // ID do vendedor
                        ano: ano,            // Ano
                        tipo_meta: item.name.value, // Tipo da meta (e.g., "Meta Mínima (R$)")
                        mes: mes.charAt(0).toUpperCase() + mes.slice(1), // Capitaliza o mês
                        valor: item[mes].value,    // Valor correspondente ao mês
                    });
                });
            });
        } else {
            dados.forEach((item) => {
                meses.forEach((mes) => {
                    registros.push({
                        vendedor: vendedorId, // ID do vendedor
                        ano: ano,            // Ano
                        tipo_meta: item.name.value, // Tipo da meta (e.g., "Meta Mínima (R$)")
                        mes: mes.charAt(0).toUpperCase() + mes.slice(1), // Capitaliza o mês
                        valor: item[mes].value,    // Valor correspondente ao mês
                        id: item[mes].id,    // Valor correspondente ao mês
                    });
                });
            });
        }

        // const res = await postMetas(registros);
        console.log(registros)
    }

    function convertDataToUser(registros) {
        const dadosAgrupados: any[] = [];

        // Cria um mapa para agrupar os dados por tipo_meta
        const agrupadosPorTipoMeta: any[] = registros.reduce((acc, registro) => {
            const tipoMeta = registro.tipo_meta;

            if (!acc[tipoMeta]) {
                acc[tipoMeta] = {};
            }

            acc[tipoMeta][registro.mes.toLowerCase()] = { value: registro.valor, id: registro.id };
            return acc;
        }, {});

        // Converte o mapa em um array no formato esperado
        for (const [tipoMeta, valoresMeses] of Object.entries(agrupadosPorTipoMeta)) {
            dadosAgrupados.push({
                name: { value: tipoMeta, id: 0 },
                ...valoresMeses,
            });
        }

        return dadosAgrupados;
    }


    return (
        <React.Fragment>
            <div className=''>
                <Form>
                    <Row>
                        <Col md={1}>
                            <div className="mb-3">
                                <Label htmlFor="formrow-ano-Input">Ano</Label>
                                <select
                                    className="form-control"
                                    name='ano'
                                    id='formrow-ano-Input'
                                    // value={formik.values.password}
                                    onChange={(e) => setSelectedAno(Number(e.target.value))}
                                // onBlur={formik.handleBlur}
                                >
                                    <option>Select</option>
                                    {
                                        anos.map((ano) => <option key={ano} value={ano}>{ano}</option>)
                                    }
                                </select>
                                {/* {
                                    formik.errors.category && formik.touched.category ? (
                                        <FormFeedback type="invalid">{formik.errors.category}</FormFeedback>
                                    ) : null
                                } */}
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="mb-3">
                                <Label htmlFor="formrow-vendedor-Input">Vendedor</Label>
                                <select
                                    className="form-control"
                                    name='vendedor'
                                    id='formrow-venddor-Input'
                                    // value={formik.values.password}
                                    // onChange={formik.handleChange}
                                    onChange={(e) => setSelectedVendedor(Number(e.target.value))}
                                // onBlur={formik.handleBlur}
                                >
                                    <option>Select</option>
                                    {
                                        vendedores.map((v) => <option key={v.id} value={v.id}>{v.nome}</option>)
                                    }
                                </select>
                                {/* {
                                    formik.errors.category && formik.touched.category ? (
                                        <FormFeedback type="invalid">{formik.errors.category}</FormFeedback>
                                    ) : null
                                } */}
                            </div>
                        </Col>
                        <Col md={1}>
                            <div className="d-flex align-items-center" style={{ height: '100%' }}>
                                <button
                                    onClick={handleGetMetas}
                                    disabled={selectedAno === null || selectedVendedor === null}
                                    type="button"
                                    className="btn btn-primary">
                                    Buscar
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>

            <div className='mt-5'>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Janeiro</th>
                            <th>Fevereiro</th>
                            <th>Março</th>
                            <th>Abril</th>
                            <th>Maio</th>
                            <th>Junho</th>
                            <th>Julho</th>
                            <th>Agosto</th>
                            <th>Setembro</th>
                            <th>Outubro</th>
                            <th>Novembro</th>
                            <th>Dezembro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !isLoading ?
                                data.map((row: any, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td style={{ fontWeight: "bold" }}>{row.name.value}</td>
                                        {Object.keys(row)
                                            .filter((key) => key !== "name")
                                            .map((month, colIndex) => (
                                                <td
                                                    key={row[month].index}
                                                    onClick={() => handleEdit(rowIndex, month, row[month].id)}
                                                    style={{ cursor: "pointer", height: 50, position: "relative" }}
                                                >
                                                    {editingCell.row === rowIndex && editingCell.column === month ? (
                                                        <input
                                                            style={{ position: "absolute", zIndex: 50, width: 100 }}
                                                            type="number"
                                                            value={row[month].value}
                                                            onChange={(event) => handleChange(event, rowIndex, month, row[month].id)}
                                                            onBlur={(event) => handleBlur(event, rowIndex, month, row[month].id)}
                                                            onFocus={(e) => setFocuseFieldValue(Number(e.target.value))}
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        row[month].value
                                                    )}
                                                </td>
                                            )
                                            )}
                                    </tr>
                                )) : 'Carregando...'
                        }
                    </tbody>
                </Table>
                <div>{
                    data.length ?
                        <button type="submit" onClick={() => reestruturarDadosParaBanco(data, selectedVendedor, selectedAno)} className="btn btn-primary w-md">
                            {isFirstTime ? 'Criar' : 'Atualizar'}
                        </button> : null
                }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Goal