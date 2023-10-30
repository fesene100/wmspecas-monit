import React, { useEffect } from "react";
import { Column, Row, Text } from "componentes-web-lojas-cem";
import { Header } from "../Header/Header";
import { Area, AreaChart, Bar, BarChart, Brush, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { UseApp } from "../../hooks/AppProvider";
import { colors } from "estilos-lojas-cem";
import { useRef, useState } from "react";
import { EmptyDataIcon } from "../../components/svg/EmptyDataIcon/EmptyDataIcon";
import { ColDef } from "ag-grid-community";
import moment from "moment";
import { UseOcorrencias } from "../../hooks/OcorrenciasProvider";
import clsx from "clsx";
import { MdWarning, MdTextSnippet, MdOutlinePlumbing } from "react-icons/md";
import { AgGridReact } from "ag-grid-react";

export const Ocorrencias = (): JSX.Element => {
  const {
    brushIndex,
    countPeca,
    countSa,
    countTotal,
    dataGraph,
    dataRequested,
    changeDate,
    date,
    dataListPeca,
    dataListSa,
    dataRequestedList,
  } = UseOcorrencias();
  const gridRef = useRef<any>();

  const { dark } = UseApp();

  const [columnDefsPecas] = useState<ColDef[]>([
    {
      field: "seq",
      sortable: true,
      headerName: "SEQ",
      resizable: true,
      width: 80,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "dateCreated",
      width: 110,
      sortable: true,
      headerName: "Data",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
      valueFormatter: (params: any) => {
        return moment(params.value).utc(false).format("DD/MM/YYYY");
      },
    },

    {
      field: "number",
      width: 130,
      sortable: true,
      filter: "number",
      headerName: "SA",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "local",
      width: 140,
      sortable: true,
      filter: "string",
      headerName: "Local",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "reason",
      width: 140,
      sortable: true,
      filter: "text",
      headerName: "Motivo",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "stock",
      width: 100,
      minWidth: 80,
      sortable: true,
      filter: "number",
      headerName: "Estoque",
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
      resizable: true,
    },
    {
      field: "description",
      width: 160,
      sortable: true,
      filter: "string",
      headerName: "Peça",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "product",
      width: 100,
      sortable: true,
      filter: "string",
      headerName: "Produto",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "address",
      width: 120,
      sortable: true,
      filter: "string",
      headerName: "Endereço",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "user",
      width: 140,
      sortable: true,
      filter: "string",
      headerName: "Usuário",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "maq",
      width: 120,
      sortable: true,
      filter: "string",
      headerName: "Máquina",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "date",
      width: 110,
      sortable: true,
      filter: "date",
      headerName: "Data alteração",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
      valueFormatter: (params: any) => {
        return moment(params.value).utc(false).format("DD/MM/YYYY");
      },
    },
  ]);

  const [columnDefsSA] = useState<ColDef[]>([
    {
      field: "seq",
      sortable: true,
      headerName: "SEQ",
      resizable: true,
      width: 110,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "dateCreated",
      width: 110,
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

    {
      field: "number",
      width: 130,
      sortable: true,
      filter: "number",
      headerName: "SA",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "store",
      width: 140,
      sortable: true,
      filter: "string",
      headerName: "Filial",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "reason",
      width: 240,
      sortable: true,
      filter: "text",
      headerName: "Motivo",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "user",
      width: 140,
      sortable: true,
      filter: "string",
      headerName: "Usuário",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "maq",
      width: 120,
      sortable: true,
      filter: "string",
      headerName: "Máquina",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "date",
      width: 130,
      sortable: true,
      filter: "date",
      headerName: "Data alteração",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
      valueFormatter: (params: any) => {
        return moment(params.value).utc(false).format("DD/MM/YYYY");
      },
    },
  ]);

  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, [dataListSa, date]);

  return (
    <Header title="Ocorrências sem soluções">
      <Row height="100px" width="100%" className="mb-4 flex-nowrap" horizontal="space-around">
        <Row
          bg="00"
          width={"17%"}
          height="70px"
          vertical="center"
          horizontal="center"
          onClick={() => {
            changeDate(undefined);
          }}
          className={"min-w-[90px] w-1/6 max-mobile:w-[10%] cursor-pointer p-2 px-4 rounded-lg shadow-md max-tablet:p-0"}
        >
          <Row height={"100%"} width={"30%"} vertical="center" horizontal="center" className="max-tablet:hidden">
            <MdWarning className="dark:text-neutral-light-s00" size={35} />
          </Row>
          <Column width="70%" vertical="center" className="items-end max-tablet:items-center max-tablet:w-full">
            <Text asChild fontSize="lg" weight="900" align="center">
              <h1>{countTotal}</h1>
            </Text>
            <Text asChild fontSize="md" color="medium" weight="600" className="max-mobile:text-sm">
              <h1>TOTAL</h1>
            </Text>
          </Column>
        </Row>
        <Row
          bg="00"
          width={"17%"}
          height="70px"
          vertical="center"
          horizontal="center"
          className={"min-w-[90px] w-1/6 max-mobile:w-[10%] cursor-pointer p-2 px-4 rounded-lg shadow-md max-tablet:p-0"}
        >
          <Row height={"100%"} width={"30%"} vertical="center" horizontal="center" className="max-tablet:hidden">
            <MdTextSnippet className="dark:text-neutral-light-s00" size={35} />
          </Row>
          <Column width="70%" vertical="center" className="items-end max-tablet:items-center max-tablet:w-full">
            <Text asChild fontSize="lg" weight="900" align="center">
              <h1>{countSa}</h1>
            </Text>
            <Text asChild fontSize="md" color="medium" weight="600" className="max-mobile:text-sm">
              <h1>SAs</h1>
            </Text>
          </Column>
        </Row>
        <Row
          bg="00"
          width={"17%"}
          height="70px"
          vertical="center"
          horizontal="center"
          className={"min-w-[90px] w-1/6 max-mobile:w-[10%] cursor-pointer p-2 px-4 rounded-lg shadow-md max-tablet:p-0"}
        >
          <Row height={"100%"} width={"30%"} vertical="center" horizontal="center" className="max-tablet:hidden">
            <MdOutlinePlumbing className="dark:text-neutral-light-s00" size={35} />
          </Row>
          <Column width="70%" vertical="center" className="items-end max-tablet:items-center max-tablet:w-full">
            <Text asChild fontSize="lg" weight="900" align="center">
              <h1>{countPeca}</h1>
            </Text>
            <Text asChild fontSize="md" color="medium" weight="600" className="max-mobile:text-sm">
              <h1>PEÇAS</h1>
            </Text>
          </Column>
        </Row>
      </Row>

      <Row width="95%" height="250px" bg="00" id="barchart" className={"rounded-lg shadow-lg"}>
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
              if (e && e.activePayload && e.activePayload[1]) {
                changeDate(moment(e.activePayload[1].payload.date).utc(false).format("YYYY-MM-DD"));
              }
            }}
          >
            <XAxis
              dataKey={"dateString"}
              height={70}
              fontSize={"0.8em"}
              dy={25}
              stroke={dark ? "#fff" : "#323232"}
              dx={-25}
              angle={-45}
              interval={0}
              tick={(props) => {
                const finded = dataGraph.find((value) => {
                  return value.dateString == props.payload.value;
                });

                if (!finded) return <></>;

                return (
                  <>
                    {finded.days >= 15 && (
                      <>
                        <circle cx={props.x - 30} cy={props.y + 40} r={9} className={"fill-error-s005"} />
                        <text
                          transform={`rotate(-45 ${props.x},${props.y})`}
                          x={props.x}
                          y={props.y}
                          dy={11}
                          dx={-50}
                          fontSize={"12px"}
                          fontWeight={600}
                          className={clsx("fill-error-s120 dark:fill-error-s100")}
                          textAnchor="middle"
                        >{`${finded.days}`}</text>
                      </>
                    )}
                    <text
                      transform={`rotate(-45 ${props.x},${props.y})`}
                      x={props.x}
                      y={props.y}
                      dy={6}
                      dx={-20}
                      fontSize={"12px"}
                      fontWeight={600}
                      className={clsx("fill-neutral-dark-s00 dark:fill-neutral-light-s00")}
                      textAnchor="middle"
                    >{`${props.payload.value}`}</text>
                  </>
                );
              }}
            />
            <YAxis
              //   domain={[0, maxData]}
              fontSize={12}
              type="number"
              stroke={dark ? "#fff" : "#323232"}
              tick={{ fill: dark ? "#fff" : "#323232" }}
            />
            <Tooltip
              active={true}
              content={(value) => {
                if (!value || !value.payload || !value.payload[1]) return;
                return (
                  <Column bg="10" className="py-4 px-4 rounded-lg shadow-2xl">
                    <Text asChild fontSize="md" weight="900" spacingBottom="xs">
                      <h1>{moment(value.payload[0].payload.date).utc(false).format("DD/MM/YYYY")}</h1>
                    </Text>
                    <Row>
                      <Text
                        asChild
                        fontSize="sm"
                        weight="600"
                        className={clsx("mr-1", Number(value.payload[0].payload.days) >= 15 ? "text-error-s080" : "")}
                      >
                        <h1>{value.payload[0].payload.days}</h1>
                      </Text>
                      <Text
                        asChild
                        fontSize="sm"
                        weight="600"
                        className={clsx(Number(value.payload[0].payload.days) >= 15 ? "text-error-s080" : "")}
                      >
                        <h1>DIAS</h1>
                      </Text>
                    </Row>

                    <Row>
                      <Text asChild fontSize="sm" weight="600" className="mr-2 text-neutral-dark-s10 dark:text-neutral-light-s10">
                        <h1>TOTAL: </h1>
                      </Text>
                      <Text asChild fontSize="sm" weight="600" className="text-neutral-dark-s10 dark:text-neutral-light-s10">
                        <h1>{value.payload[0].payload.total}</h1>
                      </Text>
                    </Row>

                    <Row>
                      <Text asChild fontSize="sm" weight="600" className="mr-2 text-primary-s120 dark:text-primary-s080">
                        <h1>SA: </h1>
                      </Text>
                      <Text asChild fontSize="sm" weight="600" className="text-primary-s120 dark:text-primary-s080">
                        <h1>{value.payload[0].value}</h1>
                      </Text>
                    </Row>

                    <Row>
                      <Text asChild fontSize="sm" weight="600" className="mr-2 text-primary-s100 dark:text-primary-s080">
                        <h1>PEÇAS: </h1>
                      </Text>
                      <Text asChild fontSize="sm" weight="600" className="text-primary-s100 dark:text-primary-s080">
                        <h1>{value.payload[1].value}</h1>
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
                fill: dark ? "#bbb" : `${colors.primary.s100}10`,
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
            {brushIndex > 0 && (
              <Brush startIndex={0} endIndex={brushIndex} dataKey={"dateString"} height={20} stroke={colors.primary.s080}>
                <AreaChart>
                  <Area
                    type="natural"
                    stroke="#ff000010"
                    dataKey="peca"
                    name="PEÇA"
                    fillOpacity={1}
                    fill={`${colors.primary.s010}`}
                  />
                  <Area type="natural" stroke="#ff000010" dataKey="sa" name="SA" fill={`${colors.primary.s100}`} />
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
              dataKey="sa"
              name="SA"
              fill={colors.primary.s120}
            />

            <Bar
              cursor={"pointer"}
              radius={2}
              stackId="a"
              background={{
                fill: dark ? "#ffffff05" : "#32323205",
                cursor: "pointer",
              }}
              dataKey="peca"
              name="PEÇA"
              fill={colors.primary.s080}
            >
              <LabelList
                dataKey="total"
                content={(props) => {
                  const { x, y, width, height, value } = props;
                  const radius = 10;

                  return (
                    <g>
                      <circle
                        cx={Number(x) + Number(width) / 2}
                        cy={Number(y) - radius}
                        r={radius}
                        opacity={0}
                        className="fill-primary-s005"
                      />
                      <text
                        x={Number(x) + Number(width) / 2}
                        y={Number(y) - radius}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-primary-s080 text-xs font-bold"
                      >
                        {value}
                      </text>
                    </g>
                  );
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Row>
      {dataListPeca && dataListPeca.length >= 1 && (
        <>
          <Row height="20px" width="200px" />
          <Row width="95%" horizontal="flex-start">
            <Text fontSize="xl" weight="600" asChild align="left">
              <h1>Peças:</h1>
            </Text>
          </Row>

          <div
            className={clsx(
              dark ? "ag-theme-alpine-dark" : "ag-theme-alpine",
              "ag-theme-alpine shadow-lg rounded-2xl overflow-hidden mt-4 relative bg-primary-s010",
              dataRequestedList?.isFetching && "opacity-30"
            )}
            style={{ height: "250px", width: "95%" }}
          >
            <AgGridReact
              noRowsOverlayComponent={() => {
                return (
                  <Column horizontal="center">
                    <EmptyDataIcon size={60} />
                    <Text spacingTop="md" fontSize="lg">
                      Selecionar Data
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
              rowHeight={30}
              rowSelection="single"
              rowData={dataListPeca}
              columnDefs={columnDefsPecas}
            />
          </div>
        </>
      )}
      {dataListSa && dataListSa.length >= 1 && (
        <>
          <Row height="20px" width="200px" />
          <Row width="95%" horizontal="flex-start">
            <Text fontSize="xl" weight="600" asChild align="left">
              <h1>SAs:</h1>
            </Text>
          </Row>
          <div
            className={clsx(
              dataRequestedList?.isFetching && "opacity-30",
              dark ? "ag-theme-alpine-dark" : "ag-theme-alpine",
              "ag-theme-alpine shadow-lg rounded-2xl overflow-hidden mt-4 relative bg-primary-s010"
            )}
            style={{ height: "250px", width: "95%" }}
          >
            <AgGridReact
              ref={gridRef}
              noRowsOverlayComponent={() => {
                return (
                  <Column horizontal="center">
                    <EmptyDataIcon size={60} />
                    <Text spacingTop="md" fontSize="lg">
                      Selecionar Data
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
              rowHeight={30}
              rowSelection="single"
              rowData={dataListSa}
              columnDefs={columnDefsSA}
            />
          </div>
        </>
      )}
      <Row height="100px" width="200px" />
    </Header>
  );
};
