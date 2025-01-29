import Breadcrumb from 'Components/Common/Breadcrumb';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import VolumePorMaterial from './_VolumePorClassificacao';
import VolumeVendasByClassificacao from './_VolumeporMaterialeClassificacao';
import VolumePorClassificacao from './_VolumePorClassificacao';

type Props = {};

const VendasPorClassificacao = (props: Props) => {
  return (
    <div>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumb title="Relatório de Vendas por Classificação" breadPath={[{ link: "#", name: "Relatório de Vendas por Classificação" }]} />
            <div>
              <Row>
                <Col md={6} >
                  <VolumeVendasByClassificacao />
                </Col>
                <Col md={6} >
                  <VolumePorClassificacao/>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </React.Fragment >
    </div>
  );
};

export default VendasPorClassificacao;
