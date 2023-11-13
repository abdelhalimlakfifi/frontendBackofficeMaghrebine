import React from "react";
import Layout from "../../layouts/layouts";
import TypesTable from "./TypesTable";
import { TabView, TabPanel } from "primereact/tabview";
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import CrudTypes from "./crudTypes";



export default function CategoriesAndSubCategories() {

    // const leftToolbarTemplate = () => {
    //     return (
    //         <div className="flex flex-wrap gap-2 ">
    //             <Button label="Delete" icon="pi pi-trash" severity="danger" text raised/>
    //         </div>
    //     );
    // };

    const rightToolbarTemplate = () => {
        return (
            <>
                <CrudTypes/>
                <Button label="Export" icon="pi pi-upload" className="p-button-help  mx-2" text />
            </>
        )
        
    };
    

  return (
    <Layout>
      <TabView className="px-20 py-8 text-xs ">
        <TabPanel header="Types">
            <Toolbar className="mb-4 " right={rightToolbarTemplate}></Toolbar>
            <TypesTable/>
        </TabPanel>
        <TabPanel header="Categories">
          <p className="m-0"></p>
        </TabPanel>
        <TabPanel header="Sub-Categories">
          <p className="m-0"></p>
        </TabPanel>
      </TabView>
    </Layout>
  );
}
