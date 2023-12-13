// SubCategoriesTable.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { MultiSelect } from "primereact/multiselect";
import { InputSwitch } from "primereact/inputswitch";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

// Configuration Dotenv
const apiUrlSubCategory = 'http://localhost:3000/api/subcategorie';
const apiUrlCategory = 'http://localhost:3000/api/categorie';
const apiUrlType = 'http://localhost:3000/api/type';

// Skeleton
import SkeletonDataTable from "../../components/Global/SkeletonDataTable";

// Data Column
import { dataSubCategorieTableColumns } from "../../components/Global/dataTableColumns";

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

const SubCategoriesCrud = () => {
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

  const [selectedType, setSelectedType] = useState(null);

  const [typeOptions, setTypeOptions] = useState([]);
  const [categorieOptions, setCategorieOptions] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    typeId: [],
    categorieId: [],
    active: false,
    createdBy: "",
    updatedBy: "",
    deletedBy: "",
    deletedAt: null,
    createdAt: null,
    updatedAt: null,
  });

  const clearForm = () => {
    setFormData({
      name: "",
      typeId: [],
      categorieId: [],
      active: false,
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

      try {
        const subCategoryData = await get(
          `${apiUrlSubCategory}`,
          token,
          unauthorizedCallback
        );

        // Fetch type options
        const typeData = await get(`${apiUrlType}`, token);
        // Fetch Categorie options
        const categorieData = await get(`${apiUrlCategory}`, token);

        setData(subCategoryData);
        setTypeOptions(typeData);
        setCategorieOptions(categorieData);
        setShowDataTable(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [submitted, deleted]);

  // POST
  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;

      const { name, typeId, categorieId } = formData;

      const formDataToSend = {
        name,
        typeIds: typeId.map((type) => type._id),
        categorieIds: categorieId.map((categorie) => categorie._id),
      };

      const response = await axios.post(
        `${apiUrlSubCategory}/store`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      const responseData = response.data || {};

      if (responseData.message === "SubCategory restored successfully") {
        showNotification("warn", "Warning", responseData.message);
        clearForm();
        setSubmitted(true);
        setNewDialogVisible(false);
      } else if (responseData.message === "SubCategory already exists") {
        showNotification("error", "Error", responseData.message);
      } else if (responseData.message === "SubCategory saved successfully") {
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

      const response = await axios.delete(`${apiUrlSubCategory}/delete`, {
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

  return (
    <>
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
          {dataSubCategorieTableColumns(
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
        header="Add SubCategory"
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
          <label htmlFor="name" className="font-bold text-[#5A6A85]">
            Name
          </label>
          <InputText
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* typeId */}
        <div className="p-field mb-4">
          <label htmlFor="typeId" className="font-bold text-[#5A6A85]">
            Type ID
          </label>
          <MultiSelect
            id="typeId"
            name="typeId"
            value={formData.typeId}
            onChange={(e) => setFormData({ ...formData, typeId: e.value })}
            options={typeOptions}
            optionLabel="name" // Assuming 'name' is the property you want to display
            placeholder="Select Type ID"
          />
        </div>

        {/* categorieId */}
        <div className="p-field mb-4">
          <label htmlFor="categorieId" className="font-bold text-[#5A6A85]">
            Categorie Id
          </label>
          <MultiSelect
            id="categorieId"
            name="categorieId"
            value={formData.categorieId}
            onChange={(e) => setFormData({ ...formData, categorieId: e.value })}
            options={categorieOptions}
            optionLabel="name" // Assuming 'name' is the property you want to display
            placeholder="Select Type ID"
          />
        </div>

        {/* Active */}
        {/* <div className="field mb-4 flex">
          <label
            htmlFor="active"
            className="font-bold mr-2 w-16 text-[#5A6A85]"
          >
            {formData.active ? "Active" : "Inactive"}
          </label>
          <InputSwitch
            id="active"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.value })}
            className="ml-2 w-12"
          />
        </div> */}
      </Dialog>

      <DeleteDialog
        visible={deleteDialogVisible}
        onHide={hideDeleteDialog}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default SubCategoriesCrud;
