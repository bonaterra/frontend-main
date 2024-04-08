import React, { useState } from "react";
import { AdsTableProps } from "./AdsTable.types";
import Table from "../../../atoms/Table/Table";
import { TableHeader } from "../../../../types/table";
import { DataTableFilterMeta } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { IAds } from "../../../../models/IAds";

const AdsTable: React.FC<AdsTableProps> = ({
  ads,
  loading,
  onEdit,
  onDelete,
}) => {
  const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    startAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
    endAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
    type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    deleted: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };

  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);

  const suppliedCells = (rowData: IAds) => {
    return (
      <div className="flex flex-column justify-content-center lg:flex-row gap-4">
        <Button
          icon="pi pi-pencil"
          className=" p-button-success p-mr-2"
          text
          raised
          onClick={() => onEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-danger"
          text
          raised
          onClick={() => onDelete(rowData.id)}
        />
      </div>
    );
  };

  const imageCell = (rowData: IAds) => {
    return (
      <img
        src={rowData.image}
        alt={rowData.title}
        className="max-w-full max-h-12rem"
      />
    );
  };

  const DateCell = ({ rowData, field }: { rowData: any; field: string }) => (
    <span>{new Date(rowData[field]).toLocaleDateString()}</span>
  );

  const statusCell = (rowData: IAds) => {
    return (
      <div className="w-full text-center">
        <i
          style={{
            fontSize: "1.5rem",
            color: !rowData.deleted ? "#4caf50" : "#f44336",
          }}
          className={`text-center ${
            !rowData.deleted
              ? "pi pi-check color-primary"
              : "pi pi-times color-dan"
          }`}
        ></i>
      </div>
    );
  };



  const headers: TableHeader[] = [
    {
      field: "title",
      header: "Titulo",
      filter: true,
      filterConfig: {
        isGlobalFilter: true,
      },
    },
    {
      field: "image",
      header: "Imagen",
      body: imageCell,
    },
    {
      field: "startAt",
      dataType: "date",
      header: "Inicio",
      body: (rowData: IAds) => <DateCell rowData={rowData} field="startAt" />,
    },
    {
      field: "endAt",
      dataType: "date",
      header: "Fin",
      body: (rowData: IAds) => <DateCell rowData={rowData} field="endAt" />,
    },
    {
      field: "type",
      header: "Tipo",
    },
    {
      field: "deleted",
      header: "Estado",
      body: statusCell,
    },
    {
      field: "actions",
      header: "Acciones",
      filter: false,
      body: suppliedCells,
    },
  ];

  return (
    <Table
      data={ads}
      loading={loading}
      headers={headers}
      filters={filters}
      setFilters={setFilters}
      scrollable
      scrollHeight="60vh"
      defaultFilters={defaultFilters}
    />
  );
};

export default AdsTable;
