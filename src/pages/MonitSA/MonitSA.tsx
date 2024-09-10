import { Row } from "componentes-web-lojas-cem";
import { Card } from "../../components/Card/Card";
import { Area, AreaChart, Bar, BarChart, Brush, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { UseMonitSa } from "../../hooks/MonitSaProvider";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import moment from "moment";
import { serviceProduto } from "../../repository/contagem";
import Swal from "sweetalert2";
import { Toast } from "../../components/Toast/Toast";
import DatePicker from "react-datepicker";
import { Button, Grid, HStack, IColumnDef, Text, useTheme, VStack } from "@inovaetech/components-react";
import { Header } from "../../components/Header";
import colors from "@inovaetech/components-react/colors";

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

  const { isDark: dark } = useTheme();

  const [columnDefs] = useState<IColumnDef[]>([
    {
      accessorKey: "number",
      enableSorting: true,
      header: "SA",
      enableResizing: true,
      minSize: 90,
    },
    {
      accessorKey: "operationName",
      minSize: 80,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Operação",
      enableResizing: true,
    },
    {
      accessorKey: "statusName",
      minSize: 90,
      enableSorting: true,
      enableColumnFilter: true,
      meta: { filterVariant: "date" },
      header: "Status",
      enableResizing: true,
    },
    {
      accessorKey: "code",
      minSize: 90,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Código Base",
      enableResizing: true,
    },
    {
      accessorKey: "destinyName",
      size: 120,
      minSize: 80,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Destino",

      enableResizing: true,
    },
    {
      accessorKey: "branch",
      minSize: 60,
      enableSorting: true,
      enableColumnFilter: true,
      meta: { filterVariant: "number" },
      header: "Filial",
      enableResizing: true,
    },
    {
      accessorKey: "data",
      minSize: 80,
      enableSorting: true,
      enableColumnFilter: true,
      meta: { filterVariant: "date" },
      header: "Data",
      enableResizing: true,

      cell: ({ getValue }) => {
        return moment(String(getValue())).utc(false).format("DD/MM/YYYY");
      },
    },
  ]);

  return (
    <main className="h-full w-full">
      <Header title="Monitoramento SA Peças"></Header>
      <Row width="100%" className="mb-4 content-around mt-4" horizontal="center">
        <VStack bg="surface" alignItems="center" className="dark:text-neutral-light-s00 p-4 rounded-xl shadow-md mx-5">
          <Text size="lg" weight="bold" color="default">
            Data
          </Text>
          <DatePicker
            showIcon
            id="datepickerinput"
            onInputClick={() => {
              const picker = document.getElementById("datepickerinput");
              if (picker) picker.blur();
            }}
            highlightDates={highlightedDates}
            dateFormat="dd/MM/yyyy"
            placeholderText="DD/MM/YYYY"
            selected={moment(date).add(3, "hours").toDate()}
            // locale="pt-BR"
            className="px-4 py-2 rounded-md bg-neutral-light-s10/90 dark:bg-neutral-dark-s20/90 text-center cursor-pointer"
            onChange={(date) => {
              navigate(`/monitSA/${moment(date).format("YYYY-MM-DD")}`);
              changeDate(moment(date).format("YYYY-MM-DD"));
            }}
          />
        </VStack>

        <Button
          isDisabled={dataRequested?.isFetching ? true : false}
          onPress={() => {
            dataRequested?.refetch();
          }}
          color="primary"
          className="font-bold max-mobile:mt-4"
          leftIcon="MdSearch"
        >
          Pesquisar
        </Button>
      </Row>
      <Row height="100px" width="100%" className="mb-4 flex-nowrap" horizontal="space-around">
        <Card icon={{ kind: "working", size: 35 }} name="Executando" quantidade={countExec} />
        <Card icon={{ kind: "warning", size: 35 }} name="Ocorrências" quantidade={countOcor} />
        <Card icon={{ kind: "ok", size: 30 }} name="Liberados" quantidade={countLib} />
        <Card icon={{ kind: "check", size: 30 }} name="Finalizados" quantidade={countFim} />
      </Row>

      <HStack bg="surface" id="barchart" className={"w-full h-[300px] rounded-lg shadow-lg"}>
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
              tick={(props) => {
                const finded = dataGraph.find((value) => {
                  return value.protocolo == Number(props.payload.value);
                });

                return (
                  <>
                    <circle
                      cx={props.x - 45}
                      cy={props.y + 45}
                      r={4}
                      className={
                        finded?.departamentNumber == 1 && finded.statusNumber == 1
                          ? "fill-error-s100"
                          : finded?.departamentNumber == 2 && finded.statusNumber == 2
                            ? "fill-attention-s100"
                            : "fill-none"
                      }
                    />
                    <text
                      transform={`rotate(-45 ${props.x},${props.y})`}
                      x={props.x}
                      y={props.y}
                      dy={6}
                      dx={-30}
                      fontSize={"12px"}
                      fontWeight={
                        finded?.departamentNumber == 1 && finded.statusNumber == 1
                          ? 800
                          : finded?.departamentNumber == 2 && finded.statusNumber == 2
                            ? 800
                            : 400
                      }
                      className={"fill-neutral-dark-s00 dark:fill-neutral-light-s00"}
                      textAnchor="middle"
                    >{`${props.payload.value}`}</text>
                  </>
                );
              }}
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
                  <VStack bg="surface" className="py-4 px-4 rounded-lg shadow-2xl">
                    <Text size="md" weight="bold" color="default">
                      {value.label}
                    </Text>
                    <Row>
                      <Text size="sm" weight="medium" className="mr-1">
                        {value.payload[0].payload.status}
                      </Text>
                      <Text size="sm" weight="medium">
                        {value.payload[0].payload.departament}
                      </Text>
                    </Row>

                    <Row>
                      <Text size="sm" weight="medium" className="mr-2 text-attention-s120 dark:text-attention-s080">
                        Executando:
                      </Text>
                      <Text size="sm" weight="medium" className="text-attention-s120 dark:text-attention-s080">
                        {value.payload[0].value}
                      </Text>
                    </Row>

                    <Row>
                      <Text size="sm" weight="medium" className="mr-2 text-error-s100 dark:text-error-s080">
                        Pendente:
                      </Text>
                      <Text size="sm" weight="medium" className="text-error-s100 dark:text-error-s080">
                        {value.payload[1].value}
                      </Text>
                    </Row>
                    <Row>
                      <Text size="sm" weight="medium" className="mr-2 text-success-s100 dark:text-success-s080">
                        Finalizado:
                      </Text>
                      <Text size="sm" weight="medium" className="text-success-s100 dark:text-success-s080">
                        {value.payload[2].value}
                      </Text>
                    </Row>
                    <Row>
                      <Text size="sm" weight="medium" className="mr-2 text-primary-s100 dark:text-primary-s080">
                        Total:
                      </Text>
                      <Text size="sm" weight="medium" className="text-primary-s100 dark:text-primary-s080">
                        {value.payload[3].value}
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
                fill: dark ? "#bbb" : `${colors.primary[500]}20`,
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
            {brushIndex > 0 && (
              <Brush startIndex={0} endIndex={brushIndex} dataKey={"rua"} height={20} stroke={colors.primary[400]}>
                <AreaChart>
                  <Area
                    type="natural"
                    stroke="#ff000010"
                    dataKey="countPending"
                    name="Contado"
                    fillOpacity={1}
                    fill={`${colors.error[400]}`}
                  />
                  <Area
                    type="natural"
                    stroke="#00ff0010"
                    dataKey="countFinished"
                    name="Contado"
                    fill={`${colors.success[400]}`}
                  />
                  <Area
                    type="natural"
                    stroke="#ffff2220"
                    dataKey="countExecuting"
                    name="Contado"
                    fill={`${colors.warning[400]}`}
                  />

                  <Area
                    type="natural"
                    stroke={colors.primary[400]}
                    dataKey="total"
                    name="Total"
                    fill={`${colors.primary[400]}30`}
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
              radius={2}
              stackId="a"
              background={{
                fill: dark ? "#ffffff10" : "#32323218",
                cursor: "pointer",
              }}
              dataKey="countPending"
              name="Pendente"
              fill={colors.error[500]}
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
              fill={dark ? colors.dark[700] : "#fff"}
              opacity={0}
            />

            <Bar
              cursor={"pointer"}
              radius={2}
              background={{
                fill: dark ? "#ffffff20" : "#32323230",
                cursor: "pointer",
              }}
              dataKey="countFinished"
              name="Finalizado"
              fill={colors.success[400]}
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
              fill={dark ? colors.dark[700] : "#fff"}
              opacity={0}
            />

            <Bar
              cursor={"pointer"}
              radius={2}
              background={{
                fill: dark ? "#ffffff20" : "#32323230",
                cursor: "pointer",
              }}
              dataKey="countTotal"
              name="Total"
              fill={colors.primary[400]}
            />
          </BarChart>
        </ResponsiveContainer>
      </HStack>
      <Row height="20px" width="200px" />
      {service && (
        <Row width="100%" horizontal="center">
          <Text color="default" weight="medium" size="xl" className=" my-2">
            Protocolo: {service}
          </Text>
        </Row>
      )}
      <div style={{ height: "350px", width: "100%" }}>
        {dataList && dataList.length > 0 ? (
          <Grid
            ref={gridRef}
            classNames={{ inner: "max-h-[350px] min-h-[350px]" }}
            onClickRow={async ({ row }: any) => {
              const consulta = await serviceProduto(row.code);
              if (consulta && consulta[0]) {
                Swal.fire({
                  confirmButtonColor: colors.primary[400],
                  title: String(consulta[0].ITE_COD_BASE_DESC),
                });
              } else {
                Toast.fire({
                  icon: "error",
                  title: `Produto não encontrado`,
                });
              }
            }}
            data={dataList}
            columns={columnDefs}
          />
        ) : (
          <></>
        )}
      </div>

      <Row height="100px" width="200px" />
    </main>
  );
};
