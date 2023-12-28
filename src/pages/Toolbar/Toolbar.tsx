import { Column, Icon, Row } from "componentes-web-lojas-cem";
import { ReactNode } from "react";
import clsx from "clsx";
import { colors } from "estilos-lojas-cem";
import { LinkToolbar } from "../../components/LinkToolbar/LinkToolbar";
import { UseApp } from "../../hooks/AppProvider";
import { MdKeyboardArrowLeft, MdBarChart, MdOutlineMenuBook, MdOutlineAnalytics, MdOutlineWarning } from "react-icons/md";
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
    <>
      <div className="min-w-[5rem] h-full max-tablet:hidden bg-neutral-light-s10" />
      <Column
        vertical="space-between"
        horizontal="center"
        onMouseEnter={() => changeExpanded(true)}
        onMouseLeave={() => changeExpanded(false)}
        style={{ boxShadow: dark ? "2px 0 5px #101010" : "2px 0 5px #999" }}
        className={clsx(
          "absolute z-50 h-full overflow-hidden flex-nowrap bg-primary-s100 dark:bg-primary-s140 animate-fade print:hidden transition-all delay-0",
          expanded
            ? "w-[300px] max-mobile:w-[250px] max-tablet:top-0 duration-500"
            : "min-w-[5rem] w-20 max-tablet:w-0 max-tablet:min-w-0 tablet:duration-200",
          className
        )}
      >
        {expanded && (
          <Row className="absolute top-6 left-5 tablet:hidden cursor-pointer" onClick={() => changeExpanded(false)}>
            <MdKeyboardArrowLeft size={25} className="text-neutral-light-s20 hover:text-neutral-light-s00" />
          </Row>
        )}
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
          <LinkToolbar href={`/monitSA/${moment().format("YYYY-MM-DD")}`} label="Serviços">
            <MdOutlineAnalytics size={25} color={colors.neutral.light.s10} />
          </LinkToolbar>
          {/*-> MONITORAMENTO */}
          <LinkToolbar href="/contagem" label="Contagem">
            <MdBarChart size={25} color={colors.neutral.light.s10} />
          </LinkToolbar>
          {/*-> OCORRENCIAS */}
          <LinkToolbar href="/ocorrencias" label="Ocorrências">
            <MdOutlineWarning size={25} color={colors.neutral.light.s10} />
          </LinkToolbar>
          {/*-> PROSPECTO */}
          <LinkToolbar href="/searchProspect" label="Prospecto">
            <MdOutlineMenuBook size={25} color={colors.neutral.light.s10} />
          </LinkToolbar>

          {children}
        </Column>
        <Column vertical="flex-end" horizontal="flex-start" width="100%" height="20%">
          {/*IDEA CONFIGURAÇÕES */}
          <LinkToolbar href="/config" label="Configurações">
            <Icon color={colors.neutral.light.s10} size={30} kind="working"></Icon>
          </LinkToolbar>
          {/* IDEA -> LOGOUT */}
          {/* <LinkToolbar href="/" label="Logout">
          <MdLogout size={25} color={dark ? colors.neutral.light.s20 : colors.neutral.dark.s20} />
        </LinkToolbar> */}
        </Column>
      </Column>
    </>
  );
};
