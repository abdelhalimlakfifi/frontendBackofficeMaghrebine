import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

// Image
import { FileUpload } from "primereact/fileupload";
import { InputSwitch } from "primereact/inputswitch";

// UpdateAt CreatedAt DeletedAt
import DateCDU from "../../components/Global/DateCDU";

// Data Column
import { dataCategorieTableColumns } from "../../components/Global/dataTableColumns";

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
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import DeleteDialog from "../../components/Global/DeleteDialog";

const CategoriesCrud = () => {
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

  const confirmDelete = async () => {
    if (selectedTypes && selectedTypes.length > 0) {
      // Delete multiple rows
      handleDeleteBySelecting(selectedTypes);
    } else if (selectedRowData) {
      // Delete a single row
      handleDelete(selectedRowData);
    }

    // Hide the delete dialog
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

  const [selectedType, setSelectedType] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    typeId: [],
    image: "",
    createdBy: "",
    updatedBy: "",
    deletedBy: "",
    deletedAt: null,
    createdAt: null,
    updatedAt: null,
  });

  // const [selectedTypeId, setSelectedTypeId] = useState("");
  // TODO: setSelectedTypeId = formData.typeId

  const clearForm = () => {
    setFormData({
      name: "",
      typeId: [],
      image: "",
      createdBy: "",
      updatedBy: "",
      deletedBy: "",
      deletedAt: null,
      createdAt: null,
      updatedAt: null,
    });

    setImageName(null);
    setImagePreview(null);
    imageRef.current.value = null;
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
        "http://localhost:3000/api/categorie/",
        token,
        unauthorizedCallback
      );
      setData(data);
      setShowDataTable(true);
    };

    fetchData();
  }, [submitted]);

  // POST
  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;

      if (!formData.name || imageRef.current.files.length === 0) {
        showNotification(
          "error",
          "Error",
          "Please enter Name, Image, and select Active status."
        );
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("typeIds", [formData.typeId]);

      if (imageRef.current.files.length > 0) {
        formDataToSend.append("category_image", imageRef.current.files[0]);
      }

      const response = await axios.post(
        "http://localhost:3000/api/categorie/store",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const responseData = response.data;

      if (responseData.message === "Category restored successfully") {
        showNotification("warn", "Warning", responseData.message);
        clearForm();
        setSubmitted(true);
        setNewDialogVisible(false);
      } else if (responseData.message === "Category already exists") {
        showNotification("error", "Error", responseData.message);
      } else if (responseData.message === "Category saved successfully") {
        showNotification("success", "Success", responseData.message);
        clearForm();
        setSubmitted(true);
        setNewDialogVisible(false);
      } else {
        showNotification("warn", "Warning", responseData.message);
      }
    } catch (error) {
      console.error("Error adding category:", error.message);
      showNotification(
        "error",
        "Error",
        "An unexpected error occurred while adding the category."
      );
    }
  };

  // Delete
  const handleDelete = async (rowData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    console.log(`Deleting category with ID: ${rowData._id}`);

    try {
      const response = await axios.delete(
        "http://localhost:3000/api/categorie/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            ids: [rowData._id], // Pass an array of IDs for single deletion
          },
        }
      );

      if (response.status === 200) {
        console.log("Category deleted successfully");
        // Should update data after successful delete
      }
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  // Delete by Selected Category
  const handleDeleteBySelecting = async (selectedCategories) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { token } = user;
    console.log("Deleting selected categories:", selectedCategories);

    try {
      if (!selectedCategories || !selectedCategories.length) {
        console.log("No categories selected for deletion.");
        return;
      }

      const identifiersToDelete = selectedCategories.map(
        (category) => category._id
      );

      const response = await axios.delete(
        `http://localhost:3000/api/categorie/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { ids: identifiersToDelete }, // Use "ids" instead of "identifiers"
        }
      );

      if (response.status === 200) {
        console.log("Categories deleted successfully:", identifiersToDelete);
      } else {
        console.error(
          "Failed to delete categories. Server returned:",
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error("Error deleting categories:", error.message);
    }
  };

  const options = formData.typeId.map((type) => ({
    label: type.name,
    // value: type._id,
  }));
  return (
    <div>
      <Toast ref={toast} />
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
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
          selectionMode="checkbox"
        >
          {dataCategorieTableColumns(
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
        header="Add Categories"
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

        <div className="field mb-4">
          <label htmlFor="name" className="font-bold text-[#5A6A85]">
            Type ID
          </label>
          <InputText
            id="name"
            value={formData.typeId}
            onChange={(e) =>
              setFormData({
                ...formData,
                typeId: [e.target.value],
              })
            }
          />
          {submitted && !formData.typeId && (
            <small className="p-error">typeId is required.</small>
          )}
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Active Switch */}
        <div className="p-field mb-4">
          <label htmlFor="active" className="font-bold text-[#5A6A85]">
            Active
          </label>
          <div>
            <InputSwitch
              id="active"
              name="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.value })}
            />
          </div>
        </div>

        {/* typeId */}
        <div className="p-field mb-4">
          <label htmlFor="name" className="font-bold text-[#5A6A85]">
            Type Id
          </label>
          <MultiSelect
            id="typeId"
            name="typeId"
            value={selectedType}
            onChange={(e) => setSelectedType(e.value)}
            options={options}
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
    </div>
  );
};

export default CategoriesCrud;
