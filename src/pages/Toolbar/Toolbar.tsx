import { Column, Icon, Row } from "componentes-web-lojas-cem";
import { ReactNode } from "react";
import clsx from "clsx";
import { colors } from "estilos-lojas-cem";
import { LinkToolbar } from "../../components/LinkToolbar/LinkToolbar";
import { UseApp } from "../../hooks/AppProvider";
import { MdLogout, MdBarChart, MdOutlineMenuBook, MdOutlineAnalytics } from "react-icons/md";
import { Iconwmspecas } from "../../components/svg/Iconwmspecas";
import { Iconcem } from "../../components/svg/Iconcem";
import moment from "moment";

export interface InterfaceToolbar {
  children?: ReactNode;
  className?: string;
}

export const Toolbar = ({ children, className }: InterfaceToolbar): JSX.Element => {
  const { changeExpanded, expanded, dark } = UseApp();

  return (
    <Column
      vertical="space-between"
      horizontal="center"
      bg="20"
      onMouseEnter={() => changeExpanded(true)}
      onMouseLeave={() => changeExpanded(false)}
      className={clsx(
        expanded ? "w-[300px] max-tablet:w-[350px] max-mobile:w-[400px]" : "max-tablet:hidden",
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
          {expanded && <Iconwmspecas size={120} />}
          {!expanded && <Iconcem size={60} />}
        </Row>
      </div>
      <Column vertical="flex-start" horizontal="flex-start" height="80%" width="100%">
        {/*-> MONIT SA */}
        <LinkToolbar href={`/monitSA/${moment().subtract(1, "day").format("YYYY-MM-DD")}`} label="Serviços">
          <MdOutlineAnalytics size={25} color={dark ? colors.neutral.light.s20 : colors.neutral.dark.s20} />
        </LinkToolbar>
        {/*-> MONITORAMENTO */}
        <LinkToolbar href="/contagem" label="Contagem">
          <MdBarChart size={25} color={dark ? colors.neutral.light.s20 : colors.neutral.dark.s20} />
        </LinkToolbar>
        {/*-> PROSPECTO */}
        <LinkToolbar href="/searchProspect" label="Prospecto">
          <MdOutlineMenuBook size={25} color={dark ? colors.neutral.light.s20 : colors.neutral.dark.s20} />
        </LinkToolbar>

        {children}
      </Column>
      <Column vertical="flex-end" horizontal="flex-start" width="100%" height="20%">
        {/*IDEA CONFIGURAÇÕES */}
        <LinkToolbar href="/config" label="Configurações">
          <Icon color={dark ? colors.neutral.light.s20 : colors.neutral.dark.s20} size={30} kind="working"></Icon>
        </LinkToolbar>
        {/* IDEA -> LOGOUT */}
        {/* <LinkToolbar href="/" label="Logout">
          <MdLogout size={25} color={dark ? colors.neutral.light.s20 : colors.neutral.dark.s20} />
        </LinkToolbar> */}
      </Column>
    </Column>
  );
};
