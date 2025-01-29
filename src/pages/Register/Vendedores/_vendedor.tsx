import React, { useEffect, useRef, useState } from 'react'
import { Card, CardBody, CardTitle, Col, Form, FormFeedback, Input, Label, Row, Table } from 'reactstrap'
import { useFormik } from "formik";

import * as Yup from 'yup';
import { getUsuarios, getVendedorCategorias, getVendedores, getVendedorTipoMercado, postVendedor } from './_request';

type Props = {}

const Vendedor = (props: Props) => {
    const [usuarioSelecionado, setUsuarioSelecionado] = useState('')
    const [usuarios, setUsuarios] = useState<any[]>([])
    const [vendedorCategorias, setVendedorCategorias] = useState<any[]>([])
    const [vendedorTipoMercado, setVendedorTipoMercado] = useState<any[]>([])
    const [vendedores, setVendedores] = useState<any[]>([])
    const inputNomeRef = useRef<any>(null)

    const formik: any = useFormik({
        initialValues: {
            nome: "",
            data_inicio: "",
            categoria: 0,
            equipe: "",
            codigo_cliente: "",
            usuario: 0,
            tipo_mercado: "",
            ativo: true,
        },
        validationSchema: Yup.object({
            nome: Yup.string().required("This field is required"),
            data_inicio: Yup.string().required("This field is required"),
            categoria: Yup.number().required("This field is required"),
            equipe: Yup.string().required("This field is required"),
            codigo_cliente: Yup.string().required("This field is required"),
            usuario: Yup.number().required("This field is required"),
            tipo_mercado: Yup.string().required("This field is required"),
            ativo: Yup.boolean().required("This field is required"),
        }),

        onSubmit: async (values: any) => {
            try{
                const res: any = await postVendedor(values);
                setVendedores((previous) => {
                    const updateList = previous
                    updateList.push(res)
                    return res
                })
            } catch(e) {
                console.log(e)
            }
        },
    });

    useEffect(() => {
        const fetch = async () => {
            const res1 = await getUsuarios()
            setUsuarios(res1)
            const res2 = await getVendedorCategorias()
            setVendedorCategorias(res2)
            const res3 = await getVendedores()
            setVendedores(res3)
            const res4 = await getVendedorTipoMercado()
            setVendedorTipoMercado(res4)
        }
        fetch()
    }, [])

    return (
        <React.Fragment>
            <div className=''>
                <Form onSubmit={formik.handleSubmit}>
                    {/* Nome */}
                    <Row>
                        <Col md={4}>
                            <div className="mb-3">
                                <Label htmlFor="formrow-firstname-Input">Nome</Label>
                                <Input
                                    ref={inputNomeRef}
                                    type="text"
                                    name="nome"
                                    readOnly
                                    className="form-control"
                                    id="formrow-firstname-Input"
                                    placeholder="Nome do Vendedor"
                                    value={formik.values.nome}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    invalid={formik.touched.nome && formik.errors.nome ? true : false}
                                />
                                {formik.errors.nome && formik.touched.nome ? (
                                    <FormFeedback type="invalid">{formik.errors.nome}</FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="mb-3">
                                <Label htmlFor="formrow-usuario-Input">Usuário</Label>
                                <select
                                    className="form-control"
                                    name="usuario"
                                    value={formik.values.usuario}
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                        const idUsuario = e.target.value
                                        const usuario: any = usuarios.find((u: any) => u.id === Number(idUsuario))
                                        if (usuario) {
                                            setUsuarioSelecionado(usuario)
                                            formik.setFieldValue("nome", usuario.nome || ""); // Define o valor baseado no usuário selecionado
                                        }
                                    }
                                    }
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Selecione</option>
                                    {
                                        usuarios.map((u: any) => <option key={u.id} value={u.id}>{u.nome}</option>)
                                    }
                                </select>
                                {formik.errors.usuario && formik.touched.usuario ? (
                                    <FormFeedback type="invalid">{formik.errors.usuario}</FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="mb-3">
                                <Label htmlFor="formrow-email-Input">Data de início</Label>
                                <Input
                                    type="date"
                                    name="data_inicio"
                                    className="form-control"
                                    id="formrow-email-Input"
                                    value={formik.values.data_inicio}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    invalid={formik.touched.data_inicio && formik.errors.data_inicio ? true : false}
                                />
                                {formik.errors.data_inicio && formik.touched.data_inicio ? (
                                    <FormFeedback type="invalid">{formik.errors.data_inicio}</FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            {/* Empresa */}
                            <div className="mb-3">
                                <Label htmlFor="formrow-empresa-Input">Tipo de mercado</Label>
                                <select
                                    className="form-control"
                                    name="tipo_mercado"
                                    value={formik.values.tipo_mercado}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Selecione</option>
                                    {
                                        vendedorTipoMercado.map((tm: any) => <option value={tm.id}>{tm.nome}</option>)
                                    }
                                </select>
                                {formik.errors.tipo_mercado && formik.touched.tipo_mercado ? (
                                    <FormFeedback type="invalid">{formik.errors.tipo_mercado}</FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="mb-3">
                                <Label htmlFor="formrow-password-Input">Categoria</Label>
                                <select
                                    className="form-control"
                                    name="categoria"
                                    value={formik.values.categoria}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Selecione</option>
                                    {
                                        vendedorCategorias.map((cat: any) => <option key={cat.id} value={cat.id}>{cat.nome}</option>)
                                    }
                                </select>
                                {formik.errors.categoria && formik.touched.categoria ? (
                                    <FormFeedback type="invalid">{formik.errors.categoria}</FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="mb-3">
                                <Label htmlFor="formrow-InputCity">Equipe</Label>
                                <Input
                                    type="text"
                                    name="equipe"
                                    className="form-control"
                                    id="formrow-InputCity"
                                    placeholder="Digite a equipe"
                                    value={formik.values.equipe}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    invalid={formik.touched.equipe && formik.errors.equipe ? true : false}
                                />
                                {formik.errors.equipe && formik.touched.equipe ? (
                                    <FormFeedback type="invalid">{formik.errors.equipe}</FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                    </Row>

                    {/* Equipe, Código Cliente, Usuário */}
                    <Row>
                        <Col lg={4} >
                            <div className="mb-3">
                                <Label htmlFor="formrow-InputState">Código cliente</Label>
                                <Input
                                    type="text"
                                    name="codigo_cliente"
                                    className="form-control"
                                    id="formrow-InputCity"
                                    placeholder="Digite o código do cliente"
                                    value={formik.values.codigo_cliente}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    invalid={formik.touched.codigo_cliente && formik.errors.codigo_cliente ? true : false}
                                />
                                {formik.errors.codigo_cliente && formik.touched.codigo_cliente ? (
                                    <FormFeedback type="invalid">{formik.errors.codigo_cliente}</FormFeedback>
                                ) : null}
                            </div>
                        </Col>

                        <Col lg={4}>
                            <div className="mb-3">
                                <div className="form-check">
                                    <Input
                                        type="checkbox"
                                        className="form-check-Input"
                                        id="formrow-customCheck"
                                        name="ativo"
                                        checked={formik.values.ativo}
                                        onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                    // invalid={
                                    //     formik.touched.check && formik.errors.check ? true : false
                                    // }
                                    />
                                    <Label
                                        className="form-check-Label"
                                        htmlFor="formrow-customCheck"
                                    >
                                        Ativo
                                    </Label>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* Botão de Submit */}
                    <div>
                        <button type="submit" className="btn btn-primary">Salvar</button>
                    </div>
                </Form>
            </div>
            <div className='mt-5'>
                <SellersTable
                    vendedores={vendedores}
                    usuarios={usuarios}
                    mercados={vendedorTipoMercado}
                    categorias={vendedorCategorias}                
                />
            </div>
        </React.Fragment>
    )
}

type TSellersTable = {
    vendedores: any[];
    usuarios: any[];
    mercados: any[];
    categorias: any[];
}

const SellersTable = (props: TSellersTable) => {
    const {usuarios, vendedores, mercados, categorias} = props

    const getUser = (id: number) => usuarios.find((u: any) => id === Number(u.id)) || {nome: '---'}
    const getMercado = (id: number) => mercados.find((m: any) => id === Number(m.id)) || {nome: '---'}
    const getCat = (id: number) => categorias.find((c: any) => id === Number(c.id)) || {nome: '---'}

    return (
        <Table
            bordered
            hover
        >
            <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Nome
                    </th>
                    <th>
                        Data Início
                    </th>
                    <th>
                        Categoria
                    </th>
                    <th>
                        Equipe
                    </th>
                    <th>
                        Código Cliente
                    </th>
                    <th>
                        Usuário
                    </th>
                    <th>
                        Tipo Mercado
                    </th>
                    <th>
                        Ativo
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    vendedores.map((vendedor: any) => (
                        <tr>
                            <th scope="row">
                                {vendedor.id}
                            </th>
                            <td>
                                {vendedor.nome}
                            </td>
                            <td>
                                {vendedor.data_inicio}
                            </td>
                            <td>
                                {getCat(vendedor.categoria).nome}
                            </td>
                            <td>
                                {vendedor.equipe}
                            </td>
                            <td>
                                {vendedor.codigo_cliente}
                            </td>
                            <td>
                                {getUser(vendedor.usuario).nome}
                            </td>
                            <td>
                                {getMercado(vendedor.tipo_mercado).nome}
                            </td>
                            <td>
                                {vendedor.ativo ? 'Sim' : 'Não'}
                            </td>
                        </tr>

                    ))
                }
            </tbody>
        </Table>
    )
}

export default Vendedor