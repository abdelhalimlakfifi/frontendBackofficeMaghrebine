import React from "react";
import { InputText } from "primereact/inputtext";

function Search() {
  return (
    <span className="p-input-icon-left w-full">
      <i className="pi pi-search " />
      <InputText placeholder="Search..." className="w-full px-10 py-2 text-gray-search-text border-2 rounded-lg focus:border-gray-search-outline focus:ring-gray-search-outline focus:outline-none focus:ring focus:ring-opacity-40 " />
    </span>
  );
}

export default Search;
