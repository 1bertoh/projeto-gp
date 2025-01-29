import { APIClient } from "helpers/api_helper"
import * as url from "helpers/url_helper"


const getTVs = async () => {
    const api = new APIClient()
    const res = await api.get(url.TV, '')
    return res
}
const getModulos = async () => {
    const api = new APIClient()
    const res = await api.get(url.MODULO, '')
    return res
}
const getVisoes = async () => {
    const api = new APIClient()
    const res = await api.get(url.VISOES, '')
    return res
}

type TVisions = {
    nome: string;
    is_ativo: boolean;
    duracao: number;
    modulo: number;
    
}

type TTV = {
    nome: string
}

const postTV = async (form: TTV) => {

    const api = new APIClient()
    const res = await api.create(url.TV, form)
    return res
}

type TModulo = {
    nome: string;
    tv: number;
}

const postModulo = async (form: TModulo) => {
    
    const api = new APIClient()
    const res = await api.create(url.MODULO, form)
    return res
}
type TVisao = {
    nome: string;
    modulo: number;
    duracao:number;
    is_activo: boolean
}

const postVisoes = async (form: TVisao[]) => {

    const api = new APIClient()
    const res = await api.create(url.VISOES, form)
    return res
}

const deleteTV = async (id: number) => {

    const api = new APIClient()
    const res = await api.delete(`${url.TV}/${id}`, '')
    return res
}

const deleModulo = async (id: number) => {

    const api = new APIClient()
    const res = await api.delete(`${url.MODULO}/${id}`, '')
    return res
}

export {getTVs, getModulos, getVisoes, postTV, postModulo, postVisoes, deleteTV, deleModulo}