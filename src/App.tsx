import { clsx } from "clsx";
import { Column, Row } from "componentes-web-lojas-cem";
import { Outlet, Route, Routes } from "react-router-dom";
import { UseApp } from "./hooks/AppProvider";
import { Toolbar } from "./pages/Toolbar/Toolbar";
import { NotFound } from "./pages/NotFound/NotFound";
import { ProspectPage } from "./pages/Prospect/ProspectPage";
import { Monitpage } from "./pages/Monit/MonitPage";
import { MonitProvider } from "./hooks/MonitProvider";
import { VisualizerProspect } from "./pages/Prospect/VisualizerProspect";
import { Config } from "./pages/Config/Config";
import { Home } from "./pages/Home/Home";
import { MonitSA } from "./pages/MonitSA/MonitSA";
import { MonitSaProvider } from "./hooks/MonitSaProvider";

function App() {
  const { dark } = UseApp();

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
                width="100%"
                className={clsx("delay-75 duration-100 h-full bg-neutral-light-s10 dark:bg-neutral-dark-s10")}
              >
                <Outlet />
              </Column>
            </>
          }
        >
          <Route path="/" element={<Home />} />
          <Route
            path="/contagem/:dep?"
            element={
              <MonitProvider>
                <Monitpage />
              </MonitProvider>
            }
          />
          <Route path="/searchProspect/:codigo?" element={<ProspectPage />} />
          <Route
            path="/monitSA/:dateparams?"
            element={
              <MonitSaProvider>
                <MonitSA />
              </MonitSaProvider>
            }
          />

          <Route path="/config" element={<Config />} />
        </Route>
        <Route path="/visualizerProspect/:codigo?" element={<VisualizerProspect />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Row>
  );
}

export default App;
