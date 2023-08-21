import { Button, Column, Row, Text } from "componentes-web-lojas-cem";
import { Graph } from "../../components/Graph/Graph";
import { UseMonit, optionsRuas } from "../../hooks/MonitProvider";
import { Card } from "../../components/Card/Card";
import { SelectComponent } from "../../components/SelectComponent/SelectComponent";
import { MdSearch } from "react-icons/md";
import { ListMonit } from "./ListMonit";
import { ListOcor } from "./ListOcor";

export const Monitpage = (): JSX.Element => {
  const { exec, fim, lib, ocor, grupos, changeSelectGrupos, changeSelectRua, selectGrupos, selectRua, servicosGrafico } =
    UseMonit();

  return (
    <Column bg="10" width="100%" height="100%" className="overflow-y-hidden">
      <Column bg="00" width="100%" height="8%" horizontal="center" vertical="center">
        <Text fontSize="2xl" weight="600" align="center" asChild>
          <h1>Monitoramento Contagem Peças</h1>
        </Text>
      </Column>
      <Column
        width="100%"
        height="92%"
        vertical="space-between"
        horizontal="center"
        className={"overflow-y-scroll flex-nowrap overflow-x-hidden relative"}
      >
        <Row vertical="flex-start" horizontal="center" className="absolute bottom-0 p-2" width="100%" height="100%">
          <Row height="100px" width="95%" className="mb-4" horizontal="space-around">
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

          <Row height="50px" width="95%" className="mb-4" horizontal="space-around">
            <SelectComponent
              isMulti={true}
              isClearable={false}
              onChange={(value) => {
                changeSelectGrupos(value);
              }}
              value={selectGrupos}
              options={grupos}
              className={"selectGrupo"}
              placeholder={"GRUPO"}
            />
            <SelectComponent
              onChange={(value) => {
                changeSelectRua(value);
              }}
              isClearable={true}
              value={selectRua}
              options={optionsRuas}
              className={"selectRua"}
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
        </Row>
      </Column>
    </Column>
  );
};
