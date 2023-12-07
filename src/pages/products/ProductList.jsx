import React, { useEffect, useRef } from 'react';
import Layout from '../../layouts/layouts';
import { useLocation } from "react-router-dom";
import { Toast } from 'primereact/toast';

export default function ProductList() 
{
    const toast = useRef();
    const location = useLocation();
    useEffect(() => {

        console.log(location);
        if(location.state === true)
        {
            toast.current.show({severity:'success', summary: 'Saved', detail:'Product saved Successfully', life: 3000});
        }
    }, []);
    return (
        <Layout>
            <Toast ref={toast} />
            Product List;
        </Layout>
    )
}
