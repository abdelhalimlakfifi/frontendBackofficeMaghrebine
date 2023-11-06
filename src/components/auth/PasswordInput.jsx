import React, { useState } from 'react'
import { InputText } from "primereact/inputtext";
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';

export default function PasswordInput({className, name, field}) {


    return (
        <>

                <div className="w-full">
                    <span className="p-float-label">
                        <Password 
                            name={name}
                            className={className + ' w-full'}
                            feedback={false} 
                            toggleMask 
                            id={field.name}
                            {...field}
                        />
                        <label htmlFor="password">Password</label>
                    </span>
                </div>
        </>
    )
}
