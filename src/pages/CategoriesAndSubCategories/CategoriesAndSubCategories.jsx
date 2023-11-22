import React from "react";
import Layout from "../../layouts/layouts";
import { TabView, TabPanel } from "primereact/tabview";

import TypesCrud from "./TypesCrud";
import CategoriesCrud from "./CategoriesCrud";
import SubCategoriesCrud from "./SubCategoriesCrud";

export default function CategoriesAndSubCategories() {
  return (
    <Layout>
      <TabView className="px-20 py-8 text-xs ">
        <TabPanel header="Types">
          <TypesCrud />
        </TabPanel>
        <TabPanel header="Categories">
          <CategoriesCrud />
        </TabPanel>
        <TabPanel header="Sub-Categories">
          <SubCategoriesCrud />
        </TabPanel>
      </TabView>
    </Layout>
  );
}
