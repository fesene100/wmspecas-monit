import { useEffect, useMemo, useState } from "react";
import { Grid, HStack, IconButton, Text, useTheme, VStack } from "@inovaetech/components-react";
import { Header } from "../../components/Header";
import { UsePedidos } from "../../hooks/PedidosProvider";
import { Bar, BarChart, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import moment from "moment";
import clsx from "clsx";
import colors from "@inovaetech/components-react/colors";
import { IOrder, IParts } from "../../repository/orders";

export const Pedidos = (): JSX.Element => {
  const { dataRequested, orders, date, changeDate } = UsePedidos();

  const parts = useMemo(() => {
    if (date) {
      const finded = orders?.find((a) => a.date == date);

      if (finded) {
        const newarray: IParts[] = [];
        finded.suppliers.sort((a, b) => (a.name >= b.name ? 1 : -1));
        finded.suppliers.map((sup) => {
          sup.parts.map((part) => {
            newarray.push({ sup: sup, ...part });
          });
        });

        return newarray;
      }
    }

    return [];
  }, [date, orders]);

  const [total, setTotal] = useState(0);

  const { isDark: dark } = useTheme();

  useEffect(() => {
    console.log(parts);
  }, [parts]);

  return (
    <main className="h-full w-full mb-10">
      <Header title="Pedidos em aberto">
        <IconButton
          isDisabled={!date}
          color={date ? "error" : "default"}
          variant="light"
          className="mt-1 shadow-sm"
          icon={date ? "PiFunnelX" : "PiFunnel"}
          onPress={() => {
            date && changeDate();
          }}
        ></IconButton>
      </Header>
      <HStack bg="surface" id="barchart" className={"w-full h-[250px] mt-4 rounded-lg shadow-lg"}>
        <ResponsiveContainer width="100%" height="100%" minWidth={"200px"}>
          <BarChart
            style={{ opacity: dataRequested?.isFetching ? 0.4 : 1 }}
            data={orders}
            margin={{
              top: 0,
              right: 20,
              left: -15,
              bottom: 20,
            }}
            barGap={0}
            barSize={8}
            onClick={(e) => {
              if (e && e.activePayload && e.activePayload[0] && e.activePayload[0].payload.date) {
                const date = e.activePayload[0].payload.date;

                if (date) {
                  const finded = orders?.find((a) => a.date == date);

                  if (finded) {
                    const newarray: IParts[] = [];
                    finded.suppliers.sort((a, b) => (a.name >= b.name ? 1 : -1));
                    finded.suppliers.map((sup) => {
                      sup.parts.map((part) => {
                        newarray.push({ sup: sup, ...part });
                      });
                    });

                    setTotal(newarray.length);
                  }
                }

                changeDate(e.activePayload[0].payload.date);
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
              format={"oi"}
              tick={(props) => {
                if (!orders) return <></>;

                const finded = orders.find((value) => {
                  return value.date == props.payload.value;
                });

                if (!finded) return <></>;

                const days = moment().diff(moment(finded.date), "days");

                return (
                  <>
                    {days >= 15 && (
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
                        >{`${days}`}</text>
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
                if (!value || !value.payload || !value.payload[0]) return;

                const hovered: IOrder = value.payload[0].payload;

                return (
                  <VStack bg="background" className="py-4 px-4 rounded-lg shadow-2xl">
                    <Text color="default" size="md" weight="bold" className="mb-1">
                      {moment(hovered.date).utc(false).format("DD/MM/YYYY")}
                    </Text>
                    <HStack>
                      <Text
                        weight="medium"
                        className={clsx("mr-1", moment().diff(moment(hovered.date), "days") >= 15 ? "text-error-s080" : "")}
                      >
                        {moment().diff(moment(hovered.date), "days")}
                      </Text>
                      <Text
                        weight="medium"
                        className={clsx(moment().diff(moment(hovered.date), "days") >= 15 ? "text-error-s080" : "")}
                      >
                        DIAS
                      </Text>
                    </HStack>

                    <HStack>
                      <Text weight="medium" className="mr-2 text-neutral-dark-s10 dark:text-neutral-light-s10">
                        Protocolo:
                      </Text>
                      <Text weight="medium" className="text-neutral-dark-s10 dark:text-neutral-light-s10">
                        {hovered?.protocol}
                      </Text>
                    </HStack>

                    <HStack>
                      <Text weight="medium" className="mr-2 text-primary-s100 dark:text-primary-s080">
                        Quantidade:
                      </Text>
                      <Text weight="medium" className="text-primary-s100 dark:text-primary-s080">
                        {value.payload[0].value}
                      </Text>
                    </HStack>
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

            <Bar
              cursor={"pointer"}
              radius={2}
              background={{
                fill: dark ? "#ffffff05" : "#32323205",
                cursor: "pointer",
              }}
              dataKey="count"
              name="Quantidade"
              fill={colors.primary[400]}
            >
              <LabelList
                dataKey="count"
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

      {date && (
        <>
          <Grid
            height={"350px"}
            data={parts}
            className="mt-4"
            inputSearch={{
              show: true,
              keys: ["sup.name", "describer", "baseDescriber", "baseCode"],
              props: { description: `${total} peças encontradas` },
            }}
            onFilterChange={(val) => {
              setTotal(val);
            }}
            columns={[
              {
                accessorKey: "sup.name",
                header: "Fornecedor",
                enableSorting: true,
                enableColumnFilter: true,
                meta: { initialFilterOption: "SELECIONAR" },
              },
              // {
              //   accessorKey: "sup.code",
              //   header: "Código do fornecedor",
              //   enableSorting: true,
              //   enableColumnFilter: true,
              //   meta: { filterVariant: "number" },
              // },
              { accessorKey: "code", header: "Código", enableSorting: true, enableColumnFilter: true },
              { accessorKey: "describer", header: "Descrição", enableSorting: true, enableColumnFilter: true },
              { accessorKey: "baseDescriber", header: "Produto", enableSorting: true, enableColumnFilter: true },
              {
                accessorKey: "baseCode",
                header: "Código base",
                enableSorting: true,
                enableColumnFilter: true,
                meta: { filterVariant: "number" },
              },
              {
                accessorKey: "stock",
                header: "Estoque",
                enableSorting: true,
                enableColumnFilter: true,
                meta: { filterVariant: "number" },
              },
              {
                accessorKey: "receiveQuantity",
                header: "Recebido",
                enableSorting: true,
                enableColumnFilter: true,
                meta: { filterVariant: "number" },
              },
              {
                accessorKey: "orderQuantity",
                header: "Qtde Pedido",
                enableSorting: true,
                enableColumnFilter: true,
                meta: { filterVariant: "number" },
              },
            ]}
          >
            <HStack className="h-12 ml-4" justifyContent="start" alignItems="start">
              <Text size="lg" color="default" weight="bold">
                - {moment(date).utc(false).format("DD/MM/YYYY")}
              </Text>
            </HStack>
          </Grid>
        </>
      )}
      <div className="h-12 w-full"></div>
    </main>
  );
};
