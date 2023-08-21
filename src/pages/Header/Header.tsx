import { Column, Row, Text } from "componentes-web-lojas-cem";
import React from "react";
import { UseApp } from "../../hooks/AppProvider";
import clsx from "clsx";
import { MdMenu } from "react-icons/md";

export const Header = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const { changeExpanded, expanded } = UseApp();
  return (
    <Column bg="10" width="100%" height="100%" vertical="flex-start" className="overflow-y-hidden flex-nowrap">
      <Row bg="00" width="100%" height="8%" horizontal="center" vertical="center" className="min-h-[50px] flex-nowrap relative">
        <MdMenu
          size={25}
          onClick={() => {
            changeExpanded(!expanded);
          }}
          className={clsx(
            "text-neutral-dark-s20 hover:text-neutral-dark-s00 dark:text-neutral-light-s20 dark:hover:text-neutral-light-s00  cursor-pointer ml-3 absolute tablet:hidden left-0"
          )}
        />
        <Text fontSize="2xl" weight="600" align="center" asChild className="max-mobile:text-base">
          <h1>{title}</h1>
        </Text>
      </Row>
      <Column
        width="100%"
        height="92%"
        vertical="space-between"
        horizontal="center"
        className={"overflow-y-scroll flex-nowrap overflow-x-hidden relative"}
      >
        <Row vertical="flex-start" horizontal="center" className="absolute bottom-0 p-2" width="100%" height="100%">
          {children}
        </Row>
      </Column>
    </Column>
  );
};
