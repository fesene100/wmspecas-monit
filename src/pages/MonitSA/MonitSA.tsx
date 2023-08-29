import { Button, Column, Row, Text } from "componentes-web-lojas-cem";
import { Card } from "../../components/Card/Card";
import { MdSearch } from "react-icons/md";
import { Header } from "../Header/Header";
import { Area, AreaChart, Bar, BarChart, Brush, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { UseApp } from "../../hooks/AppProvider";
import { colors } from "estilos-lojas-cem";
import { UseMonitSa } from "../../hooks/MonitSaProvider";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { AgGridReact } from "ag-grid-react";
import { useRef, useState } from "react";
import { EmptyDataIcon } from "../../components/svg/EmptyDataIcon/EmptyDataIcon";
import { ColDef } from "ag-grid-community";
import React from "react";
import moment from "moment";
import { serviceProduto } from "../../repository/contagem";
import Swal from "sweetalert2";
import { Toast } from "../../components/Toast/Toast";
import DatePicker from "react-datepicker";

export const MonitSA = (): JSX.Element => {
  const {
    countExec,
    countFim,
    countLib,
    countOcor,
    dataRequested,
    dataGraph,
    changeDate,
    date,
    brushIndex,
    changeService,
    service,
    highlightedDates,
    dataList,
  } = UseMonitSa();
  const navigate = useNavigate();
  const gridRef = useRef<any>();

  const { dark } = UseApp();

  const [columnDefs] = useState<ColDef[]>([
    {
      field: "number",
      sortable: true,
      headerName: "SA",
      resizable: true,
      minWidth: 90,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "operationName",
      minWidth: 80,
      sortable: true,
      filter: "string",
      headerName: "Operação",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "statusName",
      minWidth: 90,
      sortable: true,
      filter: "number",
      headerName: "Status",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "code",
      minWidth: 90,
      sortable: true,
      filter: "text",
      headerName: "Código Base",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "destinyName",
      width: 120,
      minWidth: 80,
      sortable: true,
      filter: "string",
      headerName: "Destino",
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
      resizable: true,
    },
    {
      field: "branch",
      minWidth: 60,
      sortable: true,
      filter: "number",
      headerName: "Filial",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "data",
      minWidth: 80,
      sortable: true,
      filter: "date",
      headerName: "Data",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
      valueFormatter: (params: any) => {
        return moment(params.value).utc(false).format("DD/MM/YYYY");
      },
    },
  ]);

  React.useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, [dataList, service]);

  return (
    <Header title="Monitoramento SA Peças">
      <Row width="95%" className="mb-4 content-around" horizontal="center">
        <Column
          horizontal="center"
          className="bg-neutral-light-s00 dark:text-neutral-light-s00 dark:bg-neutral-dark-s00 p-4 rounded-xl shadow-md mx-5"
        >
          <Text asChild upperCase fontSize="md" weight="600">
            <h1>Data</h1>
          </Text>
          <DatePicker
            showIcon
            highlightDates={highlightedDates}
            dateFormat="dd/MM/yyyy"
            placeholderText="DD/MM/YYYY"
            selected={moment(date).add(3, "hours").toDate()}
            locale="pt-BR"
            className="px-4 py-2 rounded-md bg-neutral-light-s10/90 dark:bg-neutral-dark-s20/90 text-center cursor-pointer"
            onChange={(date) => {
              navigate(`/monitSA/${moment(date).format("YYYY-MM-DD")}`);
              changeDate(moment(date).format("YYYY-MM-DD"));
            }}
          />
        </Column>

        <Button
          disabled={dataRequested?.isFetching ? true : false}
          onClick={() => {
            dataRequested?.refetch();
          }}
          className="font-bold max-mobile:mt-4"
        >
          <Row>
            <MdSearch size={20} className="mr-1" />
            Pesquisar
          </Row>
        </Button>
      </Row>
      <Row height="100px" width="100%" className="mb-4 flex-nowrap" horizontal="space-around">
        <Card icon={{ kind: "working", size: 35 }} name="Executando" quantidade={countExec} />
        <Card icon={{ kind: "warning", size: 35 }} name="Ocorrências" quantidade={countOcor} />
        <Card icon={{ kind: "ok", size: 30 }} name="Liberados" quantidade={countLib} />
        <Card icon={{ kind: "check", size: 30 }} name="Finalizados" quantidade={countFim} />
      </Row>

      <Row width="95%" height="300px" bg="00" id="barchart" className={"rounded-lg shadow-lg"}>
        <ResponsiveContainer width="100%" height="100%" minWidth={"200px"}>
          <BarChart
            style={{ opacity: dataRequested?.isFetching ? 0.4 : 1 }}
            data={dataGraph}
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
                changeService(Number(e.activeLabel));
              }
            }}
          >
            <XAxis
              dataKey={"protocolo"}
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
              //   domain={[0, maxData]}
              fontSize={12}
              type="number"
              stroke={dark ? "#fff" : "#323232"}
              tick={{ fill: dark ? "#fff" : "#323232" }}
            />
            <Tooltip
              active={false}
              content={(value) => {
                if (!value.payload) return;

                if (!value.payload[1]) return;

                return (
                  <Column bg="10" className="py-4 px-4 rounded-lg shadow-2xl">
                    <Text asChild fontSize="md" weight="900" spacingBottom="xs">
                      <h1>{value.label}</h1>
                    </Text>
                    <Row>
                      <Text asChild fontSize="sm" weight="600" className="mr-1">
                        <h1>{value.payload[0].payload.status}</h1>
                      </Text>
                      <Text asChild fontSize="sm" weight="600">
                        <h1>{value.payload[0].payload.departament}</h1>
                      </Text>
                    </Row>

                    <Row>
                      <Text asChild fontSize="sm" weight="600" className="mr-2 text-attention-s120 dark:text-attention-s080">
                        <h1>Executando: </h1>
                      </Text>
                      <Text asChild fontSize="sm" weight="600" className="text-attention-s120 dark:text-attention-s080">
                        <h1>{value.payload[0].value}</h1>
                      </Text>
                    </Row>

                    <Row>
                      <Text asChild fontSize="sm" weight="600" className="mr-2 text-error-s100 dark:text-error-s080">
                        <h1>Pendente: </h1>
                      </Text>
                      <Text asChild fontSize="sm" weight="600" className="text-error-s100 dark:text-error-s080">
                        <h1>{value.payload[1].value}</h1>
                      </Text>
                    </Row>
                    <Row>
                      <Text asChild fontSize="sm" weight="600" className="mr-2 text-success-s100 dark:text-success-s080">
                        <h1>Finalizado: </h1>
                      </Text>
                      <Text asChild fontSize="sm" weight="600" className="text-success-s100 dark:text-success-s080">
                        <h1>{value.payload[2].value}</h1>
                      </Text>
                    </Row>
                    <Row>
                      <Text asChild fontSize="sm" weight="600" className="mr-2 text-primary-s100 dark:text-primary-s080">
                        <h1>Total: </h1>
                      </Text>
                      <Text asChild fontSize="sm" weight="600" className="text-primary-s100 dark:text-primary-s080">
                        <h1>{value.payload[3].value}</h1>
                      </Text>
                    </Row>
                  </Column>
                );
              }}
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
                    dataKey="countPending"
                    name="Contado"
                    fillOpacity={1}
                    fill={`${colors.error.s100}`}
                  />
                  <Area
                    type="natural"
                    stroke="#00ff0010"
                    dataKey="countFinished"
                    name="Contado"
                    fill={`${colors.success.s100}`}
                  />
                  <Area
                    type="natural"
                    stroke="#ffff2220"
                    dataKey="countExecuting"
                    name="Contado"
                    fill={`${colors.attention.s100}`}
                  />

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
              dataKey="countExecuting"
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
              dataKey="countPending"
              name="Pendente"
              fill={colors.error.s080}
            >
              <LabelList
                dataKey="countPending"
                content={(props) => {
                  const { x, y, width, height, value } = props;
                  const radius = 10;

                  if (!x || !y || !width || value == 0) return;

                  return (
                    <g>
                      <circle
                        cx={Number(x) + Number(width) / 2}
                        cy={Number(y) - radius}
                        r={radius}
                        opacity={0}
                        className="fill-error-s005"
                      />
                      <text
                        x={Number(x) + Number(width) / 2}
                        y={Number(y) - radius}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-error-s080 text-xs font-bold"
                      >
                        {value}
                      </text>
                    </g>
                  );
                }}
              />
            </Bar>

            <Bar
              cursor={"pointer"}
              background={{
                fill: dark ? "#ffffff20" : "#32323230",
                cursor: "pointer",
              }}
              barSize={5}
              dataKey=""
              name=""
              fill={dark ? colors.neutral.dark.s00 : colors.neutral.light.s00}
              opacity={0}
            />

            <Bar
              cursor={"pointer"}
              background={{
                fill: dark ? "#ffffff20" : "#32323230",
                cursor: "pointer",
              }}
              dataKey="countFinished"
              name="Finalizado"
              fill={colors.success.s080}
            />

            <Bar
              cursor={"pointer"}
              background={{
                fill: dark ? "#ffffff20" : "#32323230",
                cursor: "pointer",
              }}
              barSize={5}
              dataKey=""
              name=""
              fill={dark ? colors.neutral.dark.s00 : colors.neutral.light.s00}
              opacity={0}
            />

            <Bar
              cursor={"pointer"}
              background={{
                fill: dark ? "#ffffff20" : "#32323230",
                cursor: "pointer",
              }}
              dataKey="countTotal"
              name="Total"
              fill={colors.primary.s080}
            />
          </BarChart>
        </ResponsiveContainer>
      </Row>
      <Row height="20px" width="200px" />
      {service && (
        <Row width="95%" horizontal="center">
          <Text fontSize="xl" asChild>
            <h1>Protocolo: {service}</h1>
          </Text>
        </Row>
      )}
      <div
        className={clsx(
          dark ? "ag-theme-alpine-dark" : "ag-theme-alpine",
          "ag-theme-alpine shadow-lg rounded-2xl overflow-hidden mt-4 relative bg-primary-s010"
        )}
        style={{ height: "350px", width: "95%" }}
      >
        <AgGridReact
          ref={gridRef}
          noRowsOverlayComponent={() => {
            return (
              <Column horizontal="center">
                <EmptyDataIcon size={60} />
                <Text spacingTop="md" fontSize="lg">
                  Selecionar protocolo de serviço
                </Text>
              </Column>
            );
          }}
          getRowHeight={() => {
            return 22;
          }}
          animateRows={true}
          suppressCellFocus={false}
          headerHeight={40}
          rowClass={"cursor-pointer"}
          onRowClicked={async (value) => {
            const consulta = await serviceProduto(value.data.code);
            if (consulta && consulta[0]) {
              Swal.fire({
                confirmButtonColor: colors.primary.s100,
                title: String(consulta[0].ITE_COD_BASE_DESC),
              });
            } else {
              Toast.fire({
                icon: "error",
                title: `Produto não encontrado`,
              });
            }
          }}
          rowHeight={30}
          rowSelection="single"
          rowData={dataList}
          columnDefs={columnDefs}
        />
      </div>

      <Row height="50px" width="200px" />
    </Header>
  );
};
