import React, {useState, useRef} from 'react'
import Layout from '../../layouts/layouts'
import { Button } from 'primereact/button';
import profileImageNone from "../../assets/profileImageNone.png"

export default function AddUser() {

    const formRef = useRef();
    const [image, setImage] = useState(profileImageNone);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data) => {
        // Handle form submission here
        console.log(data);
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

    const submitForm = (e) => {
        e.preventDefault();

        
        
        console.log(formRef.current.password.value);
        console.log(formRef.current.image.value);
    }

    return (
        <Layout>
            <div>
                <div className="h-full p-6 bg-gray-100 flex items-center justify-center">
                    <div className="container max-w-screen-lg mx-auto">
                        <div>

                            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                    <div className="text-gray-600">
                                        <p className="font-medium text-lg">Personal Details</p>
                                        <p>Please fill out all the fields.</p>
                                    </div>
                                    <form className=' col-span-2' onSubmit={submitForm} ref={formRef}>
                                        
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
                                            <div>
                                                <label htmlFor="email">First name</label>
                                                <input type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            </div>
                                            <div>
                                                <label htmlFor="email">Last name</label>
                                                <input type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            </div>
                                        </div>

                                        <div className='mt-4'>
                                            <label htmlFor="email">Username</label>
                                            <input type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>
                                        <div  className='mt-4'>
                                            <label htmlFor="email">email</label>
                                            <input type="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div  className='mt-4'>
                                            <label htmlFor="email">Role</label>
                                            <select name="" id="" className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'>
                                                <option value="">Select Role</option>
                                                <option value="">Admin</option>
                                                <option value="">Manager</option>
                                            </select>
                                        </div>
                                        
                                        <div className='mt-4'>
                                            <label htmlFor="email">Password</label>
                                            <div className='flex space-x-2'>
                                                <input type="text" className="h-10 border rounded px-4 w-full bg-gray-50" name='password' />
                                                <Button icon="pi pi-refresh" className='p-0 bg-light-gold border-none' onClick={generatePassword} type='button' />

                                            </div>
                                        </div>

                                        <div className='mt-4'>
                                            <Button 
                                                icon="pi pi-check" 
                                                label="Submit "
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