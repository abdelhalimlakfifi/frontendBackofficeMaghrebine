import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import Marquee from 'react-fast-marquee';

const FiltersStoreForm = forwardRef((props, ref) => {
    const [price, setPrice] = useState(189);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedCities, setSelectedCities] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    useImperativeHandle(ref, () => ({
        getAlert() {
            alert('getAlert from 4');
        },
    }));

    return (
        <div className=' flex flex-col space-y-6 my-12'>
            <div className='flex flex-col md:flex-row md:space-x-5'>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title" className='font-bold block '>Title</label>
                    
                    <InputText id="title" aria-describedby="title-help" readOnly value="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />
                </div>
                <div className="w-full">
                    <label htmlFor="currency-us" className="font-bold block mb-2 ">Price</label>
                    <InputNumber 
                        className='w-full'
                        inputId="currency-us" 
                        value={price} 
                        readOnly
                        onValueChange={(e) => setPrice(e.value)} 
                        mode="currency" 
                        currency="MAD" 
                        locale="en-US" 
                    />
                </div>


            </div>

            <div>
                <Marquee>
                    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                            <img className="object-cover" src="https://via.placeholder.com/400x200" alt="product image" />
                        </div>
                    </div>
                    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                            <img className="object-cover" src="https://via.placeholder.com/400x200" alt="product image" />
                        </div>
                    </div>
                    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                            <img className="object-cover" src="https://via.placeholder.com/400x200" alt="product image" />
                        </div>
                    </div>
                    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                            <img className="object-cover" src="https://via.placeholder.com/400x200" alt="product image" />
                        </div>
                    </div>

                </Marquee>
            </div>


            <div className="flex gap-4">
                <div className="w-full">
                    <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                        placeholder="Select a Category" className="w-full md:w-14rem" />
                </div>

                <div className="w-full">
                    <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                        placeholder="Select a Sub Categorie" className="w-full md:w-14rem" />
                </div>

                


            </div>

            <div className="flex gap-4">
                <div className="w-full">
                    <MultiSelect value={selectedCities} onChange={(e) => setSelectedCities(e.value)} options={cities} optionLabel="name" 
                        placeholder="Select Types" maxSelectedLabels={3} className="w-full md:w-20rem" />
                </div>

                <div className="w-full">
                    <MultiSelect value={selectedCities} onChange={(e) => setSelectedCities(e.value)} options={cities} optionLabel="name" 
                        placeholder="Select Sizes" maxSelectedLabels={3} className="w-full md:w-20rem" />
                </div>

                


            </div>
        </div>
    )
});

export default FiltersStoreForm;
