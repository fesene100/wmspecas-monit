import { Column, Row, Text } from "componentes-web-lojas-cem";
import React from "react";
import { UseApp } from "../../hooks/AppProvider";
import clsx from "clsx";
import { MdMenu } from "react-icons/md";

export const Header = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const { changeExpanded, expanded } = UseApp();
  return (
    <Column bg="10" width="100%" height="100%" vertical="flex-start" className="overflow-y-hidden flex-nowrap">
      <Row
        bg="10"
        width="100%"
        height="8%"
        horizontal="center"
        vertical="center"
        className="min-h-[50px] flex-nowrap relative max-tablet:bg-primary-s120 dark:max-tablet:bg-neutral-dark-s00"
      >
        <MdMenu
          size={25}
          onClick={() => {
            changeExpanded(!expanded);
          }}
          className={clsx(
            "text-neutral-dark-s20 hover:text-neutral-dark-s00",
            "dark:text-neutral-light-s20 dark:hover:text-neutral-light-s00",
            "tablet:hidden max-tablet:text-neutral-light-s10 max-tablet:hover:text-neutral-light-s00",
            "cursor-pointer ml-3 absolute  left-0"
          )}
        />
        <Text
          fontSize="2xl"
          weight="600"
          align="center"
          asChild
          className="max-mobile:text-base w-4/5 max-tablet:text-lg max-tablet:text-neutral-light-s10 animate-fade-down animate-duration-100"
        >
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
        <Row
          vertical="flex-start"
          horizontal="center"
          className="absolute bottom-0 p-2 animate-fade-right"
          width="100%"
          height="100%"
        >
          {children}
        </Row>
      </Column>
    </Column>
  );
};
