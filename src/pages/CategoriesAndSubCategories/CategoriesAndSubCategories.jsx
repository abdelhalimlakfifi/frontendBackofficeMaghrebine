import React, {useState,useEffect} from 'react'
import Layout from '../../layouts/layouts'
import { Tree } from 'primereact/tree';
import { Categories } from './categories';

export default function CategoriesAndSubCategories() {
    const [nodes, setNodes] = useState([{
        label: "Rbati",
        icon: "pi pi-star-fill",
        children: [{
            label: 'Work',
        }]
    }]);

    useEffect(() => {
        // Categories.getTreeNodes().then((data) => setNodes(data));
    }, []);
    return (
        <Layout>
            <div>
                <span>Categorie</span>

                <Tree value={nodes} dragdropScope="demo" onDragDrop={(e) => setNodes(e.value)} className="w-full md:w-30rem" />
            </div>
        </Layout>
    )
}
