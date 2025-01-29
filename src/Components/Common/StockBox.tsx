import React from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'

type Props = {}

const StockBox = (props: Props) => {
  return (
    <React.Fragment>
        <div className="stock-card">
            <Card>
                <CardHeader>Titulo</CardHeader>
                <CardBody>
                    Lorem ipsum dolor sit amet 
                </CardBody>
            </Card>
        </div>
    </React.Fragment>
  )
}

export default StockBox