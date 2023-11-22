import React from "react";
import Layout from "../../layouts/layouts";
import { TabView, TabPanel } from "primereact/tabview";
import RolesCrud from "./RolesCrud";

export default function Roles() {
  return (
    <Layout>
      <TabView className="px-20 py-8 text-xs ">
        <TabPanel header="Types">
          <RolesCrud />
        </TabPanel>
        <TabPanel header="Categories"></TabPanel>
        <TabPanel header="Sub-Categories"></TabPanel>
      </TabView>
    </Layout>
  );
}
