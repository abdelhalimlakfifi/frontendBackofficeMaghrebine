import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import React from "react";

const DateCDU = ({ formData, setFormData }) => {
  return (
    <>
      {/* Created By & Created At */}
      <div className="flex items-center justify-between p-field mb-4 space-x-4">
        <div className="flex-1">
          <label htmlFor="createdBy" className="font-bold text-[#5A6A85]">
            Created By
          </label>
          <InputText
            id="createdBy"
            name="createdBy"
            value={formData.createdBy}
            onChange={(e) =>
              setFormData({ ...formData, createdBy: e.target.value })
            }
          />
        </div>
        <div className="flex-1">
          <label htmlFor="createdAt" className="font-bold text-[#5A6A85]">
            Created At
          </label>
          <Calendar
            id="createdAt"
            name="createdAt"
            value={
              formData.createdAt ? new Date(formData.createdAt) : new Date()
            }
            showIcon
            showTime
            hourFormat="24"
            onChange={(e) => {
              const value = e.target.value;
              setFormData({
                ...formData,
                createdAt: value ? value : new Date().toISOString(),
              });
            }}
            readOnly
          />
        </div>
      </div>

      {/* Updated By & Updated At */}
      <div className="flex items-center justify-between p-field mb-4 space-x-4">
        <div className="flex-1">
          <label htmlFor="updatedBy" className="font-bold text-[#5A6A85]">
            Updated By
          </label>
          <InputText
            id="updatedBy"
            name="updatedBy"
            value={formData.updatedBy}
            onChange={(e) =>
              setFormData({ ...formData, updatedBy: e.target.value })
            }
          />
        </div>
        <div className="flex-1">
          <label htmlFor="updatedAt" className="font-bold text-[#5A6A85]">
            Updated At
          </label>
          <Calendar
            id="updatedAt"
            name="updatedAt"
            value={
              formData.updatedAt ? new Date(formData.updatedAt) : new Date()
            }
            showIcon
            showTime
            hourFormat="24"
            onChange={(e) => {
              const value = e.target.value;
              setFormData({
                ...formData,
                updatedAt: value ? value : new Date().toISOString(),
              });
            }}
            readOnly
          />
        </div>
      </div>

      {/* Deleted By & Deleted At */}
      <div className="flex items-center justify-between p-field mb-4 space-x-4">
        <div className="flex-1">
          <label htmlFor="deletedBy" className="font-bold text-[#5A6A85]">
            Deleted By
          </label>
          <InputText
            id="deletedBy"
            name="deletedBy"
            value={formData.deletedBy}
            onChange={(e) =>
              setFormData({ ...formData, deletedBy: e.target.value })
            }
          />
        </div>
        <div className="flex-1">
          <label htmlFor="deletedAt" className="font-bold text-[#5A6A85]">
            Deleted At
          </label>
          <Calendar
            id="deletedAt"
            name="deletedAt"
            value={
              formData.deletedAt ? new Date(formData.deletedAt) : new Date()
            }
            showIcon
            showTime
            hourFormat="24"
            onChange={(e) => {
              const value = e.target.value;
              setFormData({
                ...formData,
                deletedAt: value ? value : new Date().toISOString(),
              });
            }}
            readOnly
          />
        </div>
      </div>
    </>
  );
};

export default DateCDU;
