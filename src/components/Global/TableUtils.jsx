// TableUtils.js
import React from "react";
import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";


export const handleFileChange = (e, setImagePreview, setImageName) => {
  const file = e.target.files[0];

  // Extract the file name
  const fileName = file.name;

  setImageName(fileName);

  const reader = new FileReader();
  reader.onload = (event) => {
    setImagePreview(event.target.result);
  };
  reader.readAsDataURL(file);
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

export const hideDialog = (
  setSubmitted,
  setNewDialogVisible,
  setEditDialogVisible
) => {
  setSubmitted(false);
  setNewDialogVisible(false);
  setEditDialogVisible(false);
};

export const saveType = (
  setSubmitted,
  setNewDialogVisible,
  setEditDialogVisible
) => {
  setSubmitted(true);
  setNewDialogVisible(false);
  setEditDialogVisible(false);
};
// -------------------------NEW + DELETE-------------------------
export const leftToolbarTemplate = (openNew, selectedTypes, onDelete) => (
  <div className="flex flex-wrap gap-2">
    <Button
      label="New"
      icon="pi pi-plus"
      severity="success"
      onClick={() => openNew()}
    />
    <Button
      label="Delete"
      icon="pi pi-trash"
      severity="danger"
      disabled={!selectedTypes || !selectedTypes.length}
      onClick={() => onDelete()}
    />
  </div>
);

// -------------------------EXPORT-------------------------
export const rightToolbarTemplate = (exportCSV, selectedTypes, dt) => (
  <Button
    label="Export"
    icon="pi pi-upload"
    className="p-button-help"
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
export const typeDialogFooter = (hideDialog, saveType) => (
  <>
    <Button
      label="Cancel"
      icon="pi pi-times"
      outlined
      onClick={() => hideDialog()}
    />
    <Button label="Save" icon="pi pi-check" onClick={() => saveType()} />
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
    src={`public/${rowData.image}`}
    alt={rowData.image}
    className="shadow-2 border-round"
    style={{ width: "64px" }}
  />
);

// -------------------------ACTIONS EDIT / DELETE-------------------------
export const actionBodyTemplate = (
  setFormData,
  setEditDialogVisible,
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
      // onClick={() => confirmDeleteType(rowData)}
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
    const options = typeId.map((type, index) => ({
      label: type,
      value: type,
    }));

    const defaultLabel = "Type ID";

    return <Dropdown options={options} placeholder={defaultLabel} />;
  }

  return <span>{typeId}</span>;
};

// -------------------------SUBCATEGORIES-------------------------
export const categoryIdBodyTemplate = (rowData) => {
  const { categorieId } = rowData;

  if (Array.isArray(categorieId)) {
    const options = categorieId.map((category, index) => ({
      label: category,
      value: category,
    }));

    const defaultLabel = "Category ID";

    return <Dropdown options={options} placeholder={defaultLabel} />;
  }

  return <span>{categorieId}</span>;
};

// -------------------------PERMISSION-------------------------
export const permessionsBodyTemplate = (rowData) => {
  const { permessions } = rowData;

  if (Array.isArray(permessions)) {
    const options = permessions.map((permession, index) => ({
      label: permession,
      value: permession,
    }));

    const defaultLabel = "Persmissions";

    return <Dropdown options={options} placeholder={defaultLabel} />;
  }

  return <span>{permessions}</span>;
}
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



