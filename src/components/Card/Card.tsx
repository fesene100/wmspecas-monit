import React from "react";
import { Column, Icon, InterfaceIcon, Row, Text } from "componentes-web-lojas-cem";
import { UseApp } from "../../hooks/AppProvider";

export interface ICard {
  icon?: InterfaceIcon;
  quantidade?: string | number;
  name?: string;
  onClick?: () => void;
}

export const Card = ({ icon = { size: 20, kind: "error" }, name, quantidade, onClick }: ICard) => {
  const { dark } = UseApp();
  return (
    <Row
      bg="00"
      width={"15%"}
      height="70px"
      vertical="center"
      className={"min-w-[100px] cursor-pointer p-2 px-4 rounded-lg shadow-md"}
      onClick={onClick}
    >
      <Row height={"100%"} width={"30%"} vertical="center" horizontal="center">
        <Icon
          style={{ marginTop: 5, cursor: "pointer" }}
          size={icon.size}
          color={dark ? "#dedede" : "#323232"}
          kind={icon?.kind}
        ></Icon>
      </Row>
      <Column width="70%" vertical="center" horizontal="flex-end">
        <Text asChild fontSize="lg" weight="900">
          <h1>{quantidade}</h1>
        </Text>
        <Text asChild fontSize="md" color="medium" weight="600">
          <h1>{name}</h1>
        </Text>
      </Column>
    </Row>
  );
};
