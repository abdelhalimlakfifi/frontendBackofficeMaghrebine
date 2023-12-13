// TableUtils.js
import React from "react";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";

export const handleFileChange = (e, setImagePreview, setImageName) => {
  // const file = e.target.files[0];
  const file = e.target.files && e.target.files[0];

  if (file) {
    // Extract the file name
    const fileName = file.name;

    setImageName(fileName);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  }
};

export const openNew = (setSubmitted, setNewDialogVisible) => {
  setSubmitted(false);
  setNewDialogVisible(true);

  // Reset formData to initial values
  // setFormData({
  //   name: "",
  //   active: false,
  //   image: "",
  //   createdBy: null,
  //   updatedBy: null,
  //   deletedAt: null,
  //   deletedBy: null,
  //   createdAt: null,
  //   updatedAt: null,
  // });
};

export const hideDialog = (setSubmitted, setVisible, dialogType) => {
  console.log(`Closing ${dialogType} dialog`);
  setSubmitted(false);
  setVisible(false);
};

export const saveType = (handleSubmit) => {
  handleSubmit();
};

// -------------------------NEW + DELETE-------------------------
export const leftToolbarTemplate = (
  openNew,
  selectedTypes,
  openDeleteDialog
) => (
  <div className="flex flex-wrap gap-2">
    <Button
      className="bg-light-gold border-light-gold"
      label="New"
      icon="pi pi-plus"
      severity="success"
      onClick={() => openNew()}
    />
    <Button
      className="bg-light-gold border-light-gold"
      label="Delete"
      icon="pi pi-trash"
      severity="danger"
      disabled={!selectedTypes || !selectedTypes.length}
      onClick={() => openDeleteDialog(selectedTypes)}
    />
  </div>
);

// -------------------------EXPORT-------------------------
export const rightToolbarTemplate = (exportCSV, selectedTypes, dt) => (
  <Button
    label="Export"
    icon="pi pi-upload"
    className="bg-light-gold border-light-gold"
    onClick={() => exportCSV(selectedTypes, dt)}
  />
);

export const exportCSV = (selectedTypes, dt) => {
  if (selectedTypes?.length) {
    dt.current.exportCSV({ selectionOnly: true });
  } else {
    console.warn("No types selected for export.");
  }
};

// -------------------------FOOTER Dialog-------------------------
export const typeDialogFooter = (hideDialog, handleSubmit, dialogType) => (
  <>
    <Button
      className="bg-light-gold border-light-gold"
      label="Cancel"
      icon="pi pi-times"
      // outlined
      onClick={() => hideDialog(dialogType)}
    />
    <Button
      className="bg-light-gold border-light-gold"
      label="Save"
      icon="pi pi-check"
      onClick={handleSubmit}
    />
  </>
);

// -------------------------TEMPLATE COLUMN TABLE-------------------------
// -------------------------STATUS ACTIVE / INACTIVE-------------------------
export const statusBodyTemplate = (rowData) => {
  const severity = getSeverity(rowData);
  const statusText = rowData.active ? "Active" : "Inactive";
  return <Tag value={statusText} severity={severity} />;
};

export const getSeverity = (status) => (status.active ? "success" : "danger");

// -------------------------IMAGE-------------------------
export const imageBodyTemplate = (rowData) => (
  <img
    src={`http://localhost:3000/api/${rowData.image}`}
    alt={rowData.image}
    className="shadow-2 border-round"
    style={{ width: "64px" }}
  />
);

// -------------------------ACTIONS EDIT / DELETE-------------------------
export const actionBodyTemplate = (
  setFormData,
  setEditDialogVisible,
  openDeleteDialog,
  rowData
) => (
  <>
    <Button
      icon="pi pi-pencil"
      rounded
      outlined
      className="mr-2"
      onClick={() => editType(setFormData, setEditDialogVisible, rowData)}
    />
    <Button
      icon="pi pi-trash"
      rounded
      outlined
      severity="danger"
      onClick={() => openDeleteDialog(rowData)}
    />
  </>
);

export const editType = (setFormData, setEditDialogVisible, rowData) => {
  setFormData({ ...rowData });
  setEditDialogVisible(true);
};

// -------------------------CATEGORIES-------------------------
export const typeIdBodyTemplate = (rowData) => {
  const { typeId } = rowData;

  if (Array.isArray(typeId)) {
    const options = typeId.map((type) => ({
      label: type.name, // Assuming that 'name' is the property you want to display
      value: type._id, // Assuming that '_id' is the property you want to use as the value
    }));

    const defaultLabel = "Type";

    return <Dropdown options={options} placeholder={defaultLabel} />;
  }

  return <span>{typeId.name}</span>; // Assuming that 'name' is the property you want to display
};

// -------------------------SUBCATEGORIES-------------------------
export const categoryIdBodyTemplate = (rowData) => {
  const { categorieId } = rowData;

  if (Array.isArray(categorieId)) {
    const options = categorieId.map((category, index) => ({
      label: category.name,
      value: category._id,
    }));

    const defaultLabel = "Category";

    return <Dropdown options={options} placeholder={defaultLabel} />;
  }

  return <span>{categorieId.name}</span>;
};

// -------------------------PERMISSION-------------------------
export const permessionsBodyTemplate = (rowData) => {
  const { permissions } = rowData;

  if (Array.isArray(permissions)) {
    const options = permissions.map((permession, index) => ({
      label: permession.label,
      value: permession._id,
    }));

    const defaultLabel = "Persmissions";

    return <Dropdown options={options} placeholder={defaultLabel} />;
  }

  return <span>s{permissions.label}</span>;
};
// -------------------------TEMPLATE COLUMN TABLE-------------------------

export const chooseOptions = {
  icon: "pi pi-fw pi-images",
  iconOnly: true,
  className: "custom-choose-btn p-button-rounded p-button-outlined",
};

export const uploadOptions = {
  icon: "pi pi-fw pi-cloud-upload",
  iconOnly: true,
  className:
    "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
};

export const cancelOptions = {
  icon: "pi pi-fw pi-times",
  iconOnly: true,
  className:
    "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
};
