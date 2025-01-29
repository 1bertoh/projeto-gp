import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';
import { getEmpresas, getUsuarioTipos, PostUsuario } from './_request';

type Props = {};

const Admin = (props: Props) => {
  const [empresas, setEmpresas] = useState([]);
  const [usuariosTipos, setUsuariosTipos] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getEmpresas();
      setEmpresas(res);
      const res2 = await getUsuarioTipos();
      setUsuariosTipos(res2);
      console.log(res);
    };
    fetch();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      type: '',
      department: '',
      empresa: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nome é obrigatório'),
      email: Yup.string()
        .email('Insira um e-mail válido')
        .required('E-mail é obrigatório'),
      password: Yup.string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
        .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
        .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
        .required('Senha é obrigatória'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'As senhas não conferem')
        .required('Confirmação de senha é obrigatória'),
      phone: Yup.string().required('Telefone é obrigatório'),
      type: Yup.string().required('Tipo é obrigatório'),
      department: Yup.string().required('Departamento é obrigatório'),
      empresa: Yup.string().required('Empresa é obrigatória'),
    }),
    onSubmit: (values) => {
      PostUsuario(values);
    },
  });

  return (
    <div className="page-content">
      <Card>
        <CardBody>
          <CardTitle className="h4 mb-4">Cadastro do Usuário</CardTitle>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              {/* Nome */}
              <Col lg={3}>
                <div className="mb-3">
                  <Label htmlFor="name">Nome do Usuário</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                    placeholder="Fulano"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <FormFeedback>{formik.errors.name}</FormFeedback>
                  )}
                </div>
              </Col>

              {/* E-mail */}
              <Col lg={3}>
                <div className="mb-3">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    placeholder="exemplo@exemplo.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <FormFeedback>{formik.errors.email}</FormFeedback>
                  )}
                </div>
              </Col>

              {/* Senha */}
              <Col lg={3}>
                <div className="mb-3">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    placeholder="Senha"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <FormFeedback>{formik.errors.password}</FormFeedback>
                  )}
                </div>
              </Col>

              {/* Confirmar Senha */}
              <Col lg={3}>
                <div className="mb-3">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="Confirme a senha"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <FormFeedback>{formik.errors.confirmPassword}</FormFeedback>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              {/* Telefone */}
              <Col lg={3}>
                <div className="mb-3">
                  <Label htmlFor="phone">Telefone</Label>
                  <InputMask
                    mask="(99) 99999-9999"
                    id="phone"
                    name="phone"
                    className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <FormFeedback>{formik.errors.phone}</FormFeedback>
                  )}
                </div>
              </Col>

              {/* Tipo */}
              <Col lg={3}>
                <div className="mb-3">
                  <Label htmlFor="type">Tipo</Label>
                  <Input
                    type="select"
                    id="type"
                    name="type"
                    className={`form-control ${formik.touched.type && formik.errors.type ? 'is-invalid' : ''}`}
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Selecione</option>
                    {
                      usuariosTipos.map((i: any) => <option value={i.id}>{i.nome}</option>)
                    } 
                  </Input>
                  {formik.touched.type && formik.errors.type && (
                    <FormFeedback>{formik.errors.type}</FormFeedback>
                  )}
                </div>
              </Col>

              {/* Departamento */}
              <Col lg={3}>
                <div className="mb-3">
                  <Label htmlFor="department">Departamento</Label>
                  <Input
                    type="select"
                    id="department"
                    name="department"
                    className={`form-control ${formik.touched.department && formik.errors.department ? 'is-invalid' : ''}`}
                    value={formik.values.department}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Selecione</option>
                    <option value="D1">Departamento 1</option>
                    <option value="D2">Departamento 2</option>
                  </Input>
                  {formik.touched.department && formik.errors.department && (
                    <FormFeedback>{formik.errors.department}</FormFeedback>
                  )}
                </div>
              </Col>
              {/* Empresa */}
              <Col lg={3}>
              <div className="mb-3">
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input
                    type="select"
                    id="empresa"
                    name="empresa"
                    className={`form-control ${formik.touched.empresa && formik.errors.empresa ? 'is-invalid' : ''}`}
                    value={formik.values.empresa}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Selecione</option>
                    {empresas.map((empresa: any) => (
                      <option key={empresa.id} value={empresa.id}>
                        {empresa.nome}
                      </option>
                    ))}
                  </Input>
                  {formik.touched.empresa && formik.errors.empresa && (
                    <FormFeedback>{formik.errors.empresa}</FormFeedback>
                  )}
                </div>
              </Col>
            </Row>

            {/* Botão de Submit */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Cadastrar
              </button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Admin;
