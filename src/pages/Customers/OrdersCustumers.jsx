import { BreadCrumb } from "primereact/breadcrumb";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OrdersServices } from "./OrderData/Order.data";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function OrdersCustumers(id) {
  console.log("id ", id.id);
  const toast = useRef(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const [displayedOrders, setDisplayedOrders] = useState([]);
  const items = [{ label: "Orders" }];
  const home = { icon: "pi pi-home", url: "/" };
  const navigate = useNavigate();

  useEffect(() => {
    // console.clear(); // eslint-disable-line no-console

    const unauthorizedCallback = () => {
      alert("Unauthorized access! Redirecting to login.");
      navigate("/login");
    };
    let getCustomers = async () => {
      let data = await OrdersServices.getOrdersData(
        unauthorizedCallback,
        id.id
      );

      if (data) {
        setOrders(data.orders);
        setDisplayedOrders(data.orders);
        setLoading(false);
      }
    };
    getCustomers();
    // }, [customers, navigate]); // bug !: makat affichich data dyal customers each time it update
  }, []);
  const searchable = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    // Use setDisplayedUsers to update the state with the filtered array
    setDisplayedOrders(
      orders.filter((user) => {
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
  return (
    <>
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
            value={displayedOrders}
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
              //   body={(row) => fullname(row)}
            />
            <Column field={"username"} header="Username" sortable />
            <Column field={"email"} header="email" sortable />
            <Column field={"valid_account"} header="Active " sortable />
            <Column
              field={"deleted"}
              header="deleted "
              sortable
              //   body={(row) => deleteAt(row)}
            />
            <Column header="Actions" body={(row) => actions(row)} />
          </DataTable>
        )}
      </div>
    </>
  );
}
