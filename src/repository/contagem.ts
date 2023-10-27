import axios from "axios";
import { IGraphContagem, IListContagem, IServicesMonit } from "../../../wmspecas/src/models/monitoramentoService";
import { IListOccorrency } from "../../../wmspecas/src/models/monitoramentoService";
import { PECA_ITEM } from "../../../wmspecas/prisma/generated/clientPeca";
import { IGraphOcorrencias } from "../hooks/OcorrenciasProvider";

const API = import.meta.env.PROD ? import.meta.env.VITE_API_PROD : import.meta.env.VITE_API;

export async function serviceContagemEnderecos() {
  try {
    const resposta: { data: IGraphContagem[] } = await axios({
      method: "GET",
      url: `http://${API}/monitoramento/contagem_pecas`,
    });

    return resposta.data;
  } catch (error) {
    console.log(error);
    throw new Error("Sem conexão com o servidor !");
  }
}

export async function serviceContagemListPecas({ endereco }: { endereco?: string }) {
  try {
    const resposta: { data: IListContagem[] } = await axios({
      method: "GET",
      url: `http://${API}/monitoramento/contagem_lista_pecas/${endereco ? endereco : ""}`,
    });

    return resposta.data;
  } catch (error) {
    console.log(error);
    throw new Error("Sem conexão com o servidor !");
  }
}

export async function serviceContagemListOcorrencias() {
  try {
    const resposta: { data: IListOccorrency[] } = await axios({
      method: "GET",
      url: `http://${API}/monitoramento/contagem_lista_ocorrencias/`,
    });

    return resposta.data;
  } catch (error) {
    console.log(error);
    throw new Error("Sem conexão com o servidor !");
  }
}

export async function serviceContagemPeca(seqPeca: number) {
  try {
    const resposta: { data: any } = await axios({
      method: "GET",
      url: `http://${API}/monitoramento/contagem_peca/${seqPeca}`,
    });
    return resposta.data;
  } catch (error) {
    console.log(error);
    throw new Error("Sem conexão com o servidor !");
  }
}

export async function serviceProduto(seqProduto: number) {
  try {
    const resposta: { data: PECA_ITEM[] } = await axios({
      method: "GET",
      url: `http://${API}/monitoramento/produto/${seqProduto}`,
    });
    return resposta.data;
  } catch (error) {
    console.log(error);
    throw new Error("Sem conexão com o servidor !");
  }
}

export async function serviceMonitSa(date: string) {
  try {
    const resposta: { data: IServicesMonit[] } = await axios({
      method: "GET",
      url: `http://${API}/monitoramento/service/${date}`,
    });
    return resposta.data;
  } catch (error) {
    console.log(error);
    throw new Error("Sem conexão com o servidor !");
  }
}

export async function servicesData() {
  try {
    const resposta: { data: { SER_DATA: Date }[] } = await axios({
      method: "GET",
      url: `http://${API}/monitoramento/servicesData/`,
    });
    return resposta.data;
  } catch (error) {
    console.log(error);
    throw new Error("Sem conexão com o servidor !");
  }
}

export async function servicesDatesOccurrency() {
  try {
    const resposta: { data: IGraphOcorrencias[] } = await axios({
      method: "GET",
      url: `http://${API}/monitoramento/datesOccurrency/`,
    });
    return resposta.data;
  } catch (error) {
    console.log(error);
    throw new Error("Sem conexão com o servidor !");
  }
}

export interface ISAOcorrList {
  seq: number;
  dateCreated: Date;
  number: number;
  store: number;
  reason: string;
  user: string;
  maq: string;
  date: Date;
}

export interface IPecaOcorrList {
  seq: number;
  dateCreated: Date;
  number: number;
  local: string;
  reason: string;
  stock: number;
  description: string;
  product: string;
  address: string;
  user: string;
  maq: string;
  date: Date;
}

export async function servicesOccurrencyPerdate({ queryKey }: any) {
  try {
    const resposta: { data: { pecas: IPecaOcorrList[]; sa: ISAOcorrList[] } } = await axios({
      method: "GET",
      url: `http://${API}/monitoramento/datesOccurrencyList/${queryKey ? queryKey : ""}`,
    });
    return resposta.data;
  } catch (error) {
    console.log(error);
    throw new Error("Sem conexão com o servidor !");
  }
}
