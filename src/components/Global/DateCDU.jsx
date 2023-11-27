import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import React from "react";

const DateCDU = ({ formData, setFormData }) => {
  const dateFields = [
    { key: "createdBy", label: "Created By", dataKey: "createdAt" },
    { key: "updatedBy", label: "Updated By", dataKey: "updatedAt" },
    { key: "deletedBy", label: "Deleted By", dataKey: "deletedAt" },
  ];

  return (
    <>
      {dateFields.map(({ key, label, dataKey }) => (
        <div key={key} className="flex items-center justify-between p-field mb-4 space-x-4">
          <div className="flex-1">
            <label htmlFor={key} className="font-bold text-[#5A6A85]">
              {label}
            </label>
            <InputText
              id={key}
              name={key}
              value={formData[key] ? `${formData[key].first_name} ${formData[key].last_name}` : ''}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label htmlFor={dataKey} className="font-bold text-[#5A6A85]">
              {label} At
            </label>
            <Calendar
              id={dataKey}
              name={dataKey}
              value={
                formData[dataKey]
                  ? new Date(formData[dataKey])
                  : ''
              }
              showIcon
              showTime
              hourFormat="24"
              onChange={(e) => {
                const value = e.target.value;
                setFormData({
                  ...formData,
                  [dataKey]: value ? value : new Date().toISOString(),
                });
              }}
              disabled={true}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default DateCDU;
