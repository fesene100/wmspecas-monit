import React, { useContext, useEffect, useRef, useState } from "react";
import { IPecaOcorrList, ISAOcorrList, servicesDatesOccurrency, servicesOccurrencyPerdate } from "../repository/contagem";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export interface IGraphOcorrencias {
  peca: number;
  sa: number;
  total: number;
  date: Date;
  dateString: string;
  days: number;
}

interface IOcorrencias {
  dataRequested?: UseQueryResult<IGraphOcorrencias[]>;
  dataRequestedList?: UseQueryResult<{ pecas: IPecaOcorrList[]; sa: ISAOcorrList[] }>;
  brushIndex: number;
  dataGraph: IGraphOcorrencias[];
  dataListPeca: IPecaOcorrList[];
  dataListSa: ISAOcorrList[];
  countTotal: number;
  countSa: number;
  countPeca: number;
  date?: string;
  changeDate: (date?: string) => void;
}

type Props = {
  children: JSX.Element;
};

export const OcorrenciasContext = React.createContext<IOcorrencias>({} as IOcorrencias);

export const OcorrenciasProvider = ({ children }: Props) => {
  const [brushIndex, setBrushIndex] = useState<number>(0);
  const [countTotal, setCountTotal] = useState<number>(0);
  const [countSa, setCountSa] = useState<number>(0);
  const [countPeca, setCountPeca] = useState<number>(0);
  const [dataGraph, setDataGraph] = useState<IGraphOcorrencias[]>([]);
  const [dataListSa, setDataListSa] = useState<ISAOcorrList[]>([]);
  const [dataListPeca, setDataListPeca] = useState<IPecaOcorrList[]>([]);
  const [date, setDate] = useState<string>();

  const changeDate = (isSelect?: string) => {
    setDate(isSelect);
  };

  const dataRequested = useQuery(["ocorrencias"], servicesDatesOccurrency, {
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    networkMode: "always",
  });

  const dataRequestedList = useQuery([date], servicesOccurrencyPerdate, {
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    networkMode: "always",
  });

  useEffect(() => {
    if (dataRequestedList && dataRequestedList.data && dataRequestedList.data.sa) {
      setDataListSa(dataRequestedList.data.sa);
    }

    if (dataRequestedList && dataRequestedList.data && dataRequestedList.data.pecas) {
      setDataListPeca(dataRequestedList.data.pecas);
    }
  }, [dataRequestedList]);

  useEffect(() => {
    if (!dataRequested.data) return;

    let newTotal = 0;
    let newSa = 0;
    let newPecas = 0;

    const newGraphdata: IGraphOcorrencias[] = dataRequested.data;

    newGraphdata.map((value) => {
      newTotal = newTotal + value.peca + value.sa;
      newSa += value.sa;
      newPecas += value.peca;
    });

    let newIndex = newGraphdata.length;
    let widthBar = 30;
    if (window.innerWidth / newGraphdata.length < widthBar) {
      while (window.innerWidth / newIndex < widthBar) {
        newIndex--;
      }
    } else {
      newIndex = 0;
    }

    setBrushIndex(newIndex);
    setDataGraph(newGraphdata);
    setCountPeca(newPecas);
    setCountSa(newSa);
    setCountTotal(newTotal);
  }, [dataRequested.data]);

  return (
    <OcorrenciasContext.Provider
      value={{
        changeDate,
        dataListPeca,
        dataListSa,
        dataRequestedList,
        date,
        brushIndex,
        countPeca,
        countSa,
        countTotal,
        dataRequested,
        dataGraph,
      }}
    >
      {children}
    </OcorrenciasContext.Provider>
  );
};

export const UseOcorrencias = (): IOcorrencias => {
  const context = useContext(OcorrenciasContext);

  return context;
};
