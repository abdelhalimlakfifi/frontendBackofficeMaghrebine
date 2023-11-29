import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { UsersServices } from "./userData/user.data";
import Layout from "../../layouts/layouts";
import { useNavigate } from "react-router";
import { Avatar } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from "react-router-dom";
import { Skeleton } from 'primereact/skeleton';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const items = [{ label: 'Users' }];
    const home = { icon: 'pi pi-home', url: '/' }

    const navigate = useNavigate();

    useEffect(() => {
        console.clear(); // eslint-disable-line no-console

        const unauthorizedCallback = () => {
            alert("Unauthorized access! Redirecting to login.");
            navigate("/login");
        };
        const getUsers = async () => {
            const data = await UsersServices.getAllUsers(unauthorizedCallback);

            setUsers(data);
            setDisplayedUsers(data);
            setLoading(false);
        };
        getUsers();
    }, []);

    useEffect(() => {
        
    }, [users]);

    const searchable = (e) => {
        const searchTerm = e.target.value.toLowerCase();
    
        // Use setDisplayedUsers to update the state with the filtered array
        setDisplayedUsers(users.filter(user => {
            const firstName = user.first_name.toLowerCase();
            const lastName = user.last_name.toLowerCase();
            const username = user.username.toLowerCase();

            return (
                firstName.includes(searchTerm) ||
                lastName.includes(searchTerm) ||
                username.includes(searchTerm)
            );
        }));
    }

    const header = (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link to="/add-user">
                <Button label="New user" className=" text-sm bg-light-gold border-none" icon="pi pi-user-plus" />
            </Link>
            <span>
                <i className="pi pi-search" style={{ margin: "4px 4px 0 0" }}></i>
                <InputText
                    type="search"
                    onInput={searchable}
                    placeholder="Search"
                />
            </span>
        </div>
    );

    const fullname = (row) => {
        console.log(row.profile_picture);
        return (
            <div className="flex space-x-2">
                {row.profile_picture ? (
                    <Avatar  image={`http://localhost:3000/api/${row.profile_picture}`} size="small" shape="circle" className="hidden md:inline-flex" />
                ): (
                    <Avatar  label={row.last_name.toUpperCase()[0]} size="small" shape="circle" className="hidden md:inline-flex" />
                )}
                <p className="flex items-center">
                    {`${row.last_name} ${row.first_name}`}
                </p>
            </div>
        )
    }

    const actions = (row) => {
        return (
            <div className="flex space-x-4">
                <Button label="Edit" className=" text-sm bg-light-gold border-none" icon="pi pi-user-edit"  />
                <Button icon="pi pi-trash" className="bg-transparent border-light-gold text-light-gold" tooltip="Delete user" tooltipOptions={{  position: 'top' }}/>
            </div>
        )
    }
    return (
        <Layout>
            <BreadCrumb model={items} home={home} />

            <div className="card">

                {loading ?  (
                    <div>
                        <DataTable value={Array.from({ length: 5 }, (v, i) => i)} className="p-datatable-striped">
                            <Column field="code" header="Full name" style={{ width: '25%' }} body={<Skeleton />}></Column>
                            <Column field="name" header="Username" style={{ width: '25%' }} body={<Skeleton />}></Column>
                            <Column field="category" header="email" style={{ width: '25%' }} body={<Skeleton />}></Column>
                            <Column field="quantity" header="Role" style={{ width: '25%' }} body={<Skeleton />}></Column>
                            <Column field="quantity" header="Actions" style={{ width: '25%' }} body={<Skeleton />}></Column>
                        </DataTable>
                    </div>
                ) : (
                <DataTable
                    value={displayedUsers}
                    paginator
                    loading={loading}
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    header={header}
                    scrollable
                    showGridlines
                    stripedRows 
                >
                    <Column field={"last_name"} header="Full name" sortable body={(row) => fullname(row)} />
                    <Column field={"username"} header="Username" sortable />
                    <Column field={"email"} header="email" sortable />
                    <Column field={"role.role"} header="Role" sortable />
                    <Column header="Actions"  body={(row) => actions(row)} />
                </DataTable>
                )}
            </div>
        </Layout>
    );
}

export default Users;
