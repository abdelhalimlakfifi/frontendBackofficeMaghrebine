// TypesTable.jsx
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
  saveType,
  typeDialogFooter,
  leftToolbarTemplate,
  rightToolbarTemplate,
  exportCSV,
  handleFileChange,
} from "../../components/Global/TableUtils";

const TypesCrud = () => {
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

    setImageName(null);
    setImagePreview(null);
    imageRef.current.value = null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/types");
        setData(response.data);
        setShowDataTable(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [submitted]);

  // POST
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

      // Extract the file name from the image preview
      const fileName = imageName;

      // Generate a unique id for Server Json
      const id = uuidv4();
      // for my data
      const _id = uuidv4();

      const newFormData = { id, _id, ...formData, image: fileName };

      const response = await axios.post(
        "http://localhost:3000/types",
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

  // DELETE Should fix it
  const handleDelete = async () => {
    try {
      console.log(selectedTypes);
      // Extract the array of IDs from selectedTypes
      const idsToDelete = selectedTypes.map((type) => type.id);
      console.log(idsToDelete);

      await axios.delete(`http://localhost:3000/types/${idsToDelete}`);

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Types deleted successfully.",
        life: 3000,
      });

      setSubmitted(true);
      setSelectedTypes(null);
    } catch (error) {
      console.error("Error deleting types:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "An error occurred while deleting types.",
        life: 3000,
      });
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
            handleDelete
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
          {dataTypeTableColumns(setFormData, setEditDialogVisible).map(
            (col, index) => (
              <Column key={index} {...col} />
            )
          )}
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

      <Dialog
        visible={editDialogVisible}
        style={{ width: "50rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add Type"
        modal
        className="p-fluid"
        footer={typeDialogFooter(
          () => hideDialog(setSubmitted, setEditDialogVisible),
          () => saveType(setSubmitted, setEditDialogVisible)
        )}
        onHide={() => hideDialog(setSubmitted, setEditDialogVisible)}
      >
        {/* Image */}
        <div className="flex items-center gap-2 mb-4">
          <div>
            <img
              src={formData.image}
              alt="Uploaded Image"
              className="h-16 w-16 rounded-full shadow-lg"
            />
          </div>
          <div>
            <FileUpload
              mode="basic"
              accept="image/*"
              chooseLabel="Change Image"
              auto
              customUpload
              // uploadHandler={onFileUpload}
            />
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

        <DateCDU formData={formData} setFormData={setFormData} />
      </Dialog>
    </>
  );
};

export default TypesCrud;
