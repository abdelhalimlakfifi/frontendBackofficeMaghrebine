import React, { useState, useRef, useEffect } from "react";
import Layout from "../../layouts/layouts";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
// import { get, post } from "../../utils/request";
import { Toast } from "primereact/toast";
import { BreadCrumb } from "primereact/breadcrumb";
import { useLocation, useNavigate } from "react-router-dom";
import profileImageNone from "../../assets/profileImageNone.png";

import axios from "axios";
import { post } from "../../utils/request";

export default function InfoCustomer() {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const toast = useRef(null);
  const [loading, setLoading] = useState();
  const items = [{ label: "Users" }, { label: "Add User" }];

  const home = { icon: "pi pi-home" };
  // id of the customer

  const navigate = useNavigate();
  const unauthorizedCallback = () => {
    // This function will be called if the request is unauthorized (status code 401)
    alert("Unauthorized access! Redirecting to login.");
    // You can also use react-router's useNavigate here
    navigate("/login");
  };

  const formRef = useRef();
  const location = useLocation();

  const additionalData = location.state;
  //   const [image, setImage] = useState(profileImageNone);
  // const [selectedRoleError, setSelectedRoleError] = useState();
  const [image, setImage] = useState(profileImageNone);
  const defaultValues = {
    first_name: additionalData.first_name,
    last_name: additionalData.last_name,
    username: additionalData.username,
    email: additionalData.email,
  };
  const form = useForm({ defaultValues });
  const errors = form.formState.errors;
  //   console.log("additionalData ", additionalData);

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  const formData = new FormData();
  const submitForm = async (e) => {
    // setLoading(true);

    formData.append("first_name", formRef.current.first_name.value);
    formData.append("last_name", formRef.current.last_name.value);
    formData.append("username", formRef.current.username.value);
    formData.append("email", formRef.current.email.value);

    // Check and log form data

    const response = await post(
      `http://localhost:3000/api/customer/update/${additionalData._id}`,
      token,
      formData,
      unauthorizedCallback
    );

    if (response.errors && response.errors.length > 0) {
      response.errors.map((err) => {
        toast.current.show({
          severity: "error",
          summary: err.attribute,
          detail: err.error,
        });
      });
    } else {
      form.reset();
      //   setSelctedImage(profileImageNone);
      //   setImage(profileImageNone);
      toast.current.show({
        severity: "success",
        summary: "success",
        detail: "Customer saved successfully",
      });
    }

    // setLoading(false);
  };

  return (
    <Layout>
      <div>
        <BreadCrumb model={items} home={home} />
        <Toast ref={toast} />
        {/* <Toast /> */}
        <div className="h-full p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">
                      Personal Details of Customer
                    </p>
                    <p>Please fill out all the fields.</p>
                  </div>
                  <form
                    className=" col-span-2"
                    onSubmit={form.handleSubmit(submitForm)}
                    ref={formRef}
                  >
                    <div className="flex justify-end h-24">
                      <div className="w-20 h-20 relative">
                        <div className="relative group">
                          <div className=" rounded-full">
                            <img
                              className="w-full object-cover"
                              // src={`http://localhost:3000/api/${image}`}
                              src={image}
                              alt=""
                            />
                            <label
                              htmlFor="fileInput"
                              className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 cursor-pointer transition-opacity duration-300"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Controller
                        name="first_name"
                        control={form.control}
                        rules={{ required: "First name is required" }}
                        render={({ field, fieldState }) => (
                          <div>
                            <label htmlFor="first_name">First name</label>
                            <input
                              type="text"
                              {...field}
                              className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${
                                fieldState.error ? "border-red-600" : ""
                              }`}
                            />
                            <div
                              className={
                                getFormErrorMessage(field.name) ? "" : "hidden"
                              }
                            >
                              {getFormErrorMessage(field.name)}
                            </div>
                          </div>
                        )}
                      />

                      <Controller
                        name="last_name"
                        control={form.control}
                        rules={{ required: "Last name is required" }}
                        render={({ field, fieldState }) => (
                          <div>
                            <label htmlFor="last_name">Last name</label>
                            <input
                              type="text"
                              {...field}
                              className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${
                                fieldState.error ? "border-red-600" : ""
                              }`}
                            />
                            <div className="">
                              {getFormErrorMessage(field.name)}
                            </div>
                          </div>
                        )}
                      />
                    </div>

                    <div className="">
                      <Controller
                        name="username"
                        control={form.control}
                        rules={{ required: "Username is required" }}
                        render={({ field, fieldState }) => (
                          <div>
                            <label htmlFor="last_name">Username</label>
                            <input
                              name="username"
                              id="username"
                              type="text"
                              {...field}
                              className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${
                                fieldState.error ? "border-red-600" : ""
                              }`}
                            />
                            <div>{getFormErrorMessage(field.name)}</div>
                          </div>
                        )}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name="email"
                        control={form.control}
                        rules={{
                          required: "E-mail is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <div>
                            <label htmlFor="email">E-mail</label>
                            <input
                              type="text"
                              name="email"
                              id="email"
                              {...field}
                              className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${
                                fieldState.error ? "border-red-600" : ""
                              }`}
                            />
                            <div>{getFormErrorMessage(field.name)}</div>
                          </div>
                        )}
                      />
                    </div>

                    <div className="">
                      <Button
                        icon="pi pi-check"
                        label="Submit"
                        loading={loading}
                        className=" px-4 bg-light-gold border-none"
                        type="submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
