import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { UseApp } from "../../hooks/AppProvider";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { Column, Row, Text } from "componentes-web-lojas-cem";
import { UseMonit } from "../../hooks/MonitProvider";
import { EmptyDataIcon } from "../../components/svg/EmptyDataIcon/EmptyDataIcon";

export const ListMonit: React.FC = () => {
  const { dark } = UseApp();
  const { list, getDescPeca } = UseMonit();
  const gridRef = useRef<any>();

  const [columnDefs] = useState<ColDef[]>([
    {
      field: "endereco",
      sortable: true,
      headerName: "Endereço",
      resizable: true,
    },
    {
      field: "seqItem",
      sortable: true,
      filter: "number",
      headerName: "Peça",
      resizable: true,
    },
    { field: "qtde", sortable: true, filter: "number", headerName: "Qtde", resizable: true },
    { field: "contagem", width: 80, sortable: true, filter: "text", headerName: "Nº", resizable: true },
    {
      field: "status",
      width: 90,
      sortable: true,
      filter: "number",
      headerName: "Status",
      cellRenderer: (params: any) => {
        return (
          <Row
            className={params.value == 3 ? "bg-attention-s100" : params.value == 2 ? "bg-success-s100" : "bg-error-s100"}
            height="100%"
            width="50%"
            horizontal="center"
            vertical="center"
          >
            {/* {params.value ? "🌧️" : "☀️"} */}
          </Row>
        );
      },
      resizable: true,
    },
    { field: "ocorrencias", width: 120, sortable: true, filter: "number", headerName: "Ocorrências", resizable: true },
    { field: "usuario", sortable: true, filter: "text", headerName: "Usuário", resizable: true },
  ]);

  useEffect(() => {
    if (gridRef.current.api) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, [list.data]);

  return (
    <div
      className={clsx(
        dark ? "ag-theme-alpine-dark" : "ag-theme-alpine",
        "ag-theme-alpine shadow-lg rounded-2xl overflow-hidden mt-4 relative bg-primary-s010"
      )}
      style={{ height: "350px", width: "95%", opacity: list.isFetching ? 0.4 : 1 }}
    >
      <AgGridReact
        ref={gridRef}
        noRowsOverlayComponent={() => {
          return (
            <Column horizontal="center">
              <EmptyDataIcon size={60} />
              <Text spacingTop="md" fontSize="lg">
                Sem dados para mostrar
              </Text>
            </Column>
          );
        }}
        getRowHeight={() => {
          return 22;
        }}
        animateRows={true}
        suppressCellFocus={false}
        headerHeight={40}
        rowClass={"cursor-pointer"}
        onRowClicked={(value) => {
          getDescPeca(value.data.seqItem);
        }}
        rowHeight={30}
        rowSelection="single"
        rowData={list.data}
        columnDefs={columnDefs}
      />
    </div>
  );
};
