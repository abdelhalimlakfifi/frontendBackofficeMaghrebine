import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Dropdown } from "primereact/dropdown";

// UpdateAt CreatedAt DeletedAt
import DateCDU from "../../components/Global/DateCDU";

// Data Columns
import { dataSubCategorieTableColumns } from "../../components/Global/dataTableColumns";

// Skeleton
import SkeletonDataTable from "../../components/Global/SkeletonDataTable";

// TableUtils.jsx
import {
  openNew,
  hideDialog,
  leftToolbarTemplate,
  rightToolbarTemplate,
  exportCSV,
} from "../../components/Global/TableUtils";

const SubCategoriesCrud = () => {
  const [showDataTable, setShowDataTable] = useState(false);

  const toast = useRef(null);
  const dt = useRef(null);

  const [data, setData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(null);

  const [newDialogVisible, setNewDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

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

  // GET 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/subCategories");
        setData(response.data);
        setShowDataTable(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // POST
  const handleSubmit = async () => {
    try {
      if (!formData.name) {
        toast.current.show({
          severity: "error",
          summary: "Validation Error",
          detail: "all Fields are required.",
          life: 3000,
        });
        return;
      }

      // Generate a unique id for Server Json
      const id = uuidv4();
      // for my data
      const _id = uuidv4();

      const newFormData = { id, _id, ...formData };

      const response = await axios.post(
        "http://localhost:3000/subCategories",
        newFormData
      );

      console.log("Response:", response.data);

      clearForm();
      setSubmitted(true);
      setNewDialogVisible(false);

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Type added successfully.",
        life: 3000,
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "An error occurred while submitting the form.",
        life: 3000,
      });
    }
  };

  // Show name of type
  const typeIdOptions = formData.typeId.map((type, index) => ({
    label: type,
    value: type,
  }));

  // Show name of Category
  const categorieOptions = formData.categorieId.map((type, index) => ({
    label: type,
    value: type,
  }));

  return (
    <div>
      <Toast ref={toast} />
      <Toolbar
        className="mb-4"
        left={() =>
          leftToolbarTemplate(
            () => openNew(setSubmitted, setNewDialogVisible, setFormData),
            selectedTypes
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
          {dataSubCategorieTableColumns(setFormData, setEditDialogVisible).map(
            (col, index) => (
              <Column key={index} {...col} />
            )
          )}
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
        // footer={typeDialogFooter(
        //   () => hideDialog(setSubmitted, setNewDialogVisible),
        //   () => saveType(setSubmitted, setNewDialogVisible)
        // )}
        onHide={() => hideDialog(setSubmitted, setNewDialogVisible)}
      >
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
              setFormData({ ...formData, typeId: [e.target.value] })
            }
          />
          {submitted && !formData.typeId && (
            <small className="p-error">typeId is required.</small>
          )}
        </div>

        <div className="field mb-4">
          <label htmlFor="name" className="font-bold text-[#5A6A85]">
            Category ID
          </label>
          <InputText
            id="name"
            value={formData.categorieId}
            onChange={(e) =>
              setFormData({ ...formData, categorieId: [e.target.value] })
            }
          />
          {submitted && !formData.categorieId && (
            <small className="p-error">typeId is required.</small>
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
            onChange={(e) => setFormData({ ...formData, active: e.value })}
            className="ml-2 w-12"
          />
        </div>

        <div className="text-center mt-4">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
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
        // footer={typeDialogFooter(
        //   () => hideDialog(setSubmitted, setEditDialogVisible),
        //   () => saveType(setSubmitted, setEditDialogVisible)
        // )}
        onHide={() => hideDialog(setSubmitted, setEditDialogVisible)}
      >
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
          <Dropdown
            id="typeId"
            name="typeId"
            value={formData.typeId}
            onChange={(e) =>
              setFormData({ ...formData, typeId: [e.target.value] })
            }
            options={typeIdOptions}
            placeholder="Select Type Id"
          />
        </div>

        {/* categorieOptions */}
        <div className="p-field mb-4">
          <label htmlFor="name" className="font-bold text-[#5A6A85]">
            Categorie Id
          </label>
          <Dropdown
            id="categorieId"
            name="categorieId"
            value={formData.categorieId}
            onChange={(e) =>
              setFormData({ ...formData, categorieId: [e.target.value] })
            }
            options={categorieOptions}
            placeholder="Select categorie Id"
          />
        </div>

        <DateCDU formData={formData} setFormData={setFormData} />
      </Dialog>
    </div>
  );
};

export default SubCategoriesCrud;
