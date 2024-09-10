import { HStack, Text } from "@inovaetech/components-react";
import { Header } from "../../components/Header";

export const Home = (): JSX.Element => {
  return (
    <main className="h-full w-full">
      <Header title="Monitoramento WMSPEÇAS"></Header>
      <HStack justifyContent="start" alignItems="start" className="h-[90%] w-full">
        <Text className="animate-pulse">Escolha um item no menu a esquerda, para navegar no app.</Text>
      </HStack>
    </main>
  );
};
