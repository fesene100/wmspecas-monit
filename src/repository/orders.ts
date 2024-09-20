import axios from "axios";

const API = import.meta.env.PROD ? import.meta.env.VITE_API_SERVER_PROD : import.meta.env.VITE_API_SERVER;

export type IOrder = {
  id: number;
  date: string;
  count: number;
  protocol: number;
  type: string;
  suppliers: ISuppliers[];
};

export type ISuppliers = {
  code: number;
  name: string;
  count: number;
  parts: IParts[];
};

export type IParts = {
  id: number;
  code: string;
  describer: string;
  baseCode: string;
  baseDescriber: string;
  stock: number;
  receiveQuantity: number;
  orderQuantity: number;
  sup?: ISuppliers;
};

export async function requestMpcsDestinysOpened() {
  let resp: {
    message: { orders: IOrder[] };
  };

  try {
    const resposta = await axios({
      method: "GET",
      url: `http://${API}/warehouse/part/order/find-order-open-by-supplier`,
      auth: { username: import.meta.env.VITE_API_SERVER_USER, password: import.meta.env.VITE_API_SERVER_PWD },
    });

    resp = resposta.data;
    return resp;
  } catch (error: any) {
    console.log(error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Sem conexão com o servidor");
    }
  }
}
