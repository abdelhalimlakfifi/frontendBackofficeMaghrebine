import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

function CrudTypes() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="card flex justify-content-center">
      <Button label="New" icon="pi pi-plus" severity="success" text  onClick={() => setVisible(true)}/>

      <Dialog
        header="Header"
        visible={visible}
        maximizable
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <p className="m-0">
          we will be putting the create new type form here that will include the name , its categories description , thumbnail photo ext ..
        </p>
      </Dialog>
    </div>
  );
}

export default CrudTypes;
