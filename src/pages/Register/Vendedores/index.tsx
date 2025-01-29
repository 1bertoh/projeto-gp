import React, { useState } from 'react'
import { Card, CardBody, CardText, CardTitle, Col, Form, FormFeedback, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap'
import { useFormik } from "formik";
import classnames from "classnames";

import * as Yup from 'yup';
import Vendedor from './_vendedor';
import Goal from './_goal';

type Props = {}

const RegisterSeller = (props: Props) => {
  const [activeTab, setactiveTab] = useState("1");

  const formik: any = useFormik({
    initialValues: {
      firstname: "",
      email: "",
      password: "",
      city: "",
      state: "",
      zip: "",
      check: ""
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("This field is required"),
      email: Yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Your Email"),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(RegExp('(.*[a-z].*)'), 'At least lowercase letter')
        .matches(RegExp('(.*[A-Z].*)'), 'At least uppercase letter')
        .matches(RegExp('(.*[0-9].*)'), 'At least one number')
        .required("This field is required"),
      city: Yup.string().required("This field is required"),
      state: Yup.string().required("This field is required"),
      zip: Yup.string().required("This field is required"),
      check: Yup.string().required("This field is required"),
    }),

    onSubmit: (values: any) => {
      // console.log("value", values.password);
    },
  });

  const toggle1 = (tab: any) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  return (
    <React.Fragment>
      <div className='page-content'>
        <Card>
          <CardBody>
            <CardTitle className="h4 mb-4">Cadastro Faturamento</CardTitle>

            <Nav pills className="navtab-bg nav-justified">
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: activeTab === "1",
                  })}
                  onClick={() => {
                    toggle1("1");
                  }}
                >
                  <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                  <span className="d-none d-sm-block">Vendedor</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: activeTab === "2",
                  })}
                  onClick={() => {
                    toggle1("2");
                  }}
                >
                  <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                  <span className="d-none d-sm-block">Meta do Vendedor</span>
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab} className="p-3 text-muted">
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <Vendedor />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <Goal />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default RegisterSeller