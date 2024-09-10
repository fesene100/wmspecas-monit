import React, { useRef, useState } from "react";
import { UseApp } from "../../hooks/AppProvider";
import { Row } from "componentes-web-lojas-cem";
import { UseMonit } from "../../hooks/MonitProvider";
import { Grid, HStack, IColumnDef } from "@inovaetech/components-react";

export const ListMonit: React.FC = () => {
  const { mode } = UseApp();
  const { list, getDescPeca } = UseMonit();
  const gridRef = useRef<any>();

  const [columnDefs] = useState<IColumnDef[]>([
    {
      accessorKey: "endereco",
      enableSorting: true,
      header: "Endereço",
      enableResizing: true,
      minSize: 90,
    },
    {
      accessorKey: "seqItem",
      minSize: 60,
      enableSorting: true,
      enableColumnFilter: true,
      meta: { filterVariant: "number" },
      header: "Peça",
      enableResizing: true,
    },
    {
      accessorKey: mode ? "qtde" : "",
      minSize: 80,
      enableSorting: true,
      enableColumnFilter: true,
      meta: { filterVariant: "number" },
      header: "Qtde",
      enableResizing: true,
    },
    {
      accessorKey: "contagem",
      minSize: 60,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Nº",
      enableResizing: true,
    },
    {
      accessorKey: "status",
      size: 90,
      minSize: 40,
      enableSorting: true,
      enableColumnFilter: true,
      meta: { filterVariant: "number", cellAlign: "center" },
      header: "Status",

      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <HStack className="w-full h-full" justifyContent="center">
            <Row
              className={value == 3 ? "bg-attention-s100" : value == 2 ? "bg-success-s100" : "bg-error-s100"}
              height="100%"
              width="50%"
              horizontal="center"
              vertical="center"
            ></Row>
          </HStack>
        );
      },
      enableResizing: true,
    },
    {
      accessorKey: "ocorrencias",
      minSize: 30,
      enableSorting: true,
      enableColumnFilter: true,
      meta: { filterVariant: "number" },
      header: "Ocorrências",
      enableResizing: true,
    },
    {
      accessorKey: "usuario",
      minSize: 100,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Usuário",
      enableResizing: true,
    },
  ]);

  return (
    <div style={{ height: "350px", width: "100%", opacity: list.isFetching ? 0.4 : 1 }}>
      <Grid
        ref={gridRef}
        onClickRow={(value: any) => {
          getDescPeca(value.row.seqItem);
        }}
        classNames={{ inner: "max-h-[350px] min-h-[350px]" }}
        data={list.data}
        columns={columnDefs}
      />
    </div>
  );
};
