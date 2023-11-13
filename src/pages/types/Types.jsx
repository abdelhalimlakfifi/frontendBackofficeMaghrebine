import React, { useEffect, useState } from 'react'
import Layout from '../../layouts/layouts'
import { BreadCrumb } from 'primereact/breadcrumb';
import { typeData } from './typesData';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
export default function Types() {

    const items = [{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];
    const home = { icon: 'pi pi-home', url: 'https://primereact.org' }
    const [type, setType] = useState([]);

    useEffect(() => {
        typeData.getProducts().then(data => setType(data));

    }, []);
    return (
        <Layout>
            <BreadCrumb model={items} home={home} className=' w-fit border-0' />
            <div>
            <DataTable value={type} tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>
            </div>
        </Layout>
    )
}
