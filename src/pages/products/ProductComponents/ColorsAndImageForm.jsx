import React, { useState, useRef } from 'react'
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Editor } from 'primereact/editor';

export default function ColorsAndImageForm() {
    
    return (

        
        <div className=' mt-12'>

            <div className=' flex flex-col md:flex-row w-full md:space-x-8'>
                {/* Main image */}
                <div className=' my-2 flex flex-col space-y-2  w-full'>
                    <label for="example1" class="mb-1 block text-sm font-medium text-gray-600">Upload Main image</label>
                    <input id="example1" type="file" class="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-light-gold file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60 border-2 rounded-lg" />
                </div>

                <div className=' my-2 flex flex-col space-y-2  w-full'>
                    <label for="example1" class="mb-1 block text-sm font-medium text-gray-600">Upload secondary image</label>
                    <input id="example1" type="file" class="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-light-gold file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60 border-2 rounded-lg" />
                </div>
            </div>

        </div>

    )
}
