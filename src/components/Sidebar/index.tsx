import { useEffect } from "react";
import { HStack, Logo, Pattern, SideBar, Switch, Text, useSideBar, useTheme, VStack } from "@inovaetech/components-react";
import { Outlet, useLocation } from "react-router-dom";
import { UseApp } from "../../hooks/AppProvider";
import Swal from "sweetalert2";
import colors from "@inovaetech/components-react/colors";
import { Toast } from "../Toast/Toast";
import moment from "moment";

export const SideBarClient = (): JSX.Element => {
  const { mode, changeMode } = UseApp();
  const { changeTheme, isDark } = useTheme();
  const location = useLocation();
  const { changePath } = useSideBar();

  useEffect(() => {
    changePath(location.pathname);
  }, [location.pathname]);

  return (
    <Pattern
      sideBar={
        <SideBar logo={<Logo logo="1" size={50} />}>
          <SideBar.Content>
            <SideBar.Item label="Home" href="/" icon={"PiHouse"} activeIcon={"PiHouseFill"} />
            <SideBar.Item
              label="Serviços"
              href={`/monitSA/${moment().format("YYYY-MM-DD")}`}
              icon={"PiCallBell"}
              activeIcon={"PiCallBellFill"}
            />
            <SideBar.Item label="Contagem" href="/contagem" icon={"PiChartBar"} activeIcon={"PiChartBarFill"} />
            <SideBar.Item label="Ocorrências" href="/ocorrencias" icon={"PiWarning"} activeIcon={"PiWarningFill"} />
            <SideBar.Item label="Pedidos" href="/pedidos" icon={"PiShoppingBagOpen"} activeIcon={"PiShoppingBagOpenFill"} />
            <SideBar.Item label="Prospecto" href="/searchProspect" icon={"PiBookOpenText"} activeIcon={"PiBookOpenTextFill"} />
          </SideBar.Content>
          <SideBar.Footer>
            <SideBar.Avatar user={mode ? "Programador" : "Operador"}>
              <VStack justifyContent="start" alignItems="start" className="w-full h-full gap-2">
                <HStack justifyContent="between" alignItems="center" className="w-full">
                  <Text size="md" color="default">
                    Modo escuro
                  </Text>
                  <Switch
                    onChange={() => {
                      changeTheme();
                    }}
                    isSelected={isDark}
                    size={"sm"}
                  />
                </HStack>
                <HStack justifyContent="between" className="w-full">
                  <Text size="md" color="default">
                    Modo DEV
                  </Text>
                  <Switch
                    isSelected={mode}
                    size={"sm"}
                    onChange={() => {
                      if (mode) {
                        localStorage.setItem("mode", String(!mode));
                        changeMode(false);
                      } else {
                        Swal.fire({
                          title: "SENHA:",
                          width: "50%",
                          position: "center",
                          confirmButtonColor: colors.primary[400],
                          confirmButtonText: "CONFIRMAR",
                          input: "password",
                          inputAttributes: {
                            placeHolder: "Digite a senha",
                            textAlign: "center",
                          },
                          showCloseButton: true,
                          showConfirmButton: true,
                          allowOutsideClick: false,
                        }).then(async (result) => {
                          if (result.isConfirmed) {
                            if (result.value == "fDDr!5EL") {
                              localStorage.setItem("mode", String(!mode));
                              changeMode(true);
                              Toast.fire({
                                icon: "success",
                                title: `Modo alterado !`,
                              });
                            } else {
                              Toast.fire({
                                icon: "error",
                                title: `Senha incorreta !`,
                              });
                            }
                          }
                        });
                      }
                    }}
                  />
                </HStack>
              </VStack>
            </SideBar.Avatar>
          </SideBar.Footer>
        </SideBar>
      }
    >
      <Outlet />
    </Pattern>
  );
};
