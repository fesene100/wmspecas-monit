import { Route, Routes } from "react-router-dom";
import { ProspectPage } from "./pages/Prospect/ProspectPage";
import { Monitpage } from "./pages/Monit/MonitPage";
import { MonitProvider } from "./hooks/MonitProvider";
import { VisualizerProspect } from "./pages/Prospect/VisualizerProspect";
import { Home } from "./pages/Home/Home";
import { MonitSA } from "./pages/MonitSA/MonitSA";
import { MonitSaProvider } from "./hooks/MonitSaProvider";
import { Ocorrencias } from "./pages/Ocorrencias/Ocorrencias";
import { OcorrenciasProvider } from "./hooks/OcorrenciasProvider";
import { PageNotFound } from "@inovaetech/components-react";
import { SideBarClient } from "./components/Sidebar";
import { Pedidos } from "./pages/Pedidos/Pedidos";
import { PedidosProvider } from "./hooks/PedidosProvider";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SideBarClient />}>
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
        <Route
          path="/ocorrencias/"
          element={
            <OcorrenciasProvider>
              <Ocorrencias />
            </OcorrenciasProvider>
          }
        />
        <Route
          path="/pedidos/"
          element={
            <PedidosProvider>
              <Pedidos />
            </PedidosProvider>
          }
        />
      </Route>
      <Route path="/visualizerProspect/:codigo?" element={<VisualizerProspect />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
