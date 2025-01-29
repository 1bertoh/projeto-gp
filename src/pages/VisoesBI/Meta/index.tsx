import Breadcrumb from 'Components/Common/Breadcrumb';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import MetaGeral from './_MetaGeral';
import MetaPorVendedor from './_MetaPorVendedor';

type Props = {};

const Meta = (props: Props) => {
  return (
    <div>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumb title="Metas" breadPath={[{ link: "#", name: "Metas" }]} />
            <div className=''>
              <Row>
                <Col md={6}>
                  <MetaPorVendedor />
                </Col>
                <Col md={6}>
                  <MetaGeral />
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </React.Fragment >
    </div>
  );
};

export default Meta;
