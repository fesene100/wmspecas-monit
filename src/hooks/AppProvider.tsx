import React from "react";

interface IApp {
  expanded: boolean;
  changeExpanded: (value: boolean) => void;
  dark: boolean;
  changeDark: (value: boolean) => void;
  mode: boolean;
  changeMode: (value: boolean) => void;
}

type Props = {
  children: JSX.Element;
};

export const AppContext = React.createContext<IApp>({} as IApp);

export const AppProvider = ({ children }: Props) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [dark, setDark] = React.useState<boolean>(localStorage.getItem("dark") == "true" ? true : false);
  const [mode, setMode] = React.useState<boolean>(localStorage.getItem("mode") == "true" ? true : false);

  const changeExpanded = (isSelect: boolean) => {
    setExpanded(isSelect);
  };

  const changeDark = (isSelect: boolean) => {
    setDark(isSelect);
  };

  const changeMode = (isSelect: boolean) => {
    setMode(isSelect);
  };

  return (
    <AppContext.Provider
      value={{
        mode,
        changeMode,
        changeDark,
        dark,
        changeExpanded,
        expanded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const UseApp = (): IApp => {
  const context = React.useContext(AppContext);

  return context;
};
