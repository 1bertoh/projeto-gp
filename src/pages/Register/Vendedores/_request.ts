import { APIClient } from "helpers/api_helper"
import * as url from "helpers/url_helper"


const getUsuarios = async () => {
    const api = new APIClient()
    const res = await api.get(url.USUARIO, '')
    return res
}

const getVendedorCategorias = async () => {
    const api = new APIClient()
    const res = await api.get(url.VENDEDORCATEGORIA, '')
    return res
}

const getVendedores = async () => {
    const api = new APIClient()
    const res = await api.get(url.VENDEDORES, '')
    return res
}

const getVendedorTipoMercado = async () => {
    const api = new APIClient()
    const res = await api.get(url.VENDEDORTIPOMERCADO, '')
    return res
}
type TMetas = {
    vendedor: number;
    ano: number;
}

const getMetas = async (props: TMetas) => {
    const {ano, vendedor} = props;

    const api = new APIClient()
    const res = await api.get(`${url.METAS}/${vendedor}/${ano}`, '')
    return res
}

type TPost = {
    nome: string;
    data_inicio: string;
    categoria: number;
    equipe: string;
    codigo_cliente: string;
    usuario: number;
    tipo_mercado: string;
    ativo: boolean;
}

const postVendedor = async (form: TPost) => {

    const api = new APIClient()
    const res = await api.create(url.VENDEDORES, form)
    return res
}

const postMetas = async (form: {}[]) => {

    const api = new APIClient()
    const res = await api.create(url.METAS, form)
    return res
}

const putMeta = async (form: {}, id: number) => {

    const api = new APIClient()
    const res = await api.put(`${url.METAS}/${id}`, form)
    return res
}

export {getUsuarios, getVendedorCategorias, getVendedores, getVendedorTipoMercado, getMetas, postVendedor, postMetas, putMeta}