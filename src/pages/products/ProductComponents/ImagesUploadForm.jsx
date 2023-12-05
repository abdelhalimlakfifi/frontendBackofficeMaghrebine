import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { FileUpload } from 'primereact/fileupload';
import Marquee from 'react-fast-marquee';
import axios from 'axios';
import { Toast } from 'primereact/toast';

const ImagesUploadForm = forwardRef((props, ref) => {

    const toast = useRef(null);
    const [main, setMain] = useState({displayed: null, toSend: null});
    const [secondary, setSecondary] = useState({displayed: null, toSend: null});
    const [others, setOthers]   = useState([]);
    

    useImperativeHandle(ref, () => ({
        async submitedForm() {
            
            const bodyFormData = new FormData();

            const localStorageData = localStorage.getItem('images');
            
            if(localStorageData !== null) 
            {
                return {
                    status: true,
                    step:2
                }
            }

            try {
                bodyFormData.append('main', main.toSend);
                bodyFormData.append('secondary', secondary.toSend);
    
                others.map(other => {
                    bodyFormData.append('others', other);
                });

                const response = await axios.post('http://localhost:3000/api/product/upload-images', bodyFormData);
                

                const data = {
                    main: response.data.data.main,
                    secondary: response.data.data.secondary,
                    others: response.data.data.others
                }

                localStorage.setItem('images', JSON.stringify(data));

                return {
                    status: true,
                    step:2
                }
            } catch (error) {
                toast.current.show({severity:'error', summary: 'Error', detail:'500 internal server Error', life: 3000});
                return { status: false };
            }

            
        },
    }));

    function handleChangeMain(e) {
        
        if(e.target.files.length > 0)
        {
            
            setMain({
                displayed: URL.createObjectURL(e.target.files[0]),
                toSend: e.target.files[0]
            });
            

        }
    }

    function handleChangeSecondary(e) {
        if(e.target.files.length > 0)
        {
            setSecondary({
                displayed: URL.createObjectURL(e.target.files[0]),
                toSend: e.target.files[0]
            });
        }
    }

    function handleChangeOthers(e) {

        if(e.target.files.length > 0)
        {
            const otherFilesArray = Array.from(e.target.files);
            setOthers(otherFilesArray);

            otherFilesArray.map(other => {
                bodyFormData.append('other', other);
            });
        }
    }

    return (
        <div className=' mt-12'>
            <Toast ref={toast} />
            <div className=' flex flex-col md:flex-row w-full md:space-x-8'>
                {/* Main image */}

                <div className=' my-2 flex flex-col space-y-2  w-full'>
                    <img src={main.displayed} alt="" className='h-64 object-cover' htmlFor="mainImage" />
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
                    <img src={secondary.displayed} alt="" className='h-64 object-cover' htmlFor="secondary" />
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
