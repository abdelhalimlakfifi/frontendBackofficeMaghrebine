import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
export default function ImageColorsFilters() {
    const [color, setColor] = useState();
    const [selectedCities, setSelectedCities] = useState(null);
    const cities = [
        { name: 'Blue' },
        { name: 'Red' },
        { name: 'Green' },
        { name: 'Yellow' },
        { name: 'Brown' }
    ];

    return (
        <div className="mt-12">
            <div className="card flex justify-center">
                <MultiSelect
                    value={selectedCities}
                    onChange={(e) => setSelectedCities(e.value)}
                    options={cities}
                    optionLabel="name"
                    filter
                    placeholder="Select Color"
                    maxSelectedLabels={3}
                    className="w-full"
                />
            </div>

            <div className="mt-4">
                {/* Make simple page for image and color and mane */}

                <div className='grid grid-cols-3'>
                    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                            <img className="object-cover" src="https://via.placeholder.com/400x200" alt="product image" />
                        </div>
                        <div className="mt-4 px-5 pb-5">

                            <div className='mb-2'>
                                <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                        <div class="flex items-center ps-3">
                                            <input id="vue-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                            <label for="vue-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Main</label>
                                        </div>
                                    </li>
                                    <li class="w-full">
                                        <div class="flex items-center ps-3">
                                            <input id="laravel-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                            <label for="laravel-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Secondary</label>
                                        </div>
                                    </li>
                                </ul>


                            </div>
                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Color</label>
                            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option selected>Choose image Color</option>
                                <option value="US">Blue</option>
                                <option value="CA">Blac</option>
                                <option value="FR">Green</option>
                                <option value="DE">Yellow</option>
                            </select>
                        </div>
                    </div>

                    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                            <img className="object-cover" src="https://via.placeholder.com/400x200" alt="product image" />
                        </div>
                        <div className="mt-4 px-5 pb-5">

                            <div className='mb-2'>
                                <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                        <div class="flex items-center ps-3">
                                            <input id="vue-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                            <label for="vue-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Main</label>
                                        </div>
                                    </li>
                                    <li class="w-full">
                                        <div class="flex items-center ps-3">
                                            <input id="laravel-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                            <label for="laravel-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Secondary</label>
                                        </div>
                                    </li>
                                </ul>


                            </div>
                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Color</label>
                            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option selected>Choose image Color</option>
                                <option value="US">Blue</option>
                                <option value="CA">Blac</option>
                                <option value="FR">Green</option>
                                <option value="DE">Yellow</option>
                            </select>
                        </div>
                    </div>

                    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                            <img className="object-cover" src="https://via.placeholder.com/400x200" alt="product image" />
                        </div>
                        <div className="mt-4 px-5 pb-5">

                            <div className='mb-2'>
                                <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                        <div class="flex items-center ps-3">
                                            <input id="vue-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                            <label for="vue-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Main</label>
                                        </div>
                                    </li>
                                    <li class="w-full">
                                        <div class="flex items-center ps-3">
                                            <input id="laravel-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                            <label for="laravel-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Secondary</label>
                                        </div>
                                    </li>
                                </ul>


                            </div>
                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Color</label>
                            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option selected>Choose image Color</option>
                                <option value="US">Blue</option>
                                <option value="CA">Blac</option>
                                <option value="FR">Green</option>
                                <option value="DE">Yellow</option>
                            </select>
                        </div>
                    </div>

                    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                            <img className="object-cover" src="https://via.placeholder.com/400x200" alt="product image" />
                        </div>
                        <div className="mt-4 px-5 pb-5">

                            <div className='mb-2'>
                                <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                        <div class="flex items-center ps-3">
                                            <input id="vue-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                            <label for="vue-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Main</label>
                                        </div>
                                    </li>
                                    <li class="w-full">
                                        <div class="flex items-center ps-3">
                                            <input id="laravel-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                            <label for="laravel-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Secondary</label>
                                        </div>
                                    </li>
                                </ul>


                            </div>
                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Color</label>
                            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option selected>Choose image Color</option>
                                <option value="US">Blue</option>
                                <option value="CA">Blac</option>
                                <option value="FR">Green</option>
                                <option value="DE">Yellow</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
