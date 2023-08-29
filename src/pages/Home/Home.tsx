import { Row, Text } from "componentes-web-lojas-cem";
import { Header } from "../Header/Header";

export const Home = (): JSX.Element => {
  return (
    <Header title="Monitoramento WMSPEÇAS">
      <Row width="100%" height="100%" horizontal="flex-start" vertical="flex-start" className="p-5">
        <Text fontSize="lg">Bem vindo,</Text>
      </Row>
    </Header>
  );
};
