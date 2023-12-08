// TableColumns.js
import {
  statusBodyTemplate,
  actionBodyTemplate,
  imageBodyTemplate,
  typeIdBodyTemplate,
  categoryIdBodyTemplate,
  permessionsBodyTemplate,
} from "./TableUtils";

// Types-Categories-SubCategories
export const dataTypeTableColumns = (
  setFormData,
  setEditDialogVisible,
  openDeleteDialog
) => [
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
    body: (rowData) => {
      if (rowData.createdBy) {
        const { first_name, last_name } = rowData.createdBy;
        return `${first_name} ${last_name}`;
      } else {
        return "not available";
      }
    },
    exportable: true,
  },
  {
    body: (rowData) =>
      actionBodyTemplate(
        setFormData,
        setEditDialogVisible,
        openDeleteDialog,
        rowData
      ),
    exportable: false,
    style: { minWidth: "12rem" },
  },
];

export const dataCategorieTableColumns = (
  setFormData,
  setEditDialogVisible,
  openDeleteDialog
) => [
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
    body: (rowData) => {
      if (rowData.createdBy) {
        const { first_name, last_name } = rowData.createdBy;
        return `${first_name} ${last_name}`;
      } else {
        return "not available";
      }
    },
  },
  {
    body: (rowData) =>
      actionBodyTemplate(
        setFormData,
        setEditDialogVisible,
        openDeleteDialog,
        rowData
      ),
    exportable: false,
    style: { minWidth: "12rem" },
  },
];

export const dataSubCategorieTableColumns = (
  setFormData,
  setEditDialogVisible
) => [
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

// Roles
export const dataRoleTableColumns = (setFormData, setEditDialogVisible) => [
  { selectionMode: "multiple", exportable: false },
  {
    field: "role",
    header: "Role",
    sortable: true,
    style: { minWidth: "8rem" },
  },
  {
    field: "permessions",
    header: "Permessions",
    body: permessionsBodyTemplate,
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
