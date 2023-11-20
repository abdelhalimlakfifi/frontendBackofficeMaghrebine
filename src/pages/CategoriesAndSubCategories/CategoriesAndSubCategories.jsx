import React from "react";
import Layout from "../../layouts/layouts";
import { TabView, TabPanel } from "primereact/tabview";
import { Toolbar } from 'primereact/toolbar';


export default function CategoriesAndSubCategories() {
    
  return (
    <Layout>
      <TabView className="px-20 py-8 text-xs ">
        <TabPanel header="Types">
            <Toolbar className="mb-4 " right={rightToolbarTemplate}></Toolbar>
            {/* <TypesTable/> */}
        </TabPanel>
        <TabPanel header="Categories">
          
        </TabPanel>
        <TabPanel header="Sub-Categories">
          
        </TabPanel>
      </TabView>
    </Layout>
  );
}
