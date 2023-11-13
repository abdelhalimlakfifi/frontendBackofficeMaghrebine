import React, { useState, useEffect}  from 'react'
import {ProductService } from "../../components/Data/ProductService"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

function TypesTable() {

    const [products, setProducts] = useState([]);

    const cols = [
        { field: 'name', header: 'Type name' },
        { field: 'image', header: 'Thumbnail' },
        { field: 'totalCategories', header: 'Total Categories' },
        { field: 'totalProducts', header: 'Total Products' },
        { field: 'active', header: 'Status' },
        { field: 'log', header: 'History' },
        { field: 'Actions', header: 'Actions' }
        



    ];

    useEffect(() => {
        ProductService.getProductsMini().then((data) => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
        </div>
    );

    

  return (
    <>
        <DataTable
            value={products}
            header={header}
            tableStyle={{ minWidth: "50rem" }}
            className='text-sm'
          >
            {cols.map((col, index) => (
                    <Column key={index} field={col.field} header={col.header} className='text-xs' />
              
            ))}
          </DataTable>
    </>
  )
}

export default TypesTable