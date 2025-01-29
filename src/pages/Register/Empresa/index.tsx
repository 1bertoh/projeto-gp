import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import { getDBs, postEmpresa } from "./_request";

const CadEmpresa = () => {
  const [dbs, setDbs] = useState([]);

  const formik = useFormik({
    initialValues: {
      nome: "",
      cnpj: "",
      banco_de_dados: 0,
    },
    validationSchema: Yup.object({
      nome: Yup.string().required("O nome é obrigatório"),
      cnpj: Yup.string()
        .matches(
          /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
          "CNPJ inválido"
        )
        .required("O CNPJ é obrigatório"),
      banco_de_dados: Yup.number().required("Selecione um banco de dados"),
    }),
    onSubmit: (values) => {
      postEmpresa(values);
    },
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await getDBs();
      setDbs(res);
    };
    fetch();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Card>
          <CardBody>
            <CardTitle className="h4 mb-4">Cadastro da Empresa</CardTitle>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col md={6} style={{ margin: "auto" }}>
                  <Row>
                    <Col md={12}>
                      <div className="mb-3">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          type="text"
                          name="nome"
                          id="name"
                          className={`form-control ${
                            formik.touched.nome && formik.errors.nome
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.nome}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.nome && formik.errors.nome && (
                          <FormFeedback>{formik.errors.nome}</FormFeedback>
                        )}
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="mb-3">
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <InputMask
                          mask="99.999.999/0001-99"
                          name="cnpj"
                          id="cnpj"
                          className={`form-control ${
                            formik.touched.cnpj && formik.errors.cnpj
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.cnpj}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.cnpj && formik.errors.cnpj && (
                          <FormFeedback>{formik.errors.cnpj}</FormFeedback>
                        )}
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="mb-3">
                        <Label htmlFor="db">Banco de Dados</Label>
                        <select
                          id="db"
                          name="banco_de_dados"
                          className={`form-control ${
                            formik.touched.banco_de_dados && formik.errors.banco_de_dados
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.banco_de_dados}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Selecione</option>
                          {dbs.map((db: any) => (
                            <option key={db.id} value={db.id}>
                              {db.nome}
                            </option>
                          ))}
                        </select>
                        {formik.touched.banco_de_dados && formik.errors.banco_de_dados && (
                          <FormFeedback>{formik.errors.banco_de_dados}</FormFeedback>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Col md={6} style={{ margin: "auto" }}>
                <div>
                  <button type="submit" className="btn btn-primary w-md">
                    Submit
                  </button>
                </div>
              </Col>
            </Form>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default CadEmpresa;
