import React, {useState, useEffect} from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { UsersServices } from "./userData/user.data";
import Layout from "../../layouts/layouts";


function Users() {
  const [products, setProducts] = useState([]);
  const columns = [
    { field: "code", header: "Code" },
    { field: "name", header: "Name" },
    { field: "category", header: "Category" },
    { field: "quantity", header: "Quantity" },
  ];

  useEffect(() => {
    console.log(UsersServices)
  }, []);

  return (
    <Layout>
      <div className="card">
        <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
          {columns.map((col, i) => (
            <Column key={col.field} field={col.field} header={col.header} />
          ))}
        </DataTable>
      </div>
    </Layout>
  );
}

export default Users;
