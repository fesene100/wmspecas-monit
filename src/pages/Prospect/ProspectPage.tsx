import axios from "axios";
import { Column, Row } from "componentes-web-lojas-cem";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serviceProduto } from "../../repository/contagem";
import { Toast } from "../../components/Toast/Toast";
import { PECA_ITEM } from "../../../../wmspecas/prisma/generated/clientPeca";
import clsx from "clsx";
import { maskLocal } from "../../useCases/maskLocal";
import { Header } from "../../components/Header";
import { Button, Card, Text, TextField } from "@inovaetech/components-react";
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

  return (
    <main className="h-full w-full">
      <Header title="Prospecto"> </Header>
      <Column width="100%" horizontal="center" vertical="flex-start" className="flex-nowrap mt-4">
        <TextField className="w-72" size="lg" label=" Código do produto:" value={codePeca} type="number" onChange={setCodePeca} />
        <Button leftIcon="MdSearch" onPress={onClickSubmit} color="primary" className="mt-2">
          Pesquisar
        </Button>

        {data[0] && (
          <Button leftIcon="MdOpenInBrowser" onPress={navigateVisualizer} color="primary" className="mt-2">
            Visualizar Prospecto
          </Button>
        )}

        {data[0] && (
          <Button leftIcon="MdDownload" onPress={openProspect} color="primary" className="mt-2">
            Baixar Prospecto
          </Button>
        )}

        {data[0] && (
          <Text size="xl" color="default" className="my-4">
            {data[0].ITE_COD_BASE_DESC}
          </Text>
        )}

        {data &&
          data.map((peca, index) => {
            return (
              <Card
                elevated
                animation
                key={index}
                className={clsx("w-[70%] p-4 mb-2 flex-row items-center ", "max-mobile:!w-[90%]")}
              >
                <Column width="85%">
                  <Text size="md" color="default" weight="bold">
                    {peca.ITE_DESCRICAO}
                  </Text>
                  <Row>
                    <Text color="contentPrimary" size="md" className="mr-2 max-mobile:!text-sm">
                      LOCAL:
                    </Text>
                    <Text color="contentPrimary" size="md" className="max-mobile:!text-sm">
                      {maskLocal(peca.ITE_LOCAL)}
                    </Text>
                  </Row>
                  <Row>
                    <Text color="contentPrimary" size="md" className="mr-2 max-mobile:!text-sm">
                      QTDE:
                    </Text>
                    <Text color="contentPrimary" size="md" className="max-mobile:!text-sm">
                      {peca.ITE_QTDE}
                    </Text>
                  </Row>
                </Column>
                <Text size="lg" className="w-[15%] max-mobile:!text-sm text-center">
                  {peca.ITE_CODIGO}
                </Text>
              </Card>
            );
          })}

        <Row height="100px" width="10px" className="text-neutral-light-s10 dark:text-neutral-dark-s10" children="."></Row>
      </Column>
    </main>
  );
};
