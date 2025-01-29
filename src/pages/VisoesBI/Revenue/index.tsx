import React from 'react'
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap'
import SimpleTreeMap from 'rechart/CustomActiveShapePieChart'
import StackedBarChart from 'rechart/StackedBarChart'
import Breadcrumb from 'Components/Common/Breadcrumb'
import "./revenue.scss"
import RevenueView from './revenueView'

type Props = {}

const Revenue = (props: Props) => {
    return (
        <React.Fragment>
            <div className="page-content">
            <Breadcrumb title="Metas" breadPath={[{link: "#", name: "Metas"}]} />
                <RevenueView/>
            </div>
        </React.Fragment>
    )
}

export default Revenue