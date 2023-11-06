import React, { useState } from 'react'
import { InputText } from "primereact/inputtext";

import { Password } from 'primereact/password';

export default function PasswordInput() {


    return (
        <>
            {/* <span className="p-float-label text-gray-500">
                <InputText
                    id="password"
                    type="password"
                    name='password'
                    required
                    placeholder='***********'
                    className="block w-full px-4 py-2 text-custom-purple bg-white border-2 rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <label htmlFor="password" className="">
                    Password
                </label>
                
            </span> */}

                <div className="w-full">
                    <span className="p-float-label">
                        <Password 
                            name='password'
                            className='w-full' 
                            feedback={false} 
                            toggleMask 
                        />
                        <label htmlFor="password">Password</label>
                    </span>
                </div>
        </>
    )
}
