import { Graph } from "../../components/Graph/Graph";
import { UseMonit, optionsRuas } from "../../hooks/MonitProvider";
import { Card } from "../../components/Card/Card";
import { ListMonit } from "./ListMonit";
import { ListOcor } from "./ListOcor";
import { Header } from "../../components/Header";
import { Button, HStack, SelectField, SelectMultiple } from "@inovaetech/components-react";
import { IOptions } from "../../interfaces/IOptions";

export const Monitpage = (): JSX.Element => {
  const { exec, fim, lib, ocor, grupos, changeSelectGrupos, changeSelectRua, selectGrupos, selectRua, servicosGrafico } =
    UseMonit();

  return (
    <main className="h-full w-full">
      <Header title="Monitoramento Contagem Peças"> </Header>
      <HStack className="w-full h-[100px] mb-2 mt-4" justifyContent="around">
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
      </HStack>

      <HStack className="w-full mb-4 content-around flex-nowrap max-mobile:!flex-col max-mobile:!gap-2" justifyContent="around">
        <SelectMultiple
          onChange={(value) => {
            const newSelected: IOptions[] = [];
            value.map((val) => {
              const finded = grupos.find((grupos) => grupos.value == val);
              if (finded) {
                newSelected.push(finded);
              }
            });
            // const finded = optionsRuas.find((a) => a.value == value);
            changeSelectGrupos(newSelected);
          }}
          selectedKeys={selectGrupos.map((val) => String(val.value))}
          placeholder={"GRUPO"}
          className="w-48 max-mobile:!w-full"
          elevated
        >
          {grupos.map((val) => (
            <SelectMultiple.Option key={val.value}>{val.label}</SelectMultiple.Option>
          ))}
        </SelectMultiple>
        <SelectField
          onSelectionChange={(value) => {
            const finded = optionsRuas.find((a) => a.value == value);
            changeSelectRua(finded);
          }}
          selectedKey={selectRua?.value}
          placeholder={"RUAS"}
          className="w-48 max-mobile:!w-full"
          elevated
        >
          {optionsRuas.map((val) => (
            <SelectField.Option key={val.value}>{val.label}</SelectField.Option>
          ))}
        </SelectField>
        <Button
          onPress={() => {
            changeSelectGrupos([]);
            changeSelectRua(undefined);
          }}
          color="error"
          variant="outline"
          className="font-bold max-mobile:!w-full"
          leftIcon="PiFunnelX"
        >
          Limpar
        </Button>

        <Button
          isDisabled={servicosGrafico?.isFetching ? true : false}
          onPress={() => {
            servicosGrafico?.refetch();
          }}
          className="font-bold max-mobile:!w-full"
          leftIcon="MdSearch"
          color="primary"
        >
          Pesquisar
        </Button>
      </HStack>

      <Graph />
      <HStack className="h-[20px] w-[200px]" />
      <ListMonit />
      <HStack className="h-[20px] w-[200px]" />
      <ListOcor />
      <HStack className="h-[100px] w-[200px]" />
    </main>
  );
};
