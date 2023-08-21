import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { UseApp } from "../../hooks/AppProvider";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { Column, Row, Text } from "componentes-web-lojas-cem";
import { UseMonit } from "../../hooks/MonitProvider";
import { EmptyDataIcon } from "../../components/svg/EmptyDataIcon/EmptyDataIcon";

export const ListOcor: React.FC = () => {
  const { dark } = UseApp();
  const { ocorrencias, getDescPeca } = UseMonit();
  const gridRef = useRef<any>();

  const [columnDefs] = useState<ColDef[]>([
    {
      field: "motivo",
      sortable: true,
      headerName: "Motivo",
      resizable: true,
      headerClass: "text-xs max-mobile:text-2xs",
      cellClass: "text-xs max-mobile:text-2xs",
    },
    {
      field: "localAntigo",
      width: 150,
      sortable: true,
      filter: "text",
      headerName: "Local antigo",
      resizable: true,
      headerClass: "text-xs max-mobile:text-2xs",
      cellClass: "text-xs max-mobile:text-2xs",
    },
    {
      field: "localNovo",
      width: 150,
      sortable: true,
      filter: "text",
      headerName: "Local novo",
      resizable: true,
      headerClass: "text-xs max-mobile:text-2xs",
      cellClass: "text-xs max-mobile:text-2xs",
    },
    {
      field: "difEstoque",
      width: 100,
      sortable: true,
      filter: "text",
      headerName: "Estoque",
      resizable: true,
      headerClass: "text-xs max-mobile:text-2xs",
      cellClass: "text-xs max-mobile:text-2xs",
    },
    {
      field: "pecaDesc",
      sortable: true,
      filter: "text",
      headerName: "Descrição",
      resizable: true,
      headerClass: "text-xs max-mobile:text-2xs",
      cellClass: "text-xs max-mobile:text-2xs",
    },
    {
      field: "produtoDesc",
      sortable: true,
      filter: "number",
      headerName: "Produto",
      resizable: true,
      headerClass: "text-xs max-mobile:text-2xs",
      cellClass: "text-xs max-mobile:text-2xs",
    },
  ]);

  useEffect(() => {
    if (gridRef.current.api) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, [ocorrencias.data]);

  return (
    <div
      className={clsx(
        dark ? "ag-theme-alpine-dark" : "ag-theme-alpine",
        "ag-theme-alpine shadow-lg rounded-2xl overflow-hidden mt-4 relative bg-primary-s010"
      )}
      style={{ height: "350px", width: "95%", opacity: ocorrencias.isFetching ? 0.4 : 1 }}
    >
      <AgGridReact
        ref={gridRef}
        getRowHeight={() => {
          return 22;
        }}
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
        animateRows={true}
        suppressCellFocus={false}
        headerHeight={40}
        rowHeight={30}
        rowSelection="single"
        rowData={ocorrencias.data}
        columnDefs={columnDefs}
      />
    </div>
  );
};
