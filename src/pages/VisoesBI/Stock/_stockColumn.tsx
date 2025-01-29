import React, { useState } from 'react';
import { TDados } from './dados';
import { Card, CardBody, CardHeader } from 'reactstrap';

type Props = {
  dados: TDados;
};

type TCardEl = {
  title: string;
  value: string | number;
  type: TDados['type']
  columnName?: string;
  isHovered: boolean; // Define se a coluna está hovered
  onHover: (isHovered: boolean) => void; // Função para gerenciar hover da coluna
};

const CardEl = (props: TCardEl) => {
  const { title, value, columnName, type, isHovered, onHover } = props;

  const getColor = (type: TDados['type']) => {
    if(type === 'sumStart') {
      return {
        headBg: '#001089',
        bodyBg: '#B2B6E0'
      }
    } else if (type === 'normal') {
      return {
        headBg: '#FFAA00',
        bodyBg: '#FFE5B2'
      }
    } else {
      return {
        headBg: '#333333',
        bodyBg: '#C1C1C1'
      }
      
    }
  }

  return (
    <Card
      className={` stock-card mini-stats-wid ${isHovered ? 'hover-effect' : 'shadow-sm'}`} // Aplica borda na coluna inteira
      style={{ height: 150, minWidth:140, maxWidth:170 }}
      onMouseEnter={() => onHover(true)} // Ativa hover da coluna
      onMouseLeave={() => onHover(false)} // Desativa hover da coluna
    >
      {
        columnName &&
        <CardHeader title={columnName} className="py-1 color-white" style={{backgroundColor: getColor(type).headBg}}>
          <span className="fw-bold color-white"> {columnName} </span>
        </CardHeader>
      }
      <CardBody style={{backgroundColor: getColor(type).bodyBg}}>
        <div className="flex h-100 align-content-center">
          <div className="text-center">
            <h4 className={`mb-0 mb-2 ${
                isNaN(Number(String(value)?.split(' ')[0])) ? 
                'fs-5 fs-lg-6 ' :
                'fs-3 fs-md-4'
            }`}>{
              !isNaN(Number(String(value)?.split(' ')[0])) ?
              Number(value).toLocaleString('pt-br'):
              value
              }</h4>
            <span className="text-muted fw-medium">{title}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const StockColumn = (props: Props) => {
  const {
    dados: { columnName, items, type },
  } = props;

  // Estado para controlar o hover de toda a coluna
  const [isColumnHovered, setIsColumnHovered] = useState(false);

  return (
    <div className="column-container">
      {items.map((item, index) => (
        <CardEl
          key={index}
          title={item.name}
          value={item.value}
          type={type}
          columnName={index === 0 ? columnName : undefined}
          isHovered={isColumnHovered} // Aplica hover a todos os cards da coluna
          onHover={setIsColumnHovered} // Controla o estado de hover da coluna
        />
      ))}
    </div>
  );
};

export default StockColumn;
