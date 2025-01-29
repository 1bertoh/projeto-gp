import Breadcrumb from 'Components/Common/Breadcrumb';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import VolumePorMaterial from './_VolumePorMaterial';
import VolumeVendasByClassificacao from './_VolumedeVendasporClassificacao';

type Props = {};

const VendasPorVendedor = (props: Props) => {
  return (
    <div>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumb title="Vendas por Vendedor" breadPath={[{ link: "#", name: "Vendas por Vendedor" }]} />
            <div>
              <Row>
                <Col md={7} >
                  <VolumePorMaterial />
                </Col>
                <Col md={5} >
                  <VolumeVendasByClassificacao />
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </React.Fragment >
    </div>
  );
};

export default VendasPorVendedor;
