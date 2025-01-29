import React from 'react'
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap'
import SimpleTreeMap from 'rechart/CustomActiveShapePieChart'
import StackedBarChart from 'rechart/StackedBarChart'

type Props = {}

const RevenueView = (props: Props) => {
    return (
        <Row>
            {/* Coluna grande à esquerda */}
            <Col md="8" className='bar-chart-col'>
                <Card>
                    <CardBody>
                        <CardTitle className="">SimpleLine Chart</CardTitle>
                        <StackedBarChart />
                    </CardBody>
                </Card>
            </Col>

            {/* Duas colunas menores à direita */}
            <Col className='pizzas-flex' md="4">
                <Row>
                    <Col className='pizza-chart-1'>
                        <Card>
                            <CardBody>
                                <CardTitle className="">SimpleLine Chart</CardTitle>
                                <SimpleTreeMap />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className='pizza-chart-2'>
                        <Card>
                            <CardBody >
                                <CardTitle className="">SimpleLine Chart</CardTitle>
                                <SimpleTreeMap />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default RevenueView