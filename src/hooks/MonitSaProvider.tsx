import React, { useContext, useEffect, useState } from "react";
import { serviceMonitSa, servicesData } from "../repository/contagem";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IServicesMonit, IServicesSaMonit } from "../../../wmspecas/src/models/monitoramentoService";
import { useParams } from "react-router-dom";
import moment from "moment";

interface IGraphSa {
  service: number;
  protocolo: number;
  status: string;
  statusNumber: number;
  departament: string;
  departamentNumber: number;
  countPending: number;
  countExecuting: number;
  countFinished: number;
  countOcurrency: number;
  countTotal: number;
}

interface IMonitSa {
  dataRequested?: UseQueryResult<IServicesMonit[]>;
  highlightedDates: Date[];
  dataList: IServicesSaMonit[];
  brushIndex: number;
  dataGraph: IGraphSa[];
  countExec: number;
  countOcor: number;
  countLib: number;
  countFim: number;
  service: number | undefined;
  changeService: (date: number) => void;
  date: string;
  changeDate: (date: string) => void;
}

type Props = {
  children: JSX.Element;
};

export const MonitSaContext = React.createContext<IMonitSa>({} as IMonitSa);

export const MonitSaProvider = ({ children }: Props) => {
  const { dateparams } = useParams();

  const [brushIndex, setBrushIndex] = useState<number>(0);
  const [countExec, setCountExec] = useState<number>(0);
  const [countOcor, setCountOcor] = useState<number>(0);
  const [countLib, setCountLib] = useState<number>(0);
  const [countFim, setCountFim] = useState<number>(0);
  const [dataGraph, setDataGraph] = useState<IGraphSa[]>([]);
  const [service, setService] = useState<number>();
  const [date, setDate] = useState<string>(String(dateparams));
  const [dataList, setDataList] = useState<IServicesSaMonit[]>([]);
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);

  const changeDate = (isSelect: string) => {
    setDate(isSelect);
  };

  const changeService = (isSelect: number) => {
    setService(isSelect);
  };

  const dataRequested = useQuery(
    ["monitoramentoSa"],
    async () => {
      return serviceMonitSa(date);
    },
    {
      refetchInterval: 60000,
      refetchIntervalInBackground: true,
      networkMode: "always",
    }
  );

  const services = useQuery(
    ["monitoramentoSaDatas"],
    async () => {
      return servicesData();
    },
    {
      refetchInterval: 2400000,
      refetchIntervalInBackground: true,
      networkMode: "always",
    }
  );

  useEffect(() => {
    if (services && services.data) {
      setHighlightedDates(
        services.data.map((e) => {
          return moment(e.SER_DATA).add(3, "hours").toDate();
        })
      );
    }
  }, [services.data]);

  useEffect(() => {
    let newExec = 0;
    let newOcor = 0;
    let newLib = 0;
    let newFim = 0;

    dataRequested &&
      dataRequested.data &&
      dataRequested.data.map((value) => {
        value.sa.map((sa) => {
          if (sa.status == 1 || sa.status == 2 || sa.status == 3) {
            newLib += 1;
          }
          if (sa.status == 4) {
            newExec += 1;
          }
          if (sa.status == 5 || sa.status == 8 || sa.status == 9 || sa.status == 10) {
            newFim += 1;
          }
          if (sa.status == 6 || sa.status == 7) {
            newOcor += 1;
          }
        });
      });

    const newGraphdata: IGraphSa[] = [];

    dataRequested &&
      dataRequested.data &&
      dataRequested.data.map((value) => {
        newGraphdata.push({
          service: value.service,
          protocolo: value.protocolo,
          departamentNumber: value.department,
          statusNumber: value.status,
          departament: value.department == 1 ? ` pelo administrativo` : ` pelo operacional`,
          status: value.status == 1 ? "Criado " : value.status == 2 ? "Recebido" : value.status == 3 ? "Finalizado" : "Cancelado",
          countExecuting: 0,
          countFinished: 0,
          countOcurrency: 0,
          countPending: 0,
          countTotal: 0,
        });
      });

    dataRequested &&
      dataRequested.data &&
      dataRequested.data.map((value) => {
        value.sa.map((sa) => {
          const finded = newGraphdata.find((newvalue) => newvalue.service == value.service);

          if (!finded) return;

          if (sa.status == 1 || sa.status == 2 || sa.status == 3) {
            finded.countPending = finded.countPending + 1;
          }
          if (sa.status == 4) {
            finded.countExecuting = finded.countExecuting + 1;
          }
          if (sa.status >= 5) {
            finded.countFinished = finded.countFinished + 1;
          }
          if (sa.status >= 6) {
            finded.countOcurrency = finded.countOcurrency + 1;
          }
          finded.countTotal = finded.countTotal + 1;
        });
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
    setCountExec(newExec);
    setCountOcor(newOcor);
    setCountLib(newLib);
    setCountFim(newFim);
  }, [dataRequested.data]);

  useEffect(() => {
    if (!service) return;
    let newTableList: IServicesSaMonit[] = [];

    dataRequested.data &&
      dataRequested.data.map((value) => {
        if (value.protocolo == service) {
          newTableList = value.sa;
        }
      });

    setDataList(newTableList);
  }, [service]);

  useEffect(() => {
    dataRequested.refetch();
  }, [date]);

  return (
    <MonitSaContext.Provider
      value={{
        highlightedDates,
        dataList,
        changeService,
        service,
        changeDate,
        date,
        brushIndex,
        dataGraph,
        countExec,
        countFim,
        countLib,
        countOcor,
        dataRequested,
      }}
    >
      {children}
    </MonitSaContext.Provider>
  );
};

export const UseMonitSa = (): IMonitSa => {
  const context = useContext(MonitSaContext);

  return context;
};
