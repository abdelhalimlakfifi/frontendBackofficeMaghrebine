import React, { useState, useRef } from 'react'

import { FileUpload } from 'primereact/fileupload';

export default function ImagesUploadForm() {
    const [selectedCities, setSelectedCities] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    return (

        
        <div className=' mt-12'>
            <div className=' flex flex-col md:flex-row w-full md:space-x-8'>
                {/* Main image */}
                <div className=' my-2 flex flex-col space-y-2  w-full'>
                    <label for="example1" class="mb-1 block text-sm font-medium text-gray-600">Upload Main image</label>
                    <input id="example1" type="file" class="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-light-gold file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-60 border-2 rounded-lg" />
                </div>

                <div className=' my-2 flex flex-col space-y-2  w-full'>
                    <label for="example1" class="mb-1 block text-sm font-medium text-gray-600">Upload secondary image</label>
                    <input id="example1" type="file" class="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-light-gold file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-60 border-2 rounded-lg" />
                </div>
            </div>



            <div className='card mt-4'>
                <label htmlFor="filesUpload">Other images</label>
                <FileUpload 
                    id='filesUpload'
                    name="demo[]"
                    url={'/api/upload'}
                    multiple
                    accept="image/*"
                    maxFileSize={1000000}
                    emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} 
                />
            </div>

        </div>

    )
}
