import React, { useState, useRef } from 'react'
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Editor } from 'primereact/editor';

export default function InformationsForm() {
    const [price, setPrice] = useState(0)
    return (
        <div className=' my-2 flex flex-col space-y-6'>
            <div className='flex flex-col md:flex-row md:space-x-5'>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title" className='font-bold block '>Title</label>
                    <InputText id="title" aria-describedby="title-help" />
                    <small id="title-help">
                        Max is 255
                    </small>
                </div>
                <div className="w-full">
                    <label htmlFor="currency-us" className="font-bold block mb-2 ">Price</label>
                    <InputNumber 
                        className='w-full'
                        inputId="currency-us" 
                        value={price} 
                        onValueChange={(e) => setPrice(e.value)} 
                        mode="currency" 
                        currency="MAD" 
                        locale="en-US" 
                    />
                </div>
            </div>

            <div>
                <label htmlFor="title" className='font-bold block mb-2 '>Short Description</label>
                <InputTextarea className='w-full' rows={5} cols={30} />
                <small id="title-help">
                    Max is 255
                </small>
            </div>

            <div>
                <label htmlFor="title" className='font-bold block mb-2 '>Long Description</label>
                <Editor style={{ height: '200px' }} className='w-full' />
                <small id="title-help">
                    Max is 255
                </small>
            </div>

        </div>
    )
}
