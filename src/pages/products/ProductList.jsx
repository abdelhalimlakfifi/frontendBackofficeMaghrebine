import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../layouts/layouts';
import { useLocation } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ProductService } from './services/ProductServices';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';



export default function ProductList() 
{
    const toast = useRef();
    const location = useLocation();
    const [toDelete, setToDelete] = useState();
    useEffect(() => {

        if(location.state === true)
        {
            toast.current.show({severity:'success', summary: 'Saved', detail:'Product saved Successfully', life: 3000});
        }
    }, []);


    // sssssssssssssssssssssssssssssssss
    const [products, setProducts] = useState(null);
    const [filters, setFilters] = useState();
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    
    

    

    useEffect(() => {
        ProductService.getProducts().then((data) => {
            setProducts(getProducts(data));
            setLoading(false);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getProducts = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);

            return d;
        });
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };




    const header = renderHeader();
    const displayIMage = (row) => {
        const main = row.images.find(img => img.image_id?.main === true)
        
        return (
            <div>
                <Image src={`http://localhost:3000/api/${main.image_id.path}`} alt="Image" width="60" preview />
            </div>
        )
    }

    const accept = (row) => {
        toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'You Product deleted', life: 3000 });
    }
    const deleteDialog = (row) => {
        
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => accept(row)
        });
    };

    const deleteButton = (row) => {
        return (
            <div>
                <Button label="Delete" icon="pi pi-trash" className=' bg-light-gold border-transparent font-light text-sm' onClick={() => deleteDialog(row)} />
            </div>
        )
    }
    return (
        <Layout>
            <ConfirmDialog />
            <Toast ref={toast} />
            <div className="card">
            <DataTable
                value={products} 
                paginator rows={10} 
                dataKey="_id"
                filters={filters} 
                
                loading={loading}
                globalFilterFields={['name', 'country.name', 'representative.name', 'status']}
                header={header} 
                emptyMessage="No customers found."
            >
                <Column field="ref" header="Ref"  style={{ minWidth: '12rem' }} />
                <Column field="title" header="Title" style={{ minWidth: '12rem' }} />
                <Column field="title" header="Image" body={(row) => displayIMage(row)} style={{ minWidth: '12rem' }} />
                <Column field="short_description" header="Short Description" style={{ minWidth: '12rem' }} />
                <Column field="price" header="Price" style={{ minWidth: '12rem' }} />
                <Column field='sss' header="Actions" body={(row) => (deleteButton(row))} />
                
            </DataTable>
        </div>
        </Layout>
    )
}
