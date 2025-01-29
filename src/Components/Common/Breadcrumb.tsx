import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, BreadcrumbItem } from "reactstrap";

type TBreadcrumb = {
  title: string;
  breadPath: {
    link: string;
    name: string;
  }[]
}

const Breadcrumb = (props: TBreadcrumb) => {
  const { breadPath, title } = props
  return (
    <Row>
      <Col className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-sm-0 font-size-18">{title}</h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              {
                breadPath.map((item) => (
                  <BreadcrumbItem>
                    <Link to={item.link}>{item.name}</Link>
                  </BreadcrumbItem>
                ))
              }
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Breadcrumb;
