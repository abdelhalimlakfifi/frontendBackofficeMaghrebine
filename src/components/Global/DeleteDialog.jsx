// DeleteConfirmationDialog.jsx
import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const DeleteDialog = ({ visible, onHide, confirmDelete }) => {
  return (
    <Dialog
      visible={visible}
      style={{ width: "25rem" }}
      header="Confirm"
      modal
      className="p-fluid"
      footer={
        <div>
          <Button
            label="No"
            icon="pi pi-times"
            className="bg-light-gold border-light-gold"
            onClick={onHide}
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            className="bg-light-gold border-light-gold"
            onClick={confirmDelete}
          />
        </div>
      }
      onHide={onHide}
    >
      <div className="confirmation-content">
        <i
          className="pi pi-exclamation-triangle p-mr-3"
          style={{ fontSize: "2rem" }}
        />
        <span>Are you sure you want to delete the selected type(s)?</span>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
