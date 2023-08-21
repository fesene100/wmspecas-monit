import clsx from "clsx";
import { Text, Row } from "componentes-web-lojas-cem";
import React from "react";
import { NavLink } from "react-router-dom";
import { UseApp } from "../../hooks/AppProvider";

export const LinkToolbar = ({ label, href, children }: { label: string; href: string; children?: React.ReactNode }) => {
  const { expanded } = UseApp();

  return (
    <NavLink
      to={href}
      className={({ isActive }) => {
        return clsx(
          "w-full h-10 pl-6 mb-4 cursor-pointer ",
          isActive && "bg-neutral-light-s00/60 dark:bg-neutral-dark-s00/60",
          "hover:bg-neutral-light-s30/40"
        );
      }}
    >
      <Row width="100%" height="100%" className="overflow-hidden">
        {children}
        {expanded && (
          <Text fontSize={"md"} asChild className={clsx("ml-3", "w-0")} weight="400" color="medium">
            <h1>{label}</h1>
          </Text>
        )}
      </Row>
    </NavLink>
  );
};
