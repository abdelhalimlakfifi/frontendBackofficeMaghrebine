import React from "react";
import Layout from "../../layouts/layouts";
import { TabView, TabPanel } from "primereact/tabview";

import TypesTable from "./TypesTable";
import CategoriesTable from "./CategoriesTable";
import SubCategoriesTable from "./SubCategoriesTable";

export default function CategoriesAndSubCategories() {
  return (
    <Layout>
      <TabView className="px-20 py-8 text-xs ">
        <TabPanel header="Types">
          <TypesTable />
        </TabPanel>
        <TabPanel header="Categories">
          <CategoriesTable />
        </TabPanel>
        <TabPanel header="Sub-Categories">
          <SubCategoriesTable />
        </TabPanel>
      </TabView>
    </Layout>
  );
}
