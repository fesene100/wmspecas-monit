import axios from "axios";
import { Button, Column, Input, Row, Text } from "componentes-web-lojas-cem";
import { colors } from "estilos-lojas-cem";
import React from "react";
import { ReactNode } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.PROD ? import.meta.env.VITE_PROSPECT_API_PROD : import.meta.env.VITE_PROSPECT_API;

export const ProspectPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [codePeca, setCodePeca] = React.useState<string>("");

  const onClickSubmit = async () => {
    if (!codePeca) return;
    try {
      await axios.get(`${API}/${String(codePeca)}.pdf`);
      navigate(`/visualizerProspect/${String(codePeca)}`);
    } catch (e) {
      setCodePeca("");
      alert("Produto não encontrado !");
    }
  };

  return (
    <Column bg="10" width="100%" height="100%" className="overflow-y-hidden">
      <Column width="100%" height="8%" horizontal="center" vertical="center">
        <Text fontSize="2xl" weight="600" align="center" asChild>
          <h1>Prospecto</h1>
        </Text>
      </Column>
      <Column
        width="100%"
        height="92%"
        vertical="space-between"
        horizontal="center"
        className={"overflow-y-scroll flex-nowrap overflow-x-hidden p-2 relative"}
      >
        <Row vertical="flex-start" horizontal="center" className="absolute bottom-0 p-2" width="100%" height="100%">
          <div className="content-search">
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
          </div>
        </Row>
      </Column>
    </Column>
  );
};
