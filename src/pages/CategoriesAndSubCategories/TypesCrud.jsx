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


// Image
import { FileUpload } from "primereact/fileupload";
import { InputSwitch } from "primereact/inputswitch";

// UpdateAt CreatedAt DeletedAt
import DateCDU from "../../components/Global/DateCDU";

// Data Column
import { dataTypeTableColumns } from "../../components/Global/dataTableColumns";

// Skeleton
import SkeletonDataTable from "../../components/Global/SkeletonDataTable";

// TableUtils.jsx
import {
  openNew,
  hideDialog,
  typeDialogFooter,
  leftToolbarTemplate,
  rightToolbarTemplate,
  exportCSV,
  handleFileChange,
  // handleDeleteBySelecting,
} from "../../components/Global/TableUtils";

import { get } from "../../utils/request";
import { Button } from "primereact/button";

const TypesCrud = () => {
  // ------------------------------to fix
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const openDeleteDialog = (rowData) => {
    setSelectedRowData(rowData);
    setDeleteDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setSelectedRowData(null);
    setDeleteDialogVisible(false);
  };

  const confirmDelete = async () => {
    handleDelete(selectedRowData);
    hideDeleteDialog();
  };
  // ------------------------------

  const [showDataTable, setShowDataTable] = useState(false);

  const [imageName, setImageName] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imageRef = useRef(null);

  const toast = useRef(null);
  const dt = useRef(null);

  const [data, setData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
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
        "http://localhost:3000/api/type/",
        token,
        unauthorizedCallback
      );
      setData(data);
      setShowDataTable(true);
    };

    fetchData();
  }, [submitted, setData, setShowDataTable]);

  // POST
  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;

    try {
      if (!formData.name || imageRef.current.files.length === 0) {
        toast.current.show({
          severity: "error",
          summary: "Validation Error",
          detail: "Please enter Name, Image, and select Active status.",
        });
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("active", formData.active);

      if (imageRef.current.files.length > 0) {
        formDataToSend.append("image", imageRef.current.files[0]);
      }

      const response = await axios.post(
        "http://localhost:3000/api/type/store",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the successful response, e.g., show a success message
      console.log("Type added successfully:", response.data);

      // Show success toast
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Type added successfully.",
      });

      clearForm();
      setSubmitted(true);
      setNewDialogVisible(false);
    } catch (error) {
      console.error("Error adding type:", error.message);
    }
  };

  // DELETE
  const handleDelete = async (rowData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;

    try {
      const response = await axios.delete(
        "http://localhost:3000/api/type/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            ids: [rowData._id], // Pass the ID in the request body
          },
        }
      );

      if (response.status === 200) {
        console.log("deleted successfully");

        // Should update data after successful delete
      }
    } catch (error) {
      console.error("Error deleting type", error);
    }
  };

  // DELETE BY SELECTION
  const handleDeleteBySelecting = async (selectedTypes) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { token } = user;
    console.log("Deleting selected types :", selectedTypes);
    try {
      if (!selectedTypes || !selectedTypes.length) {
        console.log("No types selected for deletion.");
        return;
      }

      const idsToDelete = selectedTypes.map((type) => type._id);

      const response = await axios.delete(
        `http://localhost:3000/api/type/delete`,
        {
          data: { ids: idsToDelete },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Items deleted successfully:", idsToDelete);
      } else {
        console.error(
          "Failed to delete types. Server returned:",
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error("Error deleting types:", error.message);
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
            () => handleDeleteBySelecting(selectedTypes)
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

      <Dialog
        visible={newDialogVisible}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add Type"
        modal
        className="p-fluid"
        footer={typeDialogFooter(
          () => hideDialog(setSubmitted, setNewDialogVisible),
          handleSubmit
        )}
        onHide={() => hideDialog(setSubmitted, setNewDialogVisible)}
      >
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

        <div className="field mb-4">
          <label htmlFor="name" className="font-bold text-[#5A6A85]">
            Name
          </label>
          <InputText
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {submitted && !formData.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>

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

      <Dialog
        visible={editDialogVisible}
        style={{ width: "50rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add Type"
        modal
        className="p-fluid"
        footer={typeDialogFooter(
          () => hideDialog(setSubmitted, setEditDialogVisible),
          () => editType(formData)
        )}
        onHide={() => hideDialog(setSubmitted, setEditDialogVisible)}
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

      <Dialog
        visible={deleteDialogVisible}
        style={{ width: "25rem" }}
        header="Confirm"
        modal
        className="p-fluid"
        footer={
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text"
              onClick={hideDeleteDialog}
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              className="p-button-text"
              onClick={confirmDelete}
            />
          </div>
        }
        onHide={hideDeleteDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>Are you sure you want to delete the selected type(s)?</span>
        </div>
      </Dialog>
    </>
  );
};

export default TypesCrud;
