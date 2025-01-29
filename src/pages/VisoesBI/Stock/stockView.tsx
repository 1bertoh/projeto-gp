import React, { useState } from 'react'
import dados, { TDados } from './dados'
import StockColumn from './_stockColumn'

type Props = {}

const StockView = (props: Props) => {
  const [response, setResponse] = useState<TDados[] | null>(dados)

  const processData = (data: TDados[]) => {
    // Inicializar o objeto "Outros"
    const outros: TDados = {
      columnName: "Outras",
      type: "normal",
      items: [
        { name: "chapas", value: 0 },
        { name: "m2", value: 0 },
      ],
    };

    const novosDados: TDados[] = [];

    data.forEach((coluna) => {
      if (["C", "SC"].includes(coluna.columnName)) {
        // Somar chapas e m2 em "Outros"
        const sum1 = Number(outros.items[0].value) + Number(coluna.items[0].value) // Somar chapas
        outros.items[0].value = sum1;
        const sum2 = Number(outros.items[1].value) + parseFloat(String(coluna.items[1].value).split(" ")[0])
        outros.items[1].value = sum2; // Somar m2

        // Adicionar materiais
        outros.items.push(...coluna.items.slice(2));
      } else {
        // Ordenar itens por quantidade de chapas e limitar a 3
        const ordenados = coluna.items
          .slice(2) // Excluir os dois primeiros itens
          .sort((a, b) => {
            const numA = parseInt(a.name.split(" ")[0]) || 0;
            const numB = parseInt(b.name.split(" ")[0]) || 0;
            return numB - numA; // Ordenar de forma decrescente
          })
          .slice(0, 3); // Limitar aos três maiores

        coluna.items = [
          coluna.items[0], // chapas
          coluna.items[1], // m2
          ...ordenados,
        ];

        novosDados.push(coluna);
        console.log(novosDados, "ca boca na butcha")
      }
    });

    // Finalizar o processamento da coluna "Outros"
    if (Number(outros.items[1].value) >= 1000) {
      outros.items[1].value = `${(Number(outros.items[1].value) / 1000).toFixed(2)} Mil`;
    } else {
      outros.items[1].value = `${Number(outros.items[1].value).toFixed(2)}`;
    }

    outros.items = [
      outros.items[0],
      outros.items[1],
      ...outros.items
        .slice(2)
        .sort((a, b) => {
          const numA = parseInt(a.name.split(" ")[0]) || 0;
          const numB = parseInt(b.name.split(" ")[0]) || 0;
          return numB - numA;
        })
        .slice(0, 3),
    ];

    novosDados.push(outros);

    const p = ajustarColunasParaTresObjetos(novosDados)
    console.log(p, 'resultrado do processamento');
    return p
  }

  const ajustarColunasParaTresObjetos = (dados: TDados[]) => {
    return dados.map((coluna) => {
      // Ignora a coluna "totalPolidas"
      if (coluna.columnName === "totalPolidas") {
        return coluna;
      }

      // Calcula a quantidade de objetos além dos dois primeiros
      const items = coluna.items;
      const objetosExtras = items.slice(2); // Ignora os dois primeiros objetos

      // Adiciona objetos "VAZIO" se necessário
      while (objetosExtras.length < 3) {
        objetosExtras.push({
          name: "0 chapas",
          value: "VAZIO"
        });
      }

      // Atualiza a lista completa de itens
      return {
        ...coluna,
        items: [...items.slice(0, 2), ...objetosExtras]
      };
    });
  }

  return (
    <>
        {
            response ?
              (
                <div className='d-flex justify-content-center flex-wrap gap-3'>
                  {
                    response.map((d, index) => (
                      <div key={index} className={`${d.type === 'sumStart' ? 'd-lg-block d-none' : ""} ${d.type === 'sumEnd' ? 'ml-1' : ''} `}
                        style={{marginRight: d.type === 'sumStart' ? '1rem' : '',  marginLeft: d.type === 'sumEnd' ? '1rem' : ''}}
                      >
                        <StockColumn dados={d} />
                      </div>
                    ))
                  }
                </div>
              ) :
              (
                <div>
                  <p>
                    Loading...
                  </p>
                </div>
              )
          }
    </>
  )
}

export default StockView