import React, { useState } from "react";
import { UseMonit } from "../../hooks/MonitProvider";
import { Grid, IColumnDef } from "@inovaetech/components-react";

export const ListOcor: React.FC = () => {
  const { ocorrencias } = UseMonit();

  const [columnDefs] = useState<IColumnDef[]>([
    {
      accessorKey: "motivo",
      enableSorting: true,
      header: "Motivo",
      enableResizing: true,
      size: 250,
    },
    {
      accessorKey: "localAntigo",
      size: 150,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Local antigo",
      enableResizing: true,
    },
    {
      accessorKey: "localNovo",
      size: 150,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Local novo",
      enableResizing: true,
    },
    {
      accessorKey: "difEstoque",
      size: 120,
      enableSorting: true,
      enableColumnFilter: true,
      header: "Estoque",
      enableResizing: true,
    },
    {
      accessorKey: "pecaDesc",
      enableSorting: true,
      size: 300,
      enableColumnFilter: true,
      header: "Descrição",
      enableResizing: true,
    },
    {
      accessorKey: "produtoDesc",
      enableSorting: true,
      size: 300,
      enableColumnFilter: true,
      meta: { filterVariant: "number" },
      header: "Produto",
      enableResizing: true,
    },
  ]);

  return (
    <div style={{ height: "350px", width: "100%", opacity: ocorrencias.isFetching ? 0.4 : 1 }}>
      <Grid data={ocorrencias.data} columns={columnDefs} classNames={{ inner: "max-h-[350px] min-h-[350px]" }} />
    </div>
  );
};
