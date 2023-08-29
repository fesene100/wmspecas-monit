import { Button, Column, Row, Text } from "componentes-web-lojas-cem";
import { Graph } from "../../components/Graph/Graph";
import { UseMonit, optionsRuas } from "../../hooks/MonitProvider";
import { Card } from "../../components/Card/Card";
import { SelectComponent } from "../../components/SelectComponent/SelectComponent";
import { MdSearch } from "react-icons/md";
import { ListMonit } from "./ListMonit";
import { ListOcor } from "./ListOcor";
import { Header } from "../Header/Header";

export const Monitpage = (): JSX.Element => {
  const { exec, fim, lib, ocor, grupos, changeSelectGrupos, changeSelectRua, selectGrupos, selectRua, servicosGrafico } =
    UseMonit();

  return (
    <Header title="Monitoramento Contagem Peças">
      <Row height="100px" width="95%" className="mb-4 flex-nowrap" horizontal="space-around">
        <Card
          icon={{ kind: "working", size: 35 }}
          name="Executando"
          quantidade={exec}
          onClick={() => {
            changeSelectRua({ label: "Executando", value: "1" });
          }}
        />
        <Card
          icon={{ kind: "warning", size: 35 }}
          name="Ocorrências"
          quantidade={ocor}
          onClick={() => {
            changeSelectRua({ label: "Ocorrências", value: "2" });
          }}
        />
        <Card
          icon={{ kind: "ok", size: 30 }}
          name="Liberados"
          quantidade={lib}
          onClick={() => {
            changeSelectRua({ label: "Liberados", value: "3" });
          }}
        />
        <Card
          icon={{ kind: "check", size: 30 }}
          name="Finalizados"
          quantidade={fim}
          onClick={() => {
            changeSelectRua({ label: "Finalizados", value: "4" });
          }}
        />
      </Row>

      <Row width="95%" className="mb-4 content-around" horizontal="space-around">
        <SelectComponent
          isMulti={true}
          isClearable={false}
          onChange={(value) => {
            changeSelectGrupos(value);
          }}
          value={selectGrupos}
          options={grupos}
          className={"selectGrupo pb-2"}
          placeholder={"GRUPO"}
        />
        <SelectComponent
          onChange={(value) => {
            changeSelectRua(value);
          }}
          isClearable={true}
          value={selectRua}
          options={optionsRuas}
          className={"selectRua pb-2"}
          placeholder={"RUAS"}
        />
        <Button
          onClick={() => {
            changeSelectGrupos([]);
            changeSelectRua(undefined);
          }}
          color="error"
          kind="ghost"
          size="small"
          className="font-bold"
        >
          LIMPAR
        </Button>
        <Button
          disabled={servicosGrafico?.isFetching ? true : false}
          onClick={() => {
            servicosGrafico?.refetch();
          }}
          className="font-bold"
        >
          <Row>
            <MdSearch size={20} className="mr-1" />
            Pesquisar
          </Row>
        </Button>
      </Row>

      <Graph />
      <Row height="20px" width="200px" />
      <ListMonit />
      <Row height="20px" width="200px" />
      <ListOcor />
      <Row height="100px" width="200px" />
    </Header>
  );
};
