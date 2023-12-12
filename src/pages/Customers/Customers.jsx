import { useRef, useState } from "react";
import Layout from "../../layouts/layouts";
import { BreadCrumb } from "primereact/breadcrumb";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";
import { Link, useNavigate } from "react-router-dom";
import { CustomersServices } from "./CustomerData/customer.data";
import { useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { Toast } from "primereact/toast";
import { del } from "../../utils/request";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Tag } from "primereact/tag";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [displayedCustomers, setDisplayedCustomers] = useState([]);
  const items = [{ label: "Customers" }];
  const home = { icon: "pi pi-home", url: "/" };

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.clear(); // eslint-disable-line no-console

    const unauthorizedCallback = () => {
      alert("Unauthorized access! Redirecting to login.");
      navigate("/login");
    };
    let getCustomers = async () => {
      let data = await CustomersServices.getCustomersData(unauthorizedCallback);

      setCustomers(data.customers);
      setDisplayedCustomers(data.customers);
      setLoading(false);
    };
    getCustomers();
    // }, [customers, navigate]); // bug !: makat affichich data dyal customers each time it update
  }, []);
  // console.log("customers ", customers);
  // searching bar logic
  const searchable = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    // Use setDisplayedUsers to update the state with the filtered array
    setDisplayedCustomers(
      customers.filter((user) => {
        const firstName = user.first_name.toLowerCase();
        const lastName = user.last_name.toLowerCase();
        return firstName.includes(searchTerm) || lastName.includes(searchTerm);
      })
    );
  };

  const header = (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <span>
        <i className="pi pi-search" style={{ margin: "4px 4px 0 0" }}></i>
        <InputText type="search" onInput={searchable} placeholder="Search" />
      </span>
    </div>
  );
  const token = JSON.parse(localStorage.getItem("user")).token;
  const unauthorizedCallback = () => {
    // This function will be called if the request is unauthorized (status code 401)
    alert("Unauthorized access! Redirecting to login.");
    // You can also use react-router's useNavigate here
    navigate("/login");
  };
  const toast = useRef(null);
  const handleDeleteUser = async (row) => {
    confirmDialog({
      message: `Do you want to delete ${row.first_name + " " + row.last_name}?`,
      header: `Delete ${row.first_name + row.last_name} Confirmation`,
      icon: "pi pi-info-circle",
      acceptClassName: "bg-light-gold border-0",
      rejectClassName: "text-light-gold bg-transparent border-0",
      accept: async () => {
        try {
          const response = await del(
            `http://localhost:3000/api/customer/${row._id}`,
            token,
            unauthorizedCallback
          );

          if (response.errors && response.errors.length > 0) {
            response.errors.forEach((err) => {
              toast.current.show({
                severity: "error",
                summary: err.attribute,
                detail: err.error,
              });
            });
          } else {
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "Customer deleted successfully",
            });
            const getCustomers = async () => {
              const data = await CustomersServices.getCustomersData(
                unauthorizedCallback
              );

              setCustomers(data.customers);
              setDisplayedCustomers(data.customers);
              setLoading(false);
            };
            getCustomers();
          }
        } catch (error) {
          console.error("Error deleting customer:", error);
        }
      },
    });
  };
  const actions = (row) => {
    return (
      <div className="flex space-x-4">
        <Link to={`/infoCustomer`} state={row}>
          <Button
            className="text-sm bg-light-gold border-none"
            tooltip="Edite user"
            tooltipOptions={{ position: "top" }}
            icon="pi-user"
          />
        </Link>
        <Button
          icon="pi pi-trash"
          className="bg-transparent border-light-gold text-light-gold"
          tooltip="Delete user"
          tooltipOptions={{ position: "top" }}
          onClick={() => handleDeleteUser(row)}
        />
      </div>
    );
  };
  const getSeverity = (active) => {
    switch (active) {
      case true:
        return "success";

      case false:
        return "danger";

      default:
        return null;
    }
  };

  const activeBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.valid_account ? "Active" : "Inactive"}
        severity={getSeverity(rowData.valid_account)}
      ></Tag>
    );
  };
  const deleteAt = (rowData) => {
    return (
      <Tag
        value={rowData.deletedBy ? "Active" : "Inactive"}
        severity={getSeverity(rowData.deletedBy)}
      ></Tag>
    );
  };

  const fullname = (row) => {
    // console.log(row.profile_picture);
    return (
      <div className="flex space-x-2">
        {row.profile_picture ? (
          <Avatar
            image={`http://localhost:3000/api/${row.profile_picture}`}
            size="small"
            shape="circle"
            className="hidden md:inline-flex"
          />
        ) : (
          <Avatar
            label={row.last_name.toUpperCase()[0]}
            size="small"
            shape="circle"
            className="hidden md:inline-flex"
          />
        )}
        <p className="flex items-center">
          {`${row.last_name} ${row.first_name}`}
        </p>
      </div>
    );
  };

  return (
    <Layout>
      <BreadCrumb model={items} home={home} />
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="card">
        {loading ? (
          <div>
            <DataTable
              value={Array.from({ length: 5 }, (v, i) => i)}
              className="p-datatable-striped"
            >
              <Column
                field="code"
                header="Full name"
                style={{ width: "25%" }}
                body={<Skeleton />}
              ></Column>
              {/* <Column
                field="name"
                header="Username"
                style={{ width: "25%" }}
                body={<Skeleton />}
              ></Column> */}
              <Column
                field="category"
                header="email"
                style={{ width: "25%" }}
                body={<Skeleton />}
              ></Column>
              <Column
                field="quantity"
                header="Role"
                style={{ width: "25%" }}
                body={<Skeleton />}
              ></Column>
              <Column
                field="deleted"
                header="deleted"
                style={{ width: "25%" }}
                body={<Skeleton />}
              ></Column>
              <Column
                field="quantity"
                header="Actions"
                style={{ width: "25%" }}
                body={<Skeleton />}
              ></Column>
            </DataTable>
          </div>
        ) : (
          <DataTable
            value={displayedCustomers}
            paginator
            loading={loading}
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            header={header}
            scrollable
            showGridlines
            stripedRows
          >
            <Column
              field={"last_name"}
              header="Full name"
              sortable
              body={(row) => fullname(row)}
            />
            <Column field={"email"} header="email" sortable />
            <Column
              field={"valid_account"}
              header="Active "
              sortable
              body={(rowData) => activeBodyTemplate(rowData)}
            />
            <Column
              field={"deleted"}
              header="deleted"
              sortable
              body={(row) => deleteAt(row)}
            />
            <Column header="Actions" body={(row) => actions(row)} />
          </DataTable>
        )}
      </div>
    </Layout>
  );
}
