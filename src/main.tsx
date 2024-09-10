import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { BrowserRouter, Link } from "react-router-dom";

import { AppProvider } from "./hooks/AppProvider";
import { OverlayProvider, SideBarProvider, ThemeProvider, Toaster } from "@inovaetech/components-react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "always",
      onError: (error: any) => {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        }).fire({
          icon: "error",
          title: error.message,
        });
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <AppProvider>
          <ThemeProvider>
            <OverlayProvider>
              <SideBarProvider componentLink={Link}>
                <App />
              </SideBarProvider>
            </OverlayProvider>
          </ThemeProvider>
        </AppProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
