import React, { useContext, useEffect, useState } from "react";
import { requestMpcsDestinysOpened, IOrder } from "../repository/orders";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

interface IPedidos {
  dataRequested?: UseQueryResult<{ message: { orders: IOrder[] } }>;
  orders?: IOrder[];
  date?: string;
  changeDate: (props?: string) => void;
}

type Props = {
  children: JSX.Element;
};

export const PedidosContext = React.createContext<IPedidos>({} as IPedidos);

export const PedidosProvider = ({ children }: Props) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [date, setDate] = useState<string>();

  const dataRequested = useQuery(["Pedidos"], requestMpcsDestinysOpened, {
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    networkMode: "always",
  });

  const changeDate = (value?: string) => {
    setDate(value);
  };

  useEffect(() => {
    if (!dataRequested.data) return;

    setOrders(dataRequested.data.message.orders);
  }, [dataRequested.data]);

  return (
    <PedidosContext.Provider
      value={{
        orders,
        dataRequested,
        changeDate,
        date,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};

export const UsePedidos = (): IPedidos => {
  const context = useContext(PedidosContext);

  return context;
};
