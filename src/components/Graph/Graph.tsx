import React from "react";
import { colors } from "estilos-lojas-cem";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Brush, ResponsiveContainer, AreaChart, Area } from "recharts";
// import { UseDataAplication } from "../hooks/Aplication/UseDataAplication";
import { UseApp } from "../../hooks/AppProvider";
import { IOptions } from "../SelectComponent/SelectComponent";
import { Row } from "componentes-web-lojas-cem";
import { UseMonit } from "../../hooks/MonitProvider";

export interface IGraph {
  lengthBrush?: number;
}

interface IData {
  rua: string;
  name: string;
  total: number;
  ocor: number;
  exec: number;
  fim: number;
  pendente: number;
}

const testingFilter = ({ selectRua, value }: { selectRua: IOptions | undefined; value: IData }) => {
  if (selectRua) {
    // FILTRO 1 - EXECUTANDO
    if (selectRua.value == "1" && value.exec > 0) {
      return value;
    }
    // FILTRO 2 - OCORRÊNCIA
    if (selectRua.value == "2" && value.ocor > 0) {
      return value;
    }
    // FILTRO 3 - PENDENTES
    if (selectRua.value == "3" && ((value.pendente && value.pendente > 0) || (value.exec && value.exec >= 0))) {
      return value;
    }
    // FILTRO 4 - FINALIZADOS
    if (selectRua.value == "4" && value.total == value.fim) {
      return value;
    }
    return false;
  } else {
    return value;
  }
};

export const Graph = ({}: IGraph) => {
  const { dark } = UseApp();

  const [data, setData] = React.useState<IData[]>([]);
  const [maxData, setMaxData] = React.useState<number>(0);
  const [brushIndex, setBrushIndex] = React.useState<number>(0);
  const { servicosGrafico, selectGrupos, selectRua, changeListRua } = UseMonit();

  React.useEffect(() => {
    let newMaxData = 0;
    let newData: IData[] = [];

    servicosGrafico &&
      servicosGrafico.data &&
      servicosGrafico.data.forEach((a) => {
        a.ruas.map((value) => {
          if (selectGrupos.length > 0) {
            if (selectGrupos.some((gr: any) => value.rua.substring(0, 2) == gr.value) == true) {
              const filtered = testingFilter({ selectRua, value });
              filtered && newData.push(filtered);
            }
          } else {
            const filtered = testingFilter({ selectRua, value });
            filtered && newData.push(filtered);
          }

          if (Number(value.total) > newMaxData) {
            newMaxData = Number(value.total);
          }
        });
      });

    let newIndex = newData.length;
    let widthBar = 30;
    if (window.innerWidth / newData.length < widthBar) {
      while (window.innerWidth / newIndex < widthBar) {
        newIndex--;
      }
    } else {
      newIndex = 0;
    }

    setBrushIndex(newIndex);
    setData(newData);
    setMaxData(newMaxData + 3);
  }, [servicosGrafico?.data, selectGrupos, selectRua]);

  return (
    <Row width="95%" height="300px" bg="00" id="barchart" className={"rounded-lg shadow-lg"}>
      <ResponsiveContainer width="100%" height="100%" minWidth={"200px"}>
        <BarChart
          style={{ opacity: servicosGrafico?.isFetching ? 0.4 : 1 }}
          data={data}
          margin={{
            top: 0,
            right: 20,
            left: -15,
            bottom: 20,
          }}
          barGap={0}
          barSize={8}
          onClick={(e) => {
            if (e && e.activeLabel) {
              changeListRua(e.activeLabel?.replaceAll("Rua ", "").replaceAll(".", ""));
            }
          }}
        >
          <XAxis
            dataKey={"name"}
            height={70}
            tick={{ fill: dark ? "#fff" : "#323232" }}
            fontSize={"0.8em"}
            dy={25}
            stroke={dark ? "#fff" : "#323232"}
            dx={-15}
            angle={-45}
            interval={0}
          />
          <YAxis
            domain={[0, maxData]}
            fontSize={12}
            type="number"
            stroke={dark ? "#fff" : "#323232"}
            tick={{ fill: dark ? "#fff" : "#323232" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: dark ? "#aaa" : "#fff",
            }}
            labelStyle={{
              color: dark ? "#fff" : "#323232",
              fontWeight: "600",
            }}
            itemStyle={{
              fontWeight: "100",
              fontSize: "0.9em",
              cursor: "pointer",
            }}
            cursor={{
              fill: dark ? "#bbb" : `${colors.primary.s100}20`,
            }}
          />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
          {brushIndex > 0 && (
            <Brush startIndex={0} endIndex={brushIndex} dataKey={"rua"} height={20} stroke={colors.primary.s080}>
              <AreaChart>
                <Area
                  type="natural"
                  stroke="#ff000010"
                  dataKey="pendente"
                  name="Contado"
                  fillOpacity={1}
                  fill={`${colors.error.s100}`}
                />
                <Area type="natural" stroke="#00ff0010" dataKey="fim" name="Contado" fill={`${colors.success.s100}`} />
                <Area type="natural" stroke="#ffff2220" dataKey="exec" name="Contado" fill={`${colors.attention.s100}`} />

                <Area
                  type="natural"
                  stroke={colors.primary.s100}
                  dataKey="total"
                  name="Total"
                  fill={`${colors.primary.s080}30`}
                />
              </AreaChart>
            </Brush>
          )}

          <Bar
            cursor={"pointer"}
            stackId="a"
            background={{
              fill: dark ? "#ffffff10" : "#32323218",
              cursor: "pointer",
            }}
            legendType={"none"}
            dataKey="exec"
            name="Executando"
            fill={"#E7D64D"}
          />

          <Bar
            cursor={"pointer"}
            stackId="a"
            background={{
              fill: dark ? "#ffffff10" : "#32323218",
              cursor: "pointer",
            }}
            dataKey="pendente"
            name="Pendente"
            fill={colors.error.s080}
          />

          <Bar
            cursor={"pointer"}
            background={{
              fill: dark ? "#ffffff20" : "#32323230",
              cursor: "pointer",
            }}
            dataKey="fim"
            name="Finalizado"
            fill={colors.success.s100}
          />

          <Bar
            cursor={"pointer"}
            background={{
              fill: dark ? "#ffffff20" : "#32323230",
              cursor: "pointer",
            }}
            dataKey="total"
            name="Total"
            fill={colors.primary.s100}
          />
        </BarChart>
      </ResponsiveContainer>
    </Row>
  );
};
