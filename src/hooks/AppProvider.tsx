import React from "react";

interface IApp {
  mode: boolean;
  changeMode: (value: boolean) => void;
}

type Props = {
  children: JSX.Element;
};

export const AppContext = React.createContext<IApp>({} as IApp);

export const AppProvider = ({ children }: Props) => {
  const [mode, setMode] = React.useState<boolean>(localStorage.getItem("mode") == "true" ? true : false);

  const changeMode = (isSelect: boolean) => {
    setMode(isSelect);
  };

  return (
    <AppContext.Provider
      value={{
        mode,
        changeMode,
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
