// TableColumns.js
import {
    statusBodyTemplate,
    actionBodyTemplate,
    imageBodyTemplate,
  
    typeIdBodyTemplate,
  
    categoryIdBodyTemplate
  } from "./TableUtils";
  
  export const dataTypeTableColumns = (setFormData, setEditDialogVisible) => [
    { selectionMode: "multiple", exportable: false },
    {
      field: "name",
      header: "Name",
      sortable: true,
      style: { minWidth: "8rem" },
    },
    {
      field: "active",
      header: "Active",
      body: statusBodyTemplate,
      sortable: true,
      style: { minWidth: "8rem" },
    },
    {
      field: "image",
      header: "Image",
      body: imageBodyTemplate,
      sortable: true,
      style: { minWidth: "8rem" },
    },
    {
      field: "createdBy",
      header: "Created By",
      sortable: true,
      style: { minWidth: "8rem" },
    },
    {
      body: (rowData) =>
        actionBodyTemplate(setFormData, setEditDialogVisible, rowData),
      exportable: false,
      style: { minWidth: "12rem" },
    },
  ];
  
  export const dataCategorieTableColumns = (setFormData, setEditDialogVisible) => [
    { selectionMode: "multiple", exportable: false },
    {
      field: "name",
      header: "Name",
      sortable: true,
      style: { minWidth: "8rem" },
    },
    {
      field: "typeId",
      header: "Type ID",
      body: typeIdBodyTemplate,
      sortable: true,
      style: { minWidth: "8rem" },
    },
    {
      field: "image",
      header: "Image",
      body: imageBodyTemplate,
      sortable: true,
      style: { minWidth: "8rem" },
    },
    {
      field: "createdBy",
      header: "Created By",
      sortable: true,
      style: { minWidth: "8rem" },
    },
    {
      body: (rowData) =>
        actionBodyTemplate(setFormData, setEditDialogVisible, rowData),
      exportable: false,
      style: { minWidth: "12rem" },
    },
  ];
  
  export  const dataSubCategorieTableColumns = (setFormData, setEditDialogVisible) => [
      { selectionMode: "multiple", exportable: false },
      {
        field: "name",
        header: "Name",
        sortable: true,
        style: { minWidth: "8rem" },
      },
      {
        field: "typeId",
        header: "Type ID",
        body: typeIdBodyTemplate,
        sortable: true,
        style: { minWidth: "8rem" },
      },
      {
        field: "categorieId",
        header: "Category ID",
        body: categoryIdBodyTemplate,
        sortable: true,
        style: { minWidth: "8rem" },
      },
      {
        field: "active",
        header: "Active",
        body: statusBodyTemplate,
        sortable: true,
        style: { minWidth: "8rem" },
      },
      {
        field: "createdBy",
        header: "Created By",
        sortable: true,
        style: { minWidth: "8rem" },
      },
  {
    body: (rowData) =>
      actionBodyTemplate(setFormData, setEditDialogVisible, rowData),
    exportable: false,
    style: { minWidth: "12rem" },
  },
    ];
  