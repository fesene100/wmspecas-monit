import axios from "axios";
import { IGraphContagem, IListContagem } from "../../../wmspecas/src/models/monitoramentoService";
import { IListOccorrency } from "../../../wmspecas/src/models/monitoramentoService";

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
