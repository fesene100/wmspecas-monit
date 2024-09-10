import { useEffect } from "react";
import { Row } from "componentes-web-lojas-cem";
import { Area, AreaChart, Bar, BarChart, Brush, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useRef, useState } from "react";
import moment from "moment";
import { UseOcorrencias } from "../../hooks/OcorrenciasProvider";
import clsx from "clsx";
import { MdWarning, MdTextSnippet } from "react-icons/md";
import { PiPuzzlePieceFill } from "react-icons/pi";
import { Grid, HStack, IColumnDef, Text, useTheme, VStack } from "@inovaetech/components-react";
import { Header } from "../../components/Header";
import colors from "@inovaetech/components-react/colors";

export const Ocorrencias = (): JSX.Element => {
  const { brushIndex, countPeca, countSa, countTotal, dataGraph, dataRequested, changeDate, date, dataListPeca, dataListSa } =
    UseOcorrencias();
  const gridRef = useRef<any>();

  const { isDark: dark } = useTheme();

  const [columnDefsPecas] = useState<IColumnDef[]>([
    {
      accessorKey: "seq",
      enableSorting: true,
      header: "SEQ",
      enableResizing: true,
      size: 80,
    },
    {
      accessorKey: "dateCreated",
      size: 110,
      enableSorting: true,
      header: "Data",
      enableColumnFilter: true,
      meta: { filterVariant: "date" },
      enableResizing: true,

      cell: ({ getValue }) => {
        return moment(String(getValue())).utc(false).format("DD/MM/YYYY");
      },
    },
    {
      accessorKey: "number",
      size: 130,
      enableSorting: true,
      enableColumnFilter: true,
      meta: { filterVariant: "number" },

      header: "SA",
      enableResizing: true,
    },
    {
      accessorKey: "local",
      size: 140,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Local",
      enableResizing: true,
    },
    {
      accessorKey: "reason",
      size: 140,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Motivo",
      enableResizing: true,
    },
    {
      accessorKey: "stock",
      size: 100,
      minSize: 80,
      enableSorting: true,
      enableColumnFilter: true,
      meta: { filterVariant: "number" },

      header: "Estoque",

      enableResizing: true,
    },
    {
      accessorKey: "description",
      size: 160,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Peça",
      enableResizing: true,
    },
    {
      accessorKey: "product",
      size: 100,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Produto",
      enableResizing: true,
    },
    {
      accessorKey: "address",
      size: 120,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Endereço",
      enableResizing: true,
    },
    {
      accessorKey: "user",
      size: 140,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Usuário",
      enableResizing: true,
    },
    {
      accessorKey: "maq",
      size: 120,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Máquina",
      enableResizing: true,
    },
    {
      accessorKey: "date",
      size: 110,
      enableSorting: true,
      enableColumnFilter: true,
      meta: { filterVariant: "date" },
      header: "Data alteração",
      enableResizing: true,
      cell: ({ getValue }) => {
        return moment(String(getValue())).utc(false).format("DD/MM/YYYY");
      },
    },
  ]);

  const [columnDefsSA] = useState<IColumnDef[]>([
    {
      accessorKey: "seq",
      enableSorting: true,
      header: "SEQ",
      enableResizing: true,
      size: 110,
    },
    {
      accessorKey: "dateCreated",
      size: 110,
      enableSorting: true,
      enableColumnFilter: true,
      meta: { filterVariant: "date" },
      header: "Data",
      enableResizing: true,
      cell: ({ getValue }) => {
        return moment(String(getValue())).utc(false).format("DD/MM/YYYY");
      },
    },

    {
      accessorKey: "number",
      size: 130,
      enableSorting: true,
      enableColumnFilter: true,
      meta: { filterVariant: "number" },

      header: "SA",
      enableResizing: true,
    },
    {
      accessorKey: "store",
      size: 140,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Filial",
      enableResizing: true,
    },
    {
      accessorKey: "reason",
      size: 240,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Motivo",
      enableResizing: true,
    },
    {
      accessorKey: "user",
      size: 140,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Usuário",
      enableResizing: true,
    },
    {
      accessorKey: "maq",
      size: 120,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Máquina",
      enableResizing: true,
    },
    {
      accessorKey: "date",
      size: 130,
      enableSorting: true,
      enableColumnFilter: true,
      meta: { filterVariant: "date" },
      header: "Data alteração",
      enableResizing: true,
      cell: ({ getValue }) => {
        return moment(String(getValue())).utc(false).format("DD/MM/YYYY");
      },
    },
  ]);

  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, [dataListSa, date]);

  return (
    <main className="h-full w-full">
      <Header title="Ocorrências sem soluções"> </Header>
      <Row height="100px" width="100%" className="mb-4 flex-nowrap mt-4" horizontal="space-around">
        <HStack
          bg="surface"
          justifyContent="center"
          alignItems="center"
          onClick={() => {
            changeDate(undefined);
          }}
          className={
            "min-w-[90px] h-[70]px w-1/6 max-mobile:!w-[10%] cursor-pointer p-2 px-4 rounded-lg shadow-md max-tablet:!p-0"
          }
        >
          <Row height={"100%"} width={"30%"} vertical="center" horizontal="center" className="max-tablet:!hidden">
            <MdWarning className="dark:text-neutral-light-s00" size={35} />
          </Row>
          <VStack className="w-[70%] items-end max-tablet:!items-center max-tablet:!w-full">
            <Text size="lg" weight="bold" color="default" className="text-center">
              {countTotal}
            </Text>
            <Text size="lg" color="contentPrimary" weight="normal" className="max-mobile:!text-sm">
              TOTAL
            </Text>
          </VStack>
        </HStack>
        <HStack
          bg="surface"
          justifyContent="center"
          alignItems="center"
          className={
            "min-w-[90px] h-[70]px w-1/6 max-mobile:!w-[10%] cursor-pointer p-2 px-4 rounded-lg shadow-md max-tablet:!p-0"
          }
        >
          <Row height={"100%"} width={"30%"} vertical="center" horizontal="center" className="max-tablet:!hidden">
            <MdTextSnippet className="dark:text-neutral-light-s00" size={35} />
          </Row>
          <VStack className="w-[70%] items-end max-tablet:!items-center max-tablet:!w-full">
            <Text size="lg" weight="bold" color="default" className="text-center">
              {countSa}
            </Text>
            <Text size="lg" color="contentPrimary" weight="normal" className="max-mobile:!text-sm">
              SAs
            </Text>
          </VStack>
        </HStack>
        <HStack
          bg="surface"
          justifyContent="center"
          alignItems="center"
          className={
            "min-w-[90px] h-[70]px w-1/6 max-mobile:!w-[10%] cursor-pointer p-2 px-4 rounded-lg shadow-md max-tablet:!p-0"
          }
        >
          <Row height={"100%"} width={"30%"} vertical="center" horizontal="center" className="max-tablet:!hidden">
            <PiPuzzlePieceFill className="dark:text-neutral-light-s00" size={35} />
          </Row>
          <VStack className="w-[70%] items-end max-tablet:!items-center max-tablet:!w-full">
            <Text size="lg" weight="bold" color="default" className="text-center">
              {countPeca}
            </Text>
            <Text size="lg" color="contentPrimary" weight="normal" className="max-mobile:!text-sm">
              PEÇAS
            </Text>
          </VStack>
        </HStack>
      </Row>

      <HStack bg="surface" id="barchart" className={"w-full h-[250px] rounded-lg shadow-lg"}>
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
              dataKey={"date"}
              height={70}
              fontSize={"0.8em"}
              dy={25}
              stroke={dark ? "#fff" : "#323232"}
              dx={-25}
              angle={-45}
              interval={0}
              tick={(props) => {
                const finded = dataGraph.find((value) => {
                  return value.date == props.payload.value;
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
                    >{`${moment(props.payload.value).utc(false).format("DD/MM")}`}</text>
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
                  <VStack bg="background" className="py-4 px-4 rounded-lg shadow-2xl">
                    <Text color="default" size="md" weight="bold" className="mb-1">
                      {moment(value.payload[0].payload.date).utc(false).format("DD/MM/YYYY")}
                    </Text>
                    <Row>
                      <Text
                        weight="medium"
                        className={clsx("mr-1", Number(value.payload[0].payload.days) >= 15 ? "text-error-s080" : "")}
                      >
                        {value.payload[0].payload.days}
                      </Text>
                      <Text
                        weight="medium"
                        className={clsx(Number(value.payload[0].payload.days) >= 15 ? "text-error-s080" : "")}
                      >
                        DIAS
                      </Text>
                    </Row>

                    <Row>
                      <Text weight="medium" className="mr-2 text-neutral-dark-s10 dark:text-neutral-light-s10">
                        TOTAL:
                      </Text>
                      <Text weight="medium" className="text-neutral-dark-s10 dark:text-neutral-light-s10">
                        {value.payload[0].payload.total}
                      </Text>
                    </Row>

                    <Row>
                      <Text weight="medium" className="mr-2 text-primary-s120 dark:text-primary-s080">
                        SA:
                      </Text>
                      <Text weight="medium" className="text-primary-s120 dark:text-primary-s080">
                        {value.payload[0].value}
                      </Text>
                    </Row>

                    <Row>
                      <Text weight="medium" className="mr-2 text-primary-s100 dark:text-primary-s080">
                        PEÇAS:
                      </Text>
                      <Text weight="medium" className="text-primary-s100 dark:text-primary-s080">
                        {value.payload[1].value}
                      </Text>
                    </Row>
                  </VStack>
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
                fill: dark ? "#bbb" : `${colors.primary[400]}10`,
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
            {brushIndex > 0 && (
              <Brush startIndex={0} endIndex={brushIndex} dataKey={"dateString"} height={20} stroke={colors.primary[400]}>
                <AreaChart>
                  <Area
                    type="natural"
                    stroke="#ff000010"
                    dataKey="peca"
                    name="PEÇA"
                    fillOpacity={1}
                    fill={`${colors.primary[200]}`}
                  />
                  <Area type="natural" stroke="#ff000010" dataKey="sa" name="SA" fill={`${colors.primary[600]}`} />
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
              fill={colors.primary[600]}
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
              fill={colors.primary[400]}
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
      </HStack>
      {dataListPeca && dataListPeca.length >= 1 && (
        <>
          <Row height="20px" width="200px" />
          <Row width="100%" horizontal="flex-start">
            <Text color="default" size="xl" weight="medium" className="text-left">
              Peças:
            </Text>
          </Row>

          <div style={{ height: "300px", width: "100%" }}>
            <Grid classNames={{ inner: "max-h-[300px] min-h-[300px]" }} data={dataListPeca} columns={columnDefsPecas} />
          </div>
        </>
      )}
      {dataListSa && dataListSa.length >= 1 && (
        <>
          <Row height="20px" width="200px" />
          <Row width="100%" horizontal="flex-start">
            <Text color="default" size="xl" weight="medium" className="text-left">
              SAs:
            </Text>
          </Row>
          <div style={{ height: "300px", width: "100%" }}>
            <Grid classNames={{ inner: "max-h-[300px] min-h-[300px]" }} data={dataListSa} columns={columnDefsSA} />
          </div>
        </>
      )}
      <Row height="100px" width="200px" />
    </main>
  );
};
