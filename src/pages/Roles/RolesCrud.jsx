// TypesTable.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

// Configuration Dotenv
const apiUrlRole = import.meta.env.VITE_ROLES_URL;

// Skeleton
import SkeletonDataTable from "../../components/Global/SkeletonDataTable";

// Data Column
import { dataRoleTableColumns } from "../../components/Global/dataTableColumns";

//  CreatedAt DeletedAt UpdateAt
import DateCDU from "../../components/Global/DateCDU";

// Delete Dialog
import DeleteDialog from "../../components/Global/DeleteDialog";

// TableUtils.jsx
import {
  openNew,
  hideDialog,
  typeDialogFooter,
  leftToolbarTemplate,
  rightToolbarTemplate,
  exportCSV,
} from "../../components/Global/TableUtils";

import { get } from "../../utils/request";
import { MultiSelect } from "primereact/multiselect";

const TypesCrud = () => {
  const [showDataTable, setShowDataTable] = useState(false);

  const toast = useRef(null);
  const dt = useRef(null);

  const [data, setData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(null);

  const [newDialogVisible, setNewDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

  const [selectedPermissions, setSelectedPermissions] = useState(null);
  const [permessionOptions, setPermessionOptions] = useState([]);

  const [formData, setFormData] = useState({
    role: "",
    permissions: [],
    createdBy: "",
    updatedBy: "",
    deletedBy: "",
    deletedAt: null,
    createdAt: null,
    updatedAt: null,
  });

  const navigate = useNavigate();

  const clearForm = () => {
    setFormData({
      role: "",
      permissions: [],
      createdBy: "",
      updatedBy: "",
      deletedBy: "",
      deletedAt: null,
      createdAt: null,
      updatedAt: null,
    });
  };
  // Toast Notification
  const showNotification = (severity, summary, detail) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  };

  // GET
  useEffect(() => {
    const unauthorizedCallback = () => {
      // This function will be called if the request is unauthorized (status code 401)
      alert("Unauthorized access! Redirecting to login.");
      // You can also use react-router's useNavigate here
      navigate("/login");
    };

    const fetchData = async () => {
      const token = JSON.parse(localStorage.getItem("user")).token;

      const data = await get(`${apiUrlRole}`, token, unauthorizedCallback);
      setData(data);
      setShowDataTable(true);
    };

    fetchData();
  }, [submitted, deleted]);

  // POST
  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;

      const { role } = formData;

      if (!formData.role) {
        toast.current.show({
          severity: "error",
          summary: "Validation Error",
          detail: "Please enter Name, Image, and select Active status.",
        });
        return;
      }

      const formDataToSend = {
        role,
        // permissions: permession.map((permissions) => permissions._id),
      };

      const response = await axios.post(`${apiUrlRole}/store`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = response.data || {};

      if (responseData.message === "Type restored successfully") {
        showNotification("warn", "Warning", responseData.message);
        clearForm();
        setSubmitted(true);
        setNewDialogVisible(false);
      } else if (responseData.message === "Type already exists") {
        showNotification("error", "Error", responseData.message);
      } else if (responseData.message === "Type saved successfully") {
        showNotification("success", "Success", responseData.message);
        clearForm();
        setSubmitted(true);
        setNewDialogVisible(false);
      } else {
        showNotification("warn", "Warning", responseData.message);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      showNotification(
        "error",
        "Error",
        "An unexpected error occurred while adding the category."
      );
    }
  };

  // ------------------------------to fix
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const openDeleteDialog = (rowData) => {
    console.log(rowData);
    setSelectedRowData(rowData);
    setDeleteDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setSelectedRowData(null);
    setDeleteDialogVisible(false);
  };

  // Confirm and handle category deletion
  const confirmDelete = () => {
    // Call unified handleDelete function
    handleDelete(selectedRowData, selectedTypes);
    hideDeleteDialog();
  };

  // Delete
  const handleDelete = async (rowData, selectedTypes) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;

    try {
      let identifiersToDelete;

      if (selectedTypes && selectedTypes.length > 0) {
        // Delete multiple categories
        identifiersToDelete = selectedTypes.map((type) => type._id);
      } else if (rowData) {
        // Delete a single category
        identifiersToDelete = [rowData._id];
      } else {
        console.error("Invalid arguments for handleDelete function.");
        return;
      }

      const response = await axios.delete(`${apiUrlRole}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ids: identifiersToDelete,
        },
      });

      if (response.status === 200) {
        console.log("Types deleted successfully:", identifiersToDelete);
        setDeleted(!deleted);
      } else {
        console.error(
          "Failed to delete Types. Server returned:",
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error("Error deleting Types:", error.message);
    }
  };

  // Function to generate options for permission  dropdown
  const permissionsOptions = formData.permissions.map((permission, index) => ({
    label: permission.label,
    // value: type._id,
  }));
  return (
    <>
      <Toast ref={toast}></Toast>
      <Toolbar
        className="mb-4"
        left={() =>
          leftToolbarTemplate(
            () => openNew(setSubmitted, setNewDialogVisible, setFormData),
            selectedTypes,
            () => openDeleteDialog(selectedTypes)
          )
        }
        right={() => rightToolbarTemplate(exportCSV, selectedTypes, dt)}
      />
      {showDataTable ? (
        <DataTable
          ref={dt}
          value={data}
          selection={selectedTypes}
          onSelectionChange={(e) => setSelectedTypes(e.value)}
          dataKey="_id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} types"
          selectionMode="checkbox"
        >
          {dataRoleTableColumns(
            setFormData,
            setEditDialogVisible,
            openDeleteDialog
          ).map((col, index) => (
            <Column key={index} {...col} />
          ))}
        </DataTable>
      ) : (
        <SkeletonDataTable />
      )}

      {/* Dialog For NEW BTN */}
      <Dialog
        visible={newDialogVisible}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add Type"
        modal
        className="p-fluid"
        footer={typeDialogFooter(
          () =>
            hideDialog(
              setSubmitted,
              setNewDialogVisible,
              "new",
              formData,
              setFormData
            ),
          handleSubmit
        )}
        onHide={() =>
          hideDialog(
            setSubmitted,
            setNewDialogVisible,
            "new",
            formData,
            setFormData
          )
        }
      >
        {/* Name */}
        <div className="field mb-4">
          <label htmlFor="role" className="font-bold text-[#5A6A85]">
            Role
          </label>
          <InputText
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
        </div>

        {/* permession */}
        <div className="p-field mb-4">
          <label htmlFor="permissions" className="font-bold text-[#5A6A85]">
            Type ID
          </label>
          <MultiSelect
            id="permissions"
            name="permissions"
            value={formData.permissions}
            onChange={(e) => setFormData({ ...formData, permissions: e.value })}
            options={permessionOptions}
            optionLabel="name" // Assuming 'name' is the property you want to display
            placeholder="Select Type ID"
          />
        </div>
      </Dialog>

      {/* Dialog For EDIT BTN */}
      <Dialog
        visible={editDialogVisible}
        style={{ width: "50rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add Type"
        modal
        className="p-fluid"
        footer={typeDialogFooter(
          () =>
            hideDialog(
              setSubmitted,
              setEditDialogVisible,
              "edit",
              formData,
              setFormData
            ),
          () => editType(formData)
        )}
        onHide={() =>
          hideDialog(
            setSubmitted,
            setEditDialogVisible,
            "edit",
            formData,
            setFormData
          )
        }
      >
        {/* Name */}
        <div className="field mb-4">
          <label htmlFor="role" className="font-bold text-[#5A6A85]">
            Role
          </label>
          <InputText
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
        </div>

        {/* Permissions */}
        <div className="p-field mb-4">
          <label htmlFor="permissions" className="font-bold text-[#5A6A85]">
            Permissions
          </label>
          <MultiSelect
            id="permissions"
            name="permissions"
            value={selectedPermissions}
            onChange={(e) => setSelectedPermissions(e.value)}
            options={permissionsOptions}
            optionLabel="label" // Assuming 'label' is the property you want to display
            placeholder="Select Type Id"
          />
        </div>

        <DateCDU formData={formData} setFormData={setFormData} />
      </Dialog>

      <DeleteDialog
        visible={deleteDialogVisible}
        onHide={hideDeleteDialog}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default TypesCrud;
