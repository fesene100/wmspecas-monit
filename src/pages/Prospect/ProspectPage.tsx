import axios from "axios";
import { Button, Column, Input, Row, Text } from "componentes-web-lojas-cem";
import { colors } from "estilos-lojas-cem";
import React from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";

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
    <Header title="Monitoramento Contagem Peças">
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
    </Header>
  );
};
