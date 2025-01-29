import Breadcrumb from 'Components/Common/Breadcrumb'
import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import dados, { TDados } from './dados'
import StockColumn from './_stockColumn'
import { APIClient } from '../../../helpers/api_helper'
import StockView from './stockView'
import VerticalComposedChart from 'rechart/VerticalComposedChart'
// import {axios as axiosFetch} from 'axios'

type Props = {}

const Stock = (props: Props) => {

  // useEffect(() => {
  //   const api = new APIClient();
  //   console.log('resposta1')
  //   const fetch = async () => {
  //     console.log('resposta2')
  //     const res: { dados: TDados[] } = await api.get('http://127.0.0.1:8000/consulta3', '')

  //     setResponse(() => processData(res.dados))
  //   }

  //   fetch()
  // }, [])

  const v = [
    {
        name: "A",
        value: 2558,
        color: '#12239E'
      },
      {
        name: "AB",
        value: 890,
        color: '#A4673D'
      },
      {
        name: "B+",
        value: 668,
        color: '#E8860F'
      },
      {
        name: "B",
        value: 328,
        color: '#F18B09'
      },
      {
        name: "S/C",
        value: 100,
        color: '#F18B09'
      },
      {
        name: "HIGH QUALITY",
        value: 40,
        color: '#F18B09'
      },
      {
        name: "C",
        value: 30,
        color: '#F18B09'
      },
      {
        name: "AB S",
        value: 5,
        color: '#F18B09'
    },
]

 

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Estoque de chapas" breadPath={[{link: "#", name: "Stoque de chapas"}]} />
          <StockView/>
          <div style={{maxWidth: '300px', margin: "auto"}}>
            <VerticalComposedChart value={v} />
          </div>
        </Container>
      </div>
    </React.Fragment >
  )
}

export default Stock