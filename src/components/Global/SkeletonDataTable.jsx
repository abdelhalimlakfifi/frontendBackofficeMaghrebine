import React from "react";
import { Skeleton } from "primereact/skeleton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const SkeletonDataTable = () => {
  const items = Array.from({ length: 5 }, (v, i) => i);

  const skeletonRectangle = () => {
    return <Skeleton width="3rem" height="1rem" />;
  };

  const skeletonCircle = () => {
    return (
      <>
        <div className="flex">
          <Skeleton shape="circle" size="2rem" className="mr-2"></Skeleton>
          <Skeleton shape="circle" size="2rem" className="mr-2"></Skeleton>
        </div>
      </>
    );
  };

  const skeletonCheckBox = () => {
    return <Skeleton size="2rem" className="mr-2"></Skeleton>;
  };

  return (
    <DataTable value={items} className="p-datatable-striped">
      <Column header={skeletonCheckBox} body={skeletonCheckBox}></Column>

      <Column
        field="typeName"
        header="Type Name"
        style={{ width: "16rem" }}
        body={skeletonRectangle}
      ></Column>
      <Column
        field="thumbnail"
        header="Thumbnail"
        style={{ width: "12rem" }}
        body={skeletonRectangle}
      ></Column>
      <Column
        field="totalCategories"
        header="Total Categories"
        style={{ width: "10rem" }}
        body={skeletonRectangle}
      ></Column>
      <Column
        field="totalProducts"
        header="Total Products"
        style={{ width: "8rem" }}
        body={skeletonRectangle}
      ></Column>
      <Column
        field="status"
        header="Status"
        style={{ width: "12rem" }}
        body={skeletonRectangle}
      ></Column>
      <Column
        header="Actions"
        style={{ width: "12rem" }}
        body={skeletonCircle}
      ></Column>
    </DataTable>
  );
};

export default SkeletonDataTable;
