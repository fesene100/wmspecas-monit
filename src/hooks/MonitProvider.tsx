import React, { useEffect } from "react";
import {
  serviceContagemEnderecos,
  serviceContagemListOcorrencias,
  serviceContagemListPecas,
  serviceContagemPeca,
} from "../repository/contagem";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IGraphContagem, IListContagem, IListOccorrency } from "../../../wmspecas/src/models/monitoramentoService";
import { IOptions } from "../components/SelectComponent/SelectComponent";
import Swal from "sweetalert2";
import { colors } from "estilos-lojas-cem";
import { maskLocal } from "../useCases/maskLocal";

export const optionsRuas: IOptions[] = [
  { value: "1", label: "Executando " },
  { value: "2", label: "Ocorrência" },
  { value: "3", label: "Pendentes" },
  { value: "4", label: "Finalizadas " },
];

interface IMonit {
  servicosGrafico?: UseQueryResult<IGraphContagem[]>;
  list: UseQueryResult<IListContagem[], unknown>;
  ocorrencias: UseQueryResult<IListOccorrency[], unknown>;
  exec: number;
  ocor: number;
  lib: number;
  fim: number;
  listRua: string;
  changeListRua: (value: string) => void;
  grupos: IOptions[];
  selectGrupos: IOptions[];
  changeSelectGrupos: (value: IOptions[]) => void;
  selectRua?: IOptions;
  changeSelectRua: (value: IOptions | undefined) => void;
  getDescPeca: (seqPeca: number) => void;
}

type Props = {
  children: JSX.Element;
};

export const MonitContext = React.createContext<IMonit>({} as IMonit);

export const MonitProvider = ({ children }: Props) => {
  const getlistRua = !localStorage.getItem("listRua") ? "" : String(localStorage.getItem("listRua"));

  const [exec, setSelectExec] = React.useState<number>(0);
  const [ocor, setSelectOcor] = React.useState<number>(0);
  const [lib, setSelectLib] = React.useState<number>(0);
  const [fim, setSelectFim] = React.useState<number>(0);
  const [grupos, setGrupos] = React.useState<IOptions[]>([]);
  const [selectRua, setSelectRua] = React.useState<IOptions>();
  const [selectGrupos, setSelectGrupos] = React.useState<IOptions[]>([]);
  const [listRua, setListRua] = React.useState<string>(getlistRua);

  const getDescPeca = async (seqPeca: number) => {
    try {
      const consulta = await serviceContagemPeca(seqPeca);

      consulta
        ? Swal.fire({
            confirmButtonColor: colors.primary.s100,
            title: consulta.ITE_COD_BASE_DESC,
            html: `
            <h2 style="color:#32323280" >${consulta.ITE_DESCRICAO}</h2>
            <br/>
            <p style="float:left;color:#323232"><b>LOCAL:</b> ${maskLocal(consulta.ITE_LOCAL)}</p>
            <p style="float:right;color:#323232"><b>COD BASE:</b> ${consulta.ITE_COD_BASE}</p>`,
          })
        : Swal.fire({
            confirmButtonColor: colors.primary.s100,
            icon: "error",
            title: "Peça não encontrada",
          });
    } catch {
      //   return Toast.fire({
      //     icon: "error",
      //     title: "Sem conexão com servidor !",
      //   });
    }
  };

  const servicosGrafico = useQuery(["monitoramento"], serviceContagemEnderecos, {
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    networkMode: "always",
  });

  const list = useQuery(
    ["serviceContagemListPecas"],
    async () => {
      return serviceContagemListPecas({ endereco: listRua });
    },
    {
      refetchInterval: 60000,
      refetchIntervalInBackground: true,
      networkMode: "always",
    }
  );

  const ocorrencias = useQuery(["serviceContagemListOcorrencias"], serviceContagemListOcorrencias, {
    refetchInterval: 120000,
    refetchIntervalInBackground: true,
    networkMode: "always",
  });

  useEffect(() => {
    let newgrupos: IOptions[] = [];
    let newExec = 0;
    let newOcor = 0;
    let newLib = 0;
    let newFim = 0;

    servicosGrafico.data &&
      servicosGrafico.data.map((cont) => {
        newgrupos.push({
          label: cont.grupo,
          value: cont.grupo.padStart(2, "0"),
        });

        cont.ruas.map((value) => {
          newExec = newExec + value.exec;
          newOcor = newOcor + value.ocor;
          newLib = newLib + value.pendente;
          newFim = newFim + value.fim;
        });
      });

    setSelectExec(newExec);
    setSelectOcor(newOcor);
    setSelectLib(newLib);
    setSelectFim(newFim);
    setGrupos(newgrupos);
  }, [servicosGrafico.data]);

  const changeSelectRua = (isSelect?: IOptions) => {
    setSelectRua(isSelect);
  };

  const changeSelectGrupos = (isSelect: IOptions[]) => {
    setSelectGrupos(isSelect);
  };

  const changeListRua = (isSelect: string) => {
    localStorage.setItem("listRua", String(isSelect));
    setListRua(isSelect);
  };

  useEffect(() => {
    list.refetch();
  }, [listRua]);

  return (
    <MonitContext.Provider
      value={{
        changeSelectGrupos,
        changeSelectRua,
        getDescPeca,
        changeListRua,
        list,
        ocorrencias,
        selectGrupos,
        listRua,
        selectRua,
        grupos,
        servicosGrafico,
        exec,
        fim,
        lib,
        ocor,
      }}
    >
      {children}
    </MonitContext.Provider>
  );
};

export const UseMonit = (): IMonit => {
  const context = React.useContext(MonitContext);

  return context;
};
