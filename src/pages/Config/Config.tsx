import { ButtonSliderIot, Column, Icon, Row, Text } from "componentes-web-lojas-cem";
import React from "react";
import { UseApp } from "../../hooks/AppProvider";
import clsx from "clsx";
import { colors } from "estilos-lojas-cem";
import { Header } from "../Header/Header";
import Swal from "sweetalert2";
import { Toast } from "../../components/Toast/Toast";

export const Config = () => {
  const { dark, changeDark, mode, changeMode } = UseApp();
  return (
    <Header title="Configurações">
      <Column width="100%" horizontal="flex-start" vertical="flex-start" className="p-10">
        <Row className="py-4">
          <Text fontSize="xl" asChild>
            <h1>Modo escuro</h1>
          </Text>
          <ButtonSliderIot
            checked={dark}
            mode={dark ? "dark" : "light"}
            onClick={() => {
              localStorage.setItem("dark", String(!dark));
              changeDark(!dark);
            }}
            size={60}
            shadow={false}
            className={clsx("ml-10")}
            display={false}
            // color={dark ? "#22485f" : "#dedddd"}
            lineColorUnchecked={colors.secondary.s100}
            lineColorChecked={colors.info.s100}
            intensity={0.4}
          >
            {dark ? <Icon size={14} color="#3C1A7D" kind="night"></Icon> : <Icon size={14} color="#b8860b" kind="sun"></Icon>}
          </ButtonSliderIot>
        </Row>
        <Row>
          <Text fontSize="xl" asChild>
            <h1>Modo TI</h1>
          </Text>
          <ButtonSliderIot
            checked={mode}
            mode={dark ? "dark" : "light"}
            onClick={() => {
              if (mode) {
                localStorage.setItem("mode", String(!mode));
                changeMode(false);
              } else {
                Swal.fire({
                  title: "SENHA:",
                  width: "50%",
                  position: "center",
                  confirmButtonColor: colors.primary.s080,
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
            size={60}
            shadow={false}
            className={clsx("ml-10")}
            intensity={0.4}
          ></ButtonSliderIot>
        </Row>
      </Column>
    </Header>
  );
};
