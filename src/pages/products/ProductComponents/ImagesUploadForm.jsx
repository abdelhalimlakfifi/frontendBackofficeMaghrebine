import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { FileUpload } from 'primereact/fileupload';
import Marquee from 'react-fast-marquee';
import axios from 'axios';
const ImagesUploadForm = forwardRef((props, ref) => {

    const [main, setMain] = useState();
    const [secondary, setSecondary] = useState();
    const [others, setOthers]   = useState([]);
    const bodyFormData = new FormData();
    
    useImperativeHandle(ref, () => ({
        async submitedForm() {
            // COMPLETE THIS FORM DATA TO APPEND THE MAIN/SECONDARY AND OTHERS TO A FORM DATA AND SEND IT USING AXIOS
            if (main) {
                bodyFormData.append('main', main);
            }

            // // Append secondary image
            // if (secondary) {
            //     bodyFormData.append('secondaryImage', secondary);
            // }


            others.forEach((file, index) => {
                bodyFormData.append(`others`, file);
            });
            // bodyFormData.append('text', "textxtxt");


            for (var pair of bodyFormData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            
            // Append other images
            // Array.from(others).forEach((file, index) => {
            //     bodyFormData.append(`others[${index}]`, file);
            // });

            console.log("line: 37");
            console.log([...bodyFormData]);
            console.log(others);

            

            const response = await axios.post('http://localhost:3000/api/product/upload-images', bodyFormData);

            console.log(response.data);

            
            return { status: false };
        },
    }));

    function handleChangeMain(e) {
        
        if(e.target.files.length > 0)
        {
            console.log(e.target.files[0]);
            setMain(e.target.files[0]);
            // bodyFormData.append('main', e.target.files);

        }
    }

    function handleChangeSecondary(e) {
        if(e.target.files.length > 0)
        {
            setSecondary(URL.createObjectURL(e.target.files[0]));
        }
    }

    function handleChangeOthers(e) {

        if(e.target.files.length > 0)
        {
            console.log([e.target.files[0], e.target.files[1], e.target.files[2]]);
            const otherFilesArray = Array.from(e.target.files);
            setOthers(otherFilesArray);
        }
    }

    return (
        <div className=' mt-12'>
            <div className=' flex flex-col md:flex-row w-full md:space-x-8'>
                {/* Main image */}

                <div className=' my-2 flex flex-col space-y-2  w-full'>
                    <img src={main} alt="" className='h-64 object-cover' />
                    <div className=' my-2 flex flex-col space-y-2  w-full'>
                        <label htmlFor="mainImage" className="mb-1 block text-sm font-medium text-gray-600">Upload Main image</label>
                        <input 
                            id="mainImage"
                            onChange={handleChangeMain}
                            type="file"
                            className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-light-gold file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-60 border-2 rounded-lg" 
                        />
                    </div>
                </div>


                {/* Secondary Image */}
                <div className=' my-2 flex flex-col space-y-2  w-full'>
                    <img src={secondary} alt="" className='h-64 object-cover' />
                    <div className=' my-2 flex flex-col space-y-2  w-full'>
                        <label htmlFor="secondary" className="mb-1 block text-sm font-medium text-gray-600">Upload secondary image</label>
                        <input 
                            id="secondary"
                            onChange={handleChangeSecondary}
                            type="file"
                            className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-light-gold file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-60 border-2 rounded-lg"
                        />
                    </div>
                </div>
            </div>

            <div className='card mt-4'>
                <label htmlFor="filesUpload">Other images</label>
                <input 
                    id="secondary"
                    multiple
                    onChange={handleChangeOthers}
                    type="file"
                    className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-light-gold file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-60 border-2 rounded-lg"
                />

                
                <Marquee>
                    {Array.from(others).map((image, index) => (
                        <div key={index} className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                            <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                                <img className="object-cover" src={URL.createObjectURL(image)} alt={`product image ${index}`} />
                            </div>
                        </div>
                    ))}
                </Marquee>
                {/* <FileUpload 
                    id='filesUpload'
                    name="demo[]"
                    url={'/api/upload'}
                    multiple
                    accept="image/*"
                    maxFileSize={1000000}
                    emptyTemplate={<p className="m-0">Drag and drop files here to upload.</p>} 
                /> */}
            </div>
        </div>
    );
});

export default ImagesUploadForm;
