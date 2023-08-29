import axios from "axios";
import { Button, Column, Input, Row, Text } from "componentes-web-lojas-cem";
import React from "react";
import { MdDownload, MdOpenInBrowser, MdSearch } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { serviceProduto } from "../../repository/contagem";
import { Toast } from "../../components/Toast/Toast";
import { PECA_ITEM } from "../../../../wmspecas/prisma/generated/clientPeca";
import clsx from "clsx";
import { maskLocal } from "../../useCases/maskLocal";
const API = import.meta.env.PROD ? import.meta.env.VITE_PROSPECT_API_PROD : import.meta.env.VITE_PROSPECT_API;

export const ProspectPage = (): JSX.Element => {
  const navigate = useNavigate();
  let { codigo } = useParams();
  const [codePeca, setCodePeca] = React.useState<string>(String(codigo));
  const [data, setData] = React.useState<PECA_ITEM[]>([]);

  const onClickSubmit = async () => {
    if (!codePeca) return;
    try {
      const consulta = await serviceProduto(Number(codePeca));

      if (consulta.length == 0) {
        setCodePeca("");
        Toast.fire({
          icon: "error",
          title: `Produto não encontrado !`,
        });
      }
      navigate(`/searchProspect/${String(codePeca)}`);
      setData(consulta);
      console.log(consulta);
      return;
    } catch (e) {
      alert(e);
    }
  };

  const navigateVisualizer = async () => {
    if (!codePeca) return;
    try {
      await axios.get(`${API}/${String(codePeca)}.pdf`);
      navigate(`/visualizerProspect/${String(codePeca)}`);
    } catch (e) {
      alert("Prospecto não encontrado !");
    }
  };

  const openProspect = async () => {
    if (!codePeca) return;
    try {
      await axios.get(`${API}/${String(codePeca)}.pdf`);
      window.open(`${API}/${String(codePeca)}.pdf`);
    } catch (e) {
      alert("Prospecto não encontrado !");
    }
  };

  //192.168.28.3:50000/wms_aplications/PECA_PROSPECTO/${String(codigo)}.pdf

  http: return (
    <Header title="Prospecto">
      <Column width="100%" height="100%" horizontal="center" vertical="flex-start" className="flex-nowrap">
        <Input
          label=" Código do produto:"
          propsInput={{
            value: codePeca,
            type: "number",
            onChange: (event: any) => {
              setCodePeca(event.target.value);
            },
          }}
        />
        <Button onClick={onClickSubmit} color="primary" className="mt-2">
          <Row>
            <MdSearch size={20} className="mr-1" />
            Pesquisar
          </Row>
        </Button>

        {data[0] && (
          <Button onClick={navigateVisualizer} color="primary" className="mt-2">
            <Row>
              <MdOpenInBrowser size={20} className="mr-1" />
              Visualizar Prospecto
            </Row>
          </Button>
        )}

        {data[0] && (
          <Button onClick={openProspect} color="primary" className="mt-2">
            <Row>
              <MdDownload size={20} className="mr-1" />
              Baixar Prospecto
            </Row>
          </Button>
        )}

        {data[0] && (
          <Text asChild fontSize="xl" spacingTop="md" spacingBottom="md">
            <h1>{data[0].ITE_COD_BASE_DESC}</h1>
          </Text>
        )}

        {data &&
          data.map((peca, index) => {
            return (
              <Row
                bg="00"
                width="70%"
                key={index}
                className={clsx(
                  "p-4 mb-2 hover:bg-neutral-light-s20 rounded-xl border border-neutral-light-s20 shadow-sm",
                  "max-mobile:w-[90%] dark:hover:bg-neutral-dark-s20 dark:border-neutral-dark-s20"
                )}
              >
                <Column width="85%">
                  <Text asChild fontSize="md">
                    <h1>{peca.ITE_DESCRICAO}</h1>
                  </Text>
                  <Row>
                    <Text asChild color="medium" fontSize="md" className="mr-2 max-mobile:text-sm">
                      <h1>LOCAL: </h1>
                    </Text>
                    <Text asChild color="medium" fontSize="md" className="max-mobile:text-sm">
                      <h1>{maskLocal(peca.ITE_LOCAL)}</h1>
                    </Text>
                  </Row>
                  <Row>
                    <Text asChild color="medium" fontSize="md" className="mr-2 max-mobile:text-sm">
                      <h1>QTDE:</h1>
                    </Text>
                    <Text asChild color="medium" fontSize="md" className="max-mobile:text-sm">
                      <h1>{peca.ITE_QTDE}</h1>
                    </Text>
                  </Row>
                </Column>
                <Text asChild fontSize="md" align="center" className="w-[15%] max-mobile:text-sm">
                  <h1>{peca.ITE_CODIGO}</h1>
                </Text>
              </Row>
            );
          })}

        <Row className="text-neutral-light-s10 dark:text-neutral-dark-s10" children="."></Row>
      </Column>
    </Header>
  );
};
