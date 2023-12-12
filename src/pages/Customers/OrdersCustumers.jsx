import { BreadCrumb } from "primereact/breadcrumb";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OrdersServices } from "./OrderData/Order.data";
import { Button } from "primereact/button";
import { del, post } from "../../utils/request";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

export default function OrdersCustumers(Props) {
  const { id } = Props;
  const [idCustomer, setIdCustomer] = useState(id);

  const toast = useRef(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState({});
  const items = [{ label: "Orders" }];
  const home = { icon: "pi pi-home", url: "/" };
  const navigate = useNavigate();

  useEffect(() => {
    console.clear(); // eslint-disable-line no-console

    const unauthorizedCallback = () => {
      alert("Unauthorized access! Redirecting to login.");
      navigate("/login");
    };
    let getCustomers = async () => {
      let data = await OrdersServices.getOrdersData(unauthorizedCallback, id);

      if (data) {
        setOrders(data.order);
        setLoading(false);
      }
    };
    getCustomers();
  }, []);

  const token = JSON.parse(localStorage.getItem("user")).token;
  const unauthorizedCallback = () => {
    // This function will be called if the request is unauthorized (status code 401)
    alert("Unauthorized access! Redirecting to login.");
    // You can also use react-router's useNavigate here
    navigate("/login");
  };

  const handleDeleteUser = async (row) => {
    confirmDialog({
      message: `Do you want to delete this Order?`,
      header: `Delete Order Confirmation`,
      icon: "pi pi-info-circle",
      acceptClassName: "bg-light-gold border-0",
      rejectClassName: "text-light-gold bg-transparent border-0",
      accept: async () => {
        try {
          const response = await del(
            `http://localhost:3000/api/order/${row._id}`,
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

            let getCustomers = async () => {
              let data = await OrdersServices.getOrdersData(
                unauthorizedCallback,
                idCustomer
              );

              if (data) {
                setOrders(data.order);
                setLoading(false);
              }
            };
            getCustomers();
          }
        } catch (error) {
          console.error("Error deleting customer:", error);
        }
      },
    });
  };
  const getSeverity = (product) => {
    switch (product) {
      case "Pending":
        return "warning";

      case "Delivered":
        return "success";

      case "Shipped":
        return "info";

      case "Return":
        return "danger";

      default:
        return null;
    }
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)}></Tag>
    );
  };
  const [visible, setVisible] = useState(false);
  const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "Shipped", value: "Shipped" },
    { label: "Delivered", value: "Delivered" },
    { label: "Return", value: "Return" },
  ];
  const [status, setSelectedStatus] = useState({ status: null });
  const [userId, setUserId] = useState(null);

  const updateStatus = async () => {
    try {
      setLoading(true);
      console.log("status ", status);
      const response = await post(
        `http://localhost:3000/api/order/${userId}`,
        token,
        status,
        unauthorizedCallback
      );
      console.log("response.errors ", response);

      if (response.errors && response.errors.length > 0) {
        console.log("response.errors ", response);
        response.errors.forEach((err) => {
          toast.current.show({
            severity: "error",
            summary: err,
            detail: err,
          });
        });
      } else {
        let getCustomers = async () => {
          let data = await OrdersServices.getOrdersData(
            unauthorizedCallback,
            idCustomer
          );

          if (data) {
            setOrders(data.order);
            setLoading(false);
          }
        };
        getCustomers();
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Customer saved successfully",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);

      // Handle error state or display a toast for the error
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "An error occurred while updating status",
      });
    } finally {
      setLoading(false);
    }
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
            onClick={() => {
              setUserId(row._id);
              setVisible(true);
            }}
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
            value={orders}
            paginator
            loading={loading}
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            scrollable
            showGridlines
            stripedRows
          >
            {/* <Column field="_id" header="Order ID" sortable /> */}
            {/* <Column field="customer_id" header="Customer ID" sortable /> */}
            <Column
              body={(rowData) => (
                <div>
                  {rowData.order_items.map((item, index) => (
                    <div key={index}>
                      <hr />
                      <span> Product Ref:</span> {item.product_id.ref} <br />
                      <span> Quantity:</span> {item.quantity}
                      <hr />

                    </div>
                  ))}
                </div>
              )}
              header="Order Items"
              sortable
            />
            <Column
              field="cart_total_price"
              header="Cart Total Price"
              sortable
            />
            <Column field="createdAt" header="Created At" sortable />
            <Column field="updatedAt" header="Updated At" sortable />
            <Column
              field="status"
              body={(data) => statusBodyTemplate(data)}
              header="Status"
              sortable
            />
            <Column header="Actions" body={(row) => actions(row)} />
          </DataTable>
        )}
      </div>
      <Dialog visible={visible} maximizable onHide={() => setVisible(false)}>
        <div>
          {/* Dropdown for status options */}
          <Dropdown
            value={status}
            options={statusOptions}
            onChange={(e) => setSelectedStatus({ status: e.value })}
            placeholder="Select Status"
          />
          <Button
            label="Submit"
            icon="pi pi-check"
            loading={loading}
            onClick={updateStatus}
          />
        </div>
      </Dialog>
    </>
  );
}
