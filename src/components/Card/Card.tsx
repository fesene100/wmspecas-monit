import { Icon, InterfaceIcon, Row } from "componentes-web-lojas-cem";
import { HStack, Text, useTheme, VStack } from "@inovaetech/components-react";

export interface ICard {
  icon?: InterfaceIcon;
  quantidade?: string | number;
  name?: string;
  onClick?: () => void;
}

export const Card = ({ icon = { size: 20, kind: "error" }, name, quantidade, onClick }: ICard) => {
  const { isDark } = useTheme();
  return (
    <HStack
      bg="surface"
      justifyContent="center"
      alignItems="center"
      className={"min-w-[90px] h-[70px] w-1/6 max-mobile:!w-[10%] cursor-pointer p-2 px-4 rounded-lg shadow-md max-tablet:!p-0"}
      onClick={onClick}
    >
      <Row height={"100%"} width={"30%"} vertical="center" horizontal="center" className="max-tablet:!hidden">
        <Icon
          style={{ marginTop: 5, cursor: "pointer" }}
          size={icon.size}
          color={isDark ? "#dedede" : "#323232"}
          kind={icon?.kind}
        ></Icon>
      </Row>
      <VStack className="w-[70%] items-end max-tablet:!items-center max-tablet:!w-full">
        <Text size="lg" color="default" weight="bold" className="text-center">
          {quantidade}
        </Text>
        <Text size="lg" color="contentSecondary" weight="normal" className="max-mobile:!text-sm">
          {name}
        </Text>
      </VStack>
    </HStack>
  );
};
