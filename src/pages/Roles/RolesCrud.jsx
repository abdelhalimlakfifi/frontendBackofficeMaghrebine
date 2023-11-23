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
import { dataRoleTableColumns } from "../../components/Global/dataTableColumns";

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
  // handleFileChange,
  // onDelete
  // chooseOptions,
  // uploadOptions,
  // cancelOptions,
  // handleImageChange,
  // onFileUpload,
} from "../../components/Global/TableUtils";

const RolesCrud = () => {
  const [showDataTable, setShowDataTable] = useState(false);

  const toast = useRef(null);
  const dt = useRef(null);

  const [data, setData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(null);

  const [newDialogVisible, setNewDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

  const [formData, setFormData] = useState({
    role: "",
    permessions: [],
    createdBy: "",
    updatedBy: "",
    deletedBy: "",
    deletedAt: null,
    createdAt: null,
    updatedAt: null,
  });

  const clearForm = () => {
    setFormData({
      role: "",
      permessions: [],
      createdBy: "",
      updatedBy: "",
      deletedBy: "",
      deletedAt: null,
      createdAt: null,
      updatedAt: null,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/roles");
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
      if (!formData.role || !formData.permessions) {
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
        "http://localhost:3000/roles",
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

      await axios.delete(`http://localhost:3000/roles/${idsToDelete}`);

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
          {dataRoleTableColumns(setFormData, setEditDialogVisible).map(
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
        <div className="field mb-4">
          <label htmlFor="role" className="font-bold text-[#5A6A85]">
            Role
          </label>
          <InputText
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          {submitted && !formData.role && (
            <small className="p-error">Role is required.</small>
          )}
        </div>

        <div className="field mb-4">
          <label htmlFor="permessions" className="font-bold text-[#5A6A85]">
            Permession
          </label>
          <InputText
            id="permessions"
            value={formData.permessions}
            onChange={(e) =>
              setFormData({ ...formData, permessions: [e.target.value] })
            }
          />
          {submitted && !formData.permessions && (
            <small className="p-error">Permession is required.</small>
          )}
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

export default RolesCrud;
