import { useState } from "react";
import { clsx } from "clsx";
import { Column, Row, Text } from "componentes-web-lojas-cem";
import { Outlet, Route, Routes } from "react-router-dom";
import { UseApp } from "./hooks/AppProvider";
import { Toolbar } from "./pages/Toolbar/Toolbar";
import { NotFound } from "./pages/NotFound/NotFound";
import { ProspectPage } from "./pages/Prospect/ProspectPage";
import { Monitpage } from "./pages/Monit/MonitPage";
import { MonitProvider } from "./hooks/MonitProvider";
import { VisualizerProspect } from "./pages/Prospect/VisualizerProspect";

function App() {
  const { dark, expanded } = UseApp();

  return (
    <Row width="100%" height="100vh" className={clsx(dark && "ds-dark dark", " flex-nowrap")}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Toolbar />
              <Column
                vertical="flex-start"
                horizontal="center"
                className={clsx(
                  expanded ? "w-11/12" : "w-full",
                  "delay-75 duration-100 h-full bg-neutral-light-s10 dark:bg-neutral-dark-s10"
                )}
              >
                <Outlet />
              </Column>
            </>
          }
        >
          <Route
            path="/monitoramento"
            element={
              <MonitProvider>
                <Monitpage />
              </MonitProvider>
            }
          />

          <Route path="/searchProspect" element={<ProspectPage />} />
        </Route>
        <Route path="/visualizerProspect/:codigo?" element={<VisualizerProspect />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Row>
  );
}

export default App;
