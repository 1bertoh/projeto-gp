import { APIClient } from "helpers/api_helper"
import * as url from "helpers/url_helper"


const getEmpresas = async () => {
    const api = new APIClient()
    const res = await api.get(url.EMPRESAS, '')
    return res
}

const getUsuarioTipos = async () => {
    const api = new APIClient()
    const res = await api.get(url.USUARIOTIPOS, '')
    return res
}

type TPost = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    type: string;
    department: string;
    empresa: string;
}

const PostUsuario = async (form: TPost) => {
    const postForm = {
        nome: form.name,
        email: form.email,
        senha: form.password,
        telefone: form.phone,
        tipo: form.type,
        departamento: form.department,
        empresa: form.empresa
    }
    const api = new APIClient()
    const res = await api.create(url.USUARIO, postForm)
    return res
}

export {getEmpresas, getUsuarioTipos, PostUsuario}