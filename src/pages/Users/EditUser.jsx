import React, {useState, useRef, useEffect} from 'react'
import Layout from '../../layouts/layouts'
import { Button } from 'primereact/button';
import profileImageNone from "../../assets/profileImageNone.png"
import { useForm, Controller } from 'react-hook-form';
import { get, put } from "../../utils/request";
import { Toast } from 'primereact/toast';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
export default function AddUser() {
    
    const token = JSON.parse(localStorage.getItem('user')).token;
    const toast = useRef(null);
    const [loading, setLoading] = useState();
    const items = [{ label: 'Users' }, { label: 'Edit User',}];
    const home = { icon: 'pi pi-home' }
    const location = useLocation();
    const userData = location.state;
    const navigate = useNavigate()
    const unauthorizedCallback = () => {
        // This function will be called if the request is unauthorized (status code 401)
        alert("Unauthorized access! Redirecting to login.");
        // You can also use react-router's useNavigate here
        navigate("/login");
    };


    const formRef = useRef();
    const [image, setImage] = useState();
    const [selctedImage, setSelctedImage] = useState(null);
    const [roles, setRoles] = useState([]);
    const [selectedRoleError, setSelectedRoleError] = useState();
    const defaultValues = {
        first_name: userData?.first_name ?? "",
        last_name: userData?.last_name ?? "",
        username: userData?.username ?? "",
        email: userData?.email ?? "",
        password: '',
    };
    const form = useForm({ defaultValues });
    const errors = form.formState.errors;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        
        if (file) {
            if(event.target.files[0].size > 1 * 2000 * 1024)
            {
                toast.current.show({ severity: 'error', summary: "Image", detail: "File with maximum size of 2MB is allowed" });
                return false;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
            setSelctedImage(file);
        }

    };

    
    const generatePassword = () => {
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const specialChars = '!@#$%^&*()-=_+[]{}|;:,.<>?';

        // Combine character sets
        const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;

        // Check if length is provided, otherwise default to 12
        

        // Initialize password
        let password = '';

        // Generate random password
        for (let i = 0; i < 12; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            password += allChars.charAt(randomIndex);
        }

        formRef.current.password.value = password;
    }
    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    const submitForm = async (e) => {
        setLoading(true);
        const formData = new FormData();

        
        
        if(formRef.current.role.value == 0)
        {
            setSelectedRoleError("Please select a role")
            setLoading(false);
            return 
        }else{
            setSelectedRoleError("")
        }
        
        formData.append('profile_picture', selctedImage);
        formData.append('first_name', formRef.current.first_name.value);
        formData.append('last_name', formRef.current.last_name.value);
        formData.append('username', formRef.current.username.value);
        formData.append('email', formRef.current.email.value);
        formData.append('role', formRef.current.role.value);
        formData.append('password', formRef.current.password.value);



        const response = await put(
            `http://localhost:3000/api/users/update/${userData._id}`,
            token,
            formData,
            unauthorizedCallback
        );

        if(response.errors && response.errors.length > 0) {
            response.errors.map(err => {
                toast.current.show({ severity: 'error', summary: err.attribute, detail: err.error });
            })
        }else{
            formRef.current.password.value = ""
            setSelctedImage(profileImageNone);
            setImage(profileImageNone)
            toast.current.show({ severity: 'success', summary: 'success', detail: "User saved successfully" });
            // navigate("/users");
        }

        setLoading(false);
    }

    useEffect(() => {
        
        
        if(userData === null || userData === undefined) {
            navigate('/users');
        }
        setImage(userData.profile_picture !== null ? `http://localhost:3000/api/${userData.profile_picture}` : profileImageNone);
        const getRoles = async () => {

            const roles = await get(
                'http://localhost:3000/api/role',
                token,
                unauthorizedCallback
            );

            setRoles(roles);
        }

        getRoles();
    }, []);

    
    return (
        <Layout>
            <div>
                <BreadCrumb model={items} home={home} />
                <Toast ref={toast} />
                <div className="h-full p-6 bg-gray-100 flex items-center justify-center">
                    <div className="container max-w-screen-lg mx-auto">
                        <div>

                            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                    <div className="text-gray-600">
                                        <p className="font-medium text-lg">Personal Details</p>
                                        <p>Please fill out all the fields.</p>
                                    </div>
                                    <form className=' col-span-2' onSubmit={form.handleSubmit(submitForm)} ref={formRef}>
                                        
                                        <div className='flex justify-center h-24'>
                                            <input type="file" className='hidden' id='fileInput' onChange={handleFileChange} />
                                            
                                            <div className='w-20 h-20 relative'>
                                                <div className='relative group'>
                                                    <div className=' rounded-full'>
                                                        <img className='w-full object-cover' src={image} alt="" />
                                                        <label htmlFor='fileInput' className='absolute inset-0 bg-black opacity-0 group-hover:opacity-50 cursor-pointer transition-opacity duration-300'>

                                                        </label>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-4">
                                            <Controller
                                                name="first_name"
                                                control={form.control}
                                                rules={{ required: 'First name is required' }}
                                                render={({ field, fieldState }) => (
                                                    <div>
                                                        <label htmlFor="first_name">First name</label>
                                                        <input
                                                            type="text"
                                                            {...field}
                                                            className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${fieldState.error ? 'border-red-600' : ""}`}
                                                        />
                                                        <div className={getFormErrorMessage(field.name) ? '' : "hidden"}>
                                                            {getFormErrorMessage(field.name)}
                                                        </div>
                                                    </div>
                                                    
                                                )}
                                            />
                                            
                                            <Controller
                                                name="last_name"
                                                control={form.control}
                                                rules={{ required: 'Last name is required' }}
                                                render={({ field, fieldState }) => (
                                                    <div>
                                                        <label htmlFor="last_name">Last name</label>
                                                        <input
                                                            type="text"
                                                            {...field}
                                                            className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${fieldState.error ? 'border-red-600' : ""}`}
                                                        />
                                                        <div className="">
                                                            {getFormErrorMessage(field.name)}
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                        </div>

                                        <div className=''>
                                            <Controller
                                                name="username"
                                                control={form.control}
                                                rules={{ required: 'Username is required' }}
                                                render={({ field, fieldState }) => (
                                                    <div>
                                                        <label htmlFor="last_name">Username</label>
                                                        <input
                                                            name='username'
                                                            id='username'
                                                            type="text"
                                                            {...field}
                                                            className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${fieldState.error ? 'border-red-600' : ""}`}
                                                        />
                                                        <div>
                                                            {getFormErrorMessage(field.name)}
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                        </div>
                                        <div  className=''>
                                            
                                            <Controller
                                                name='email'
                                                control={form.control}
                                                rules={{ 
                                                    required: 'E-mail is required',
                                                    pattern: {
                                                        value: /^\S+@\S+$/i,
                                                        message: 'Invalid email address',
                                                    },
                                                }}
                                                render={({ field, fieldState }) => (
                                                    <div>
                                                        <label htmlFor="email">E-mail</label>
                                                        <input
                                                            type="text" 
                                                            name='email' 
                                                            id='email'
                                                            {...field}
                                                            className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${fieldState.error ? 'border-red-600' : ""}`}
                                                        />
                                                        <div>
                                                            {getFormErrorMessage(field.name)}
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                        </div>
                                        
                                        <div className=''>
                                            <label htmlFor="role">Role</label>
                                            <select  name="role" id='role' className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'>
                                                <option value={userData?.role._id}>{userData?.role.role}</option>
                                                <option value="0">Select Role</option>
                                                {roles && roles.map((role, index) => (
                                                    
                                                    <option 
                                                        key={index}
                                                        value={role._id}
                                                    >
                                                            {role.role}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className=' text-red-500 text-sm italic'>
                                                {selectedRoleError ?? (
                                                    selectedRoleError
                                                )}
                                            </div>
                                        </div>

                                        <div className='mt-4'>
                                            {/* <label htmlFor="password">Password</label> */}
                                                <Controller
                                                    name='password'
                                                    control={form.control}
                                                    rules={{ 
                                                        minLength: {
                                                            value: 8,
                                                            message: 'Password must be at least 8 characters',
                                                        },
                                                    }}
                                                    render={({ field, fieldState }) => (
                                                        <div>
                                                            <label htmlFor="password">Password</label>
                                                            <div className='flex space-x-2'>
                                                                <input
                                                                    type="text" 
                                                                    name='password' 
                                                                    id='password'
                                                                    {...field}
                                                                    className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${fieldState.error ? 'border-red-600' : ""}`}
                                                                />
                                                                <Button icon="pi pi-refresh" className='p-0 bg-light-gold border-none' onClick={generatePassword} type='button' />
                                                            </div>
                                                            <div>
                                                                {getFormErrorMessage(field.name)}
                                                            </div>
                                                        </div>
                                                    )}
                                                />
                                            
                                        </div>

                                        <div className=''>
                                            <Button 
                                                icon="pi pi-check" 
                                                label="Submit"
                                                loading={loading}
                                                className=' px-4 bg-light-gold border-none'  
                                                type='submit'
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
    )
}