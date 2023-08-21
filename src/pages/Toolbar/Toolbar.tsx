import { ButtonSliderIot, Column, Icon, Logo, Row, Text } from "componentes-web-lojas-cem";
import { ReactNode, useEffect } from "react";
import clsx from "clsx";
import { colors } from "estilos-lojas-cem";
import { LinkToolbar } from "../../components/LinkToolbar/LinkToolbar";
import { UseApp } from "../../hooks/AppProvider";
import { MdListAlt, MdAccessAlarms, MdPages, MdLogout, MdMenu } from "react-icons/md";
import { Iconwmspecas } from "../../components/svg/Iconwmspecas";
import { Iconcem } from "../../components/svg/Iconcem";

export interface InterfaceToolbar {
  children?: ReactNode;
  className?: string;
}

export const Toolbar = ({ children, className }: InterfaceToolbar): JSX.Element => {
  const { changeExpanded, expanded, dark, changeDark } = UseApp();

  return (
    <Column
      vertical="space-between"
      horizontal="center"
      bg="20"
      onMouseEnter={() => changeExpanded(true)}
      onMouseLeave={() => changeExpanded(false)}
      className={clsx(
        expanded ? "w-[15%] max-tablet:w-1/2 max-mobile:w-9/12" : "w-[6%]",
        expanded ? "" : "max-tablet:hidden",
        "min-w-[5em] h-full delay-75 duration-100 overflow-hidden flex-nowrap",
        className
      )}
    >
      <div
        onDoubleClick={() => {
          location.reload();
        }}
      >
        <Row className="my-3 cursor-pointer h-[10%] min-h-[3em]">
          {expanded && <Iconwmspecas size={120} className="max-tablet:hidden" />}
          {!expanded && <Iconcem size={60} />}
        </Row>
      </div>
      <Column vertical="flex-start" horizontal="flex-start" height="80%" width="100%">
        {/*-> MONITORAMENTO */}
        <LinkToolbar href="/monitoramento" label="Monitoramento">
          <MdListAlt size={25} color={dark ? colors.neutral.light.s20 : colors.neutral.dark.s20} />
        </LinkToolbar>
        {/*-> PROSPECTO */}
        <LinkToolbar href="/searchProspect" label="Prospecto">
          <MdPages size={25} color={dark ? colors.neutral.light.s20 : colors.neutral.dark.s20} />
        </LinkToolbar>
        {children}
      </Column>
      <Column vertical="flex-end" horizontal="flex-start" width="100%" height="20%">
        {/*IDEA CONFIGURAÇÕES */}
        <LinkToolbar href="/config" label="Configurações">
          <Icon color={dark ? colors.neutral.light.s20 : colors.neutral.dark.s20} size={30} kind="working"></Icon>
        </LinkToolbar>
        {/* IDEA -> LOGOUT */}
        <LinkToolbar href="/" label="Logout">
          <MdLogout size={25} color={dark ? colors.neutral.light.s20 : colors.neutral.dark.s20} />
        </LinkToolbar>
      </Column>
    </Column>
  );
};
