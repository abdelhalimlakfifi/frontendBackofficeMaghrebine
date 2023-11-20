import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

// Image
import { FileUpload } from "primereact/fileupload";
import { InputSwitch } from "primereact/inputswitch";

// TableUtils.jsx
import {
  openNew,
  hideDialog,
  saveType,
  typeDialogFooter,
  leftToolbarTemplate,
  rightToolbarTemplate,
  exportCSV,
  // chooseOptions,
  // uploadOptions,
  // cancelOptions,
  // onFileUpload
  handleFileChange
} from "./TableUtils";

import { dataSubCategorieTableColumns } from "./dataTableColumns";

// Skeleton
import SkeletonDataTable from "./SkeletonDataTable";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

const SubCategoriesTable = () => {
  const [imageName, setImageName] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imageRef = useRef(null);

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
    image: "",
    createdBy: null,
    updatedBy: null,
    deletedAt: null,
    deletedBy: null,
    createdAt: null,
    updatedAt: null,
  });

  const clearForm = () => {
    setFormData({
      name: "",
      typeId: [],
      categorieId: [],
      active: false,
      image: "",
      createdBy: null,
      updatedBy: null,
      deletedAt: null,
      deletedBy: null,
      createdAt: null,
      updatedAt: null,
    });

    setImageName(null);
    setImagePreview(null);
    imageRef.current.value = null;
  };

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

  const handleSubmit = async () => {
    try {
      if (!formData.name || !imagePreview) {
        toast.current.show({
          severity: "error",
          summary: "Validation Error",
          detail: "all Fields are required.",
          life: 3000,
        });
        return;
      }

      const fileName = imageName;

      // Generate a unique id for Server Json
      const id = uuidv4();
      // for my data
      const _id = uuidv4();

      const newFormData = { id, _id, ...formData, image: fileName };

      const response = await axios.post(
        "http://localhost:3000/subCategories",
        newFormData
      );

      console.log("Response:", response.data);

      clearForm();
      setSubmitted(true);
      setNewDialogVisible(false);

      clearForm();

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

 const handleFileChange = (e) => {
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

  const typeIdOptions = formData.typeId.map((type, index) => ({
    label: type,
    value: type,
  }));

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
          rowsPerPageOptions={[5, 10, 25]}
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
        <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif"
            className="hidden"
            ref={imageRef}
            onChange={handleFileChange}
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
                className="w-40 h-40 m-auto rounded-full shadow"
                alt="Profile"
              />
            </div>
            <div
              className="mt-2"
              style={{ display: imagePreview ? "block" : "none" }}
            >
              <span
                className="block w-40 h-40 rounded-full m-auto shadow"
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
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
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

        {/* Created By & Created At */}
        <div className="flex items-center justify-between p-field mb-4 space-x-4">
          <div className="flex-1">
            <label htmlFor="createdBy" className="font-bold text-[#5A6A85]">
              Created By
            </label>
            <InputText
              id="createdBy"
              name="createdBy"
              value={formData.createdBy}
              onChange={(e) =>
                setFormData({ ...formData, createdBy: e.target.value })
              }
              readOnly
            />
          </div>
          <div className="flex-1">
            <label htmlFor="createdAt" className="font-bold text-[#5A6A85]">
              Created At
            </label>
            <Calendar
              id="createdAt"
              name="createdAt"
              // value={formData.createdAt}
              value={new Date(formData.createdAt)}
              showIcon
              showTime
              hourFormat="24"
              onChange={(e) =>
                setFormData({ ...formData, createdAt: e.target.value })
              }
              readOnly
            />
          </div>
        </div>

        {/* Updated By & Updated At */}
        <div className="flex items-center justify-between p-field mb-4 space-x-4">
          <div className="flex-1">
            <label htmlFor="updatedBy" className="font-bold text-[#5A6A85]">
              Updated By
            </label>
            <InputText
              id="updatedBy"
              name="updatedBy"
              value={formData.updatedBy}
              onChange={(e) =>
                setFormData({ ...formData, updatedBy: e.target.value })
              }
              readOnly
            />
          </div>
          <div className="flex-1">
            <label htmlFor="updatedAt" className="font-bold text-[#5A6A85]">
              Updated At
            </label>
            <Calendar
              id="updatedAt"
              name="updatedAt"
              value={new Date(formData.updatedAt)}
              showIcon
              showTime
              hourFormat="24"
              onChange={(e) =>
                setFormData({ ...formData, updatedAt: e.target.value })
              }
              readOnly
            />
          </div>
        </div>

        {/* Deleted By & Deleted At */}
        <div className="flex items-center justify-between p-field mb-4 space-x-4">
          <div className="flex-1">
            <label htmlFor="deletedBy" className="font-bold text-[#5A6A85]">
              Deleted By
            </label>
            <InputText
              id="deletedBy"
              name="deletedBy"
              value={formData.deletedBy}
              onChange={(e) =>
                setFormData({ ...formData, deletedBy: e.target.value })
              }
              readOnly
            />
          </div>
          <div className="flex-1">
            <label htmlFor="deletedAt" className="font-bold text-[#5A6A85]">
              Deleted At
            </label>
            <Calendar
              id="deletedAt"
              name="deletedAt"
              value={
                formData.deletedAt !== null
                  ? new Date(formData.deletedAt)
                  : null
              }
              showIcon
              showTime
              hourFormat="24"
              onChange={(e) =>
                setFormData({ ...formData, deletedAt: e.target.value })
              }
              readOnly
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SubCategoriesTable;