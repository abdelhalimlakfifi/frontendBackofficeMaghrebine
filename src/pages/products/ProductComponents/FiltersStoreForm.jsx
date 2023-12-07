import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import Marquee from 'react-fast-marquee';

const FiltersStoreForm = forwardRef((props, ref) => {

    const [selectedCategories, setSelectedCategories] = useState(null);
    const [selectedSubCategories, setSelectedSubCategories] = useState(null);
    const [selectedSize, setSelectedSize] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [images, setImages] = useState([])
    const [productInformations, setProductInformations] = useState();
    const info = JSON.parse(localStorage.getItem('product_information'));
    const imagesFromLocal = JSON.parse(localStorage.getItem('imagesWithColors'));
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('filters')) || null;


        if(data !== null) {
            
            setSelectedCategories(data.categorie);
            setSelectedSubCategories(data.subcategorie);
            setSelectedSize(data.sizes);
            setSelectedTypes(data.types);

        }
    }, [])


    const updateErrors = (fieldName, errorMessage) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: errorMessage,
        }));
    };


    useImperativeHandle(ref, () => ({
        submitedForm()
        {
            if(selectedCategories == null || selectedSubCategories == null || selectedSize.length === 0 || selectedTypes.length === 0)
            {
                if (selectedCategories == null)
                {
                    updateErrors('categories', 'Please select a category.');
                } else {
                    updateErrors('categories', ''); // Clear the error if the field is valid
                }
    
                if (selectedSubCategories == null) {
                    updateErrors('subCategories', 'Please select a subcategory.');
                } else {
                    updateErrors('subCategories', ''); // Clear the error if the field is valid
                }
    
                if (selectedSize.length === 0) {
                    updateErrors('sizes', 'Please select at least one size.');
                } else {
                    updateErrors('sizes', ''); // Clear the error if the field is valid
                }
    
                if (selectedTypes.length === 0) {
                    updateErrors('types', 'Please select at least one type.');
                } else {
                    updateErrors('types', ''); // Clear the error if the field is valid
                }
                return 
            }

            setErrors({})

            const data = {
                categorie: selectedCategories,
                subcategorie: selectedSubCategories,
                sizes: selectedSize,
                types: selectedTypes,
            };
            
            localStorage.setItem('filters', JSON.stringify(data));
            return {
                status: true,
                step:4
            }
            
        }
    }));

    return (
        <form>
            <div className=' flex flex-col space-y-6 my-12'>
                <div className='flex flex-col md:flex-row md:space-x-5'>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="title" className='font-bold block '>Title</label>
                        
                        <InputText id="title" aria-describedby="title-help" readOnly value={info?.title} />
                    </div>
                    <div className="w-full">
                        <label htmlFor="currency-us" className="font-bold block mb-2 ">Price</label>
                        <InputNumber 
                            className='w-full'
                            inputId="currency-us" 
                            value={info?.price}
                            readOnly
                            mode="currency" 
                            currency="MAD" 
                            locale="en-US" 
                        />
                    </div>
                </div>

                <div>
                    <Marquee>
                        {
                            imagesFromLocal !== null && (
                                imagesFromLocal.map((image, index) => (
                                    <div key={index} className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                                        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                                            <img className="object-cover" src={`http://localhost:3000/api/${image.path}`} alt="product image" />
                                        </div>
                                    </div>
                                ))
                            )
                        }

                    </Marquee>
                </div>


                <div className="flex gap-4">
                    <div className="w-full">
                        <Dropdown 
                            name='categories'
                            value={selectedCategories}
                            onChange={(e) => setSelectedCategories(e.value)}
                            options={props.categories}
                            optionLabel="name" 
                            placeholder="Select a Category" 
                            className="w-full md:w-14rem"
                        />
                        <span className=' text-red-500 text-sm italic'>{errors.categories}</span>
                    </div>

                    <div className="w-full">
                        <Dropdown 
                            value={selectedSubCategories}
                            name='subCategories'
                            onChange={(e) => setSelectedSubCategories(e.value)}
                            options={props.subcategories} 
                            optionLabel="name" 
                            placeholder="Select a Sub Categorie" 
                            className="w-full md:w-14rem"
                        />
                        <span className=' text-red-500 text-sm italic'>{errors.subCategories}</span>

                    </div>

                    


                </div>

                <div className="flex gap-4">
                    <div className="w-full">
                        <MultiSelect 
                            value={selectedTypes} 
                            onChange={(e) => setSelectedTypes(e.value)} 
                            options={props.types}  
                            optionLabel="name" 
                            placeholder="Select Types" 
                            maxSelectedLabels={3} 
                            className="w-full md:w-20rem" 
                        />
                        <span className=' text-red-500 text-sm italic'>{errors.sizes}</span>
                    </div>

                    <div className="w-full">
                        <MultiSelect 
                            value={selectedSize}  
                            onChange={(e) => setSelectedSize(e.value)} 
                            options={props.sizes} 
                            optionLabel="name" 
                            placeholder="Select Sizes" 
                            maxSelectedLabels={3} 
                            className="w-full md:w-20rem"
                        />
                        <span className=' text-red-500 text-sm italic'>{errors.types}</span>
                    </div>

                    


                </div>
            </div>

        </form>
    )
});

export default FiltersStoreForm;
