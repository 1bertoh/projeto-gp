import { APIClient } from "helpers/api_helper"
import * as url from "helpers/url_helper"


const getDBs = async () => {
    const api = new APIClient()
    const res = await api.get(url.DBS, '')
    return res
}
type TPost = {
    nome: string;
    cnpj: string;
    banco_de_dados: number
}
const postEmpresa = async (form:TPost) => {
    const api = new APIClient()
    const res = await api.create(url.EMPRESAS, form)
    return res
}

export {getDBs, postEmpresa}