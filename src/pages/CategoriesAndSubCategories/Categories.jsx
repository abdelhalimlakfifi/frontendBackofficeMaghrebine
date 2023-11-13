import React, {useState,useEffect} from 'react'
import Layout from '../../layouts/layouts'
import {ProductService } from './categoriesData';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default function Categories() {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        ProductService.getProductsMini().then(data => setProducts(data));
    }, []);
    return (
        <Layout>
            <div>
                <span>Categorie</span>

                <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="code" header="Code"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column field="quantity" header="Quantity"></Column>
                </DataTable>
            </div>
        </Layout>
    )
}
