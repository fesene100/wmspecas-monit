import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { UseApp } from "../../hooks/AppProvider";
import { AgGridReact } from "ag-grid-react";
import { ColDef, INumberFilterParams } from "ag-grid-community";
import { Column, Row, Text } from "componentes-web-lojas-cem";
import { UseMonit } from "../../hooks/MonitProvider";
import { EmptyDataIcon } from "../../components/svg/EmptyDataIcon/EmptyDataIcon";
import { useParams } from "react-router-dom";

export const ListMonit: React.FC = () => {
  const { dark, mode } = UseApp();
  const { list, getDescPeca } = UseMonit();
  const gridRef = useRef<any>();
  let { dep } = useParams();

  const [columnDefs] = useState<ColDef[]>([
    {
      field: "endereco",
      sortable: true,
      headerName: "Endereço",
      resizable: true,
      minWidth: 90,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "seqItem",
      minWidth: 60,
      sortable: true,
        filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      } as INumberFilterParams,
      headerName: "Peça",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "qtde",
      hide: mode ? false : true,
      minWidth: 80,
      sortable: true,
        filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      } as INumberFilterParams,
      headerName: "Qtde",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "contagem",
      minWidth: 60,
      sortable: true,
      filter: "text",
      headerName: "Nº",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "status",
      width: 90,
      minWidth: 40,
      sortable: true,
        filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      } as INumberFilterParams,
      headerName: "Status",
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
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
    {
      field: "ocorrencias",
      minWidth: 30,
      sortable: true,
        filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      } as INumberFilterParams,
      headerName: "Ocorrências",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
    {
      field: "usuario",
      minWidth: 100,
      sortable: true,
      filter: "text",
      headerName: "Usuário",
      resizable: true,
      headerClass: "max-mobile:text-2xs",
      cellClass: "max-mobile:text-2xs",
    },
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
