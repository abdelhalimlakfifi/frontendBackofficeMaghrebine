import { useState } from "react";
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
    const getCustomers = async () => {
      const data = await CustomersServices.getCustomersData(
        unauthorizedCallback
      );

      setCustomers(data.customers);
      setDisplayedCustomers(data.customers);
      setLoading(false);
    };
    getCustomers();
  }, []);
  useEffect(() => {}, [customers]);
  // console.log("customers ", customers);
  // searching bar logic
  const searchable = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    // Use setDisplayedUsers to update the state with the filtered array
    setDisplayedCustomers(
      customers.filter((user) => {
        const firstName = user.first_name.toLowerCase();
        const lastName = user.last_name.toLowerCase();
        const username = user.username.toLowerCase();

        return (
          firstName.includes(searchTerm) ||
          lastName.includes(searchTerm) ||
          username.includes(searchTerm)
        );
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
      {/* <Link to="/add-user">
        <Button
          label="New user"
          className=" text-sm bg-light-gold border-none"
          icon="pi pi-user-plus"
        />
      </Link> */}
      <span>
        <i className="pi pi-search" style={{ margin: "4px 4px 0 0" }}></i>
        <InputText type="search" onInput={searchable} placeholder="Search" />
      </span>
    </div>
  );
  const actions = (row) => {
    return (
      <div className="flex space-x-4">
        <Button
          label="Edit"
          className=" text-sm bg-light-gold border-none"
          icon="pi pi-user-edit"
        />
        <Button
          icon="pi pi-trash"
          className="bg-transparent border-light-gold text-light-gold"
          tooltip="Delete user"
          tooltipOptions={{ position: "top" }}
        />
      </div>
    );
  };
  const fullname = (row) => {
    console.log(row.profile_picture);
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
              <Column
                field="name"
                header="Username"
                style={{ width: "25%" }}
                body={<Skeleton />}
              ></Column>
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
            <Column field={"username"} header="Username" sortable />
            <Column field={"email"} header="email" sortable />
            <Column field={"valid_account"} header="Active " sortable />
            <Column header="Actions" body={(row) => actions(row)} />
          </DataTable>
        )}
      </div>
    </Layout>
  );
}
