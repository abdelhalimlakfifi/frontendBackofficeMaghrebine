// TypesTable.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { InputSwitch } from "primereact/inputswitch";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

// Configuration Dotenv
const apiUrl = import.meta.env.VITE_TYPE_URL; 

// Skeleton
import SkeletonDataTable from "../../components/Global/SkeletonDataTable";

// Data Column
import { dataTypeTableColumns } from "../../components/Global/dataTableColumns";

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
  handleFileChange,
} from "../../components/Global/TableUtils";

import { get } from "../../utils/request";

const TypesCrud = () => {
  const [showDataTable, setShowDataTable] = useState(false);

  const [imageName, setImageName] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imageRef = useRef(null);

  const toast = useRef(null);
  const dt = useRef(null);

  const [data, setData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(null);

  const [newDialogVisible, setNewDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    active: false,
    image: "",
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
      name: "",
      active: false,
      image: "",
      createdBy: "",
      updatedBy: "",
      deletedBy: "",
      deletedAt: null,
      createdAt: null,
      updatedAt: null,
    });

    // setImageName(null);
    setImagePreview(null);
    // imageRef.current.value = null;
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

      const data = await get(
        `${apiUrl}`,
        token,
        unauthorizedCallback
      );
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

      const { name, active } = formData;
      const imageFiles = imageRef.current.files;

      if (!formData.name || imageFiles.length === 0) {
        toast.current.show({
          severity: "error",
          summary: "Validation Error",
          detail: "Please enter Name, Image, and select Active status.",
        });
        return;
      }

      const formDataToSend = {
        name,
        active,
      };

      if (imageFiles.length > 0) {
        formDataToSend.image = imageFiles[0];
      }

      const response = await axios.post(
        `${apiUrl}/store`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

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

      const response = await axios.delete(
        `${apiUrl}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            ids: identifiersToDelete,
          },
        }
      );

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
          {dataTypeTableColumns(
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
        {/* Image */}
        <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif"
            className="hidden"
            ref={imageRef}
            onChange={(e) => handleFileChange(e, setImagePreview, setImageName)}
          />

          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
            htmlFor="image"
          >
            Type Image <span className="text-red-600"> </span>
          </label>

          <div className="text-center">
            <div
              className="mt-2"
              style={{ display: !imagePreview ? "block" : "none" }}
            >
              <img
                src="./public/200x200.png"
                className="w-40 h-40 m-auto shadow"
                alt="Profile"
              />
            </div>
            <div
              className="mt-2"
              style={{ display: imagePreview ? "block" : "none" }}
            >
              <span
                className="block w-40 h-40 m-auto shadow"
                style={{
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundImage: `url(${imagePreview})`,
                }}
              />
            </div>
            <button
              type="button"
              className="inline-flex mt-4  items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 "
              onClick={() => imageRef.current.click()}
            >
              Select New Image
            </button>
          </div>
        </div>

        {/* Name */}
        <div className="field mb-4">
          <label htmlFor="name" className="font-bold text-[#5A6A85]">
            Name
          </label>
          <InputText
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Active */}
        <div className="field mb-4 flex">
          <label
            htmlFor="active"
            className="font-bold mr-2 w-16 text-[#5A6A85]"
          >
            {formData.active ? "Active" : "Inactive"}
          </label>
          <InputSwitch
            id="active"
            checked={formData.active}
            onChange={(e) => {
              console.log("Switch value:", e.value);
              setFormData({ ...formData, active: e.value });
            }}
            className="ml-2 w-12"
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
        {/* Image */}
        <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif"
            className="hidden"
            ref={imageRef}
            onChange={(e) => handleFileChange(e, setImagePreview, setImageName)}
          />

          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
            htmlFor="image"
          >
            Type Image <span className="text-red-600"> </span>
          </label>

          <div className="text-center">
            <div
              className="mt-2"
              style={{ display: !imagePreview ? "block" : "none" }}
            >
              <img
                src={`http://localhost:3000/api/${formData.image}`}
                className="w-40 h-40 m-auto shadow"
                alt="Profile"
              />
            </div>
            <div
              className="mt-2"
              style={{ display: imagePreview ? "block" : "none" }}
            >
              <span
                className="block w-40 h-40 m-auto shadow"
                style={{
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundImage: `url(${imagePreview})`,
                }}
              />
            </div>
            <button
              type="button"
              className="inline-flex mt-4  items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 "
              onClick={() => imageRef.current.click()}
            >
              Select New Image
            </button>
          </div>
        </div>

        {/* Name */}
        <div className="p-field mb-4">
          <label htmlFor="name" className="font-bold text-[#5A6A85]">
            Name
          </label>
          <InputText
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              console.log("FormData:", formData);
            }}
          />
        </div>

        {/* Active Switch */}
        <div className="p-field mb-4">
          <label
            htmlFor="active"
            className="font-bold mr-2 w-16 text-[#5A6A85]"
          >
            {formData.active ? "Active" : "Inactive"}
          </label>
          <InputSwitch
            id="active"
            checked={formData.active}
            onChange={(e) => {
              console.log("Switch value:", e.value);
              setFormData({ ...formData, active: e.value });
            }}
            className="ml-2 w-12"
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
