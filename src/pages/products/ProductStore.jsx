import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../layouts/layouts';
import { Steps } from 'primereact/steps';
import InformationsForm from './ProductComponents/InformationsForm';
import ImagesUploadForm from './ProductComponents/ImagesUploadForm';
import FiltersStoreForm from './ProductComponents/FiltersStoreForm';
import ImageColorsFilters from './ProductComponents/ImageColorsFilters';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProductStore() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [backendData, setBackendData] = useState({});
    const [colors, setColors] = useState([]);
    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [subcategories, setSubCategorie] = useState([]);
    const [images, setImages] = useState([]);
    const navigate = useNavigate()
    
    useEffect(() => {
        const getDataFromBackend = async () => {
            const data = await axios.get('http://localhost:3000/api/product/create');
            setBackendData(data.data);
        }
        getDataFromBackend();
    }, []);


    useEffect(() => {
        setTypes(backendData.types);
        setCategories(backendData.categories);
        setSizes(backendData.sizes);
        setSubCategorie(backendData.subcategories);
        setColors(backendData.colors);
    }, [backendData])
    const nullRef = useRef();
    const childRef = useRef();
    
    const items = [
        { label: 'Information', command: () => {} },
        { label: 'images upload', command: () => {} },
        { label: 'Image/Colors filters', command: () => {} },
        { label: 'Size-Category-Type', command: () => {} },
    ];

    const handlePrevious = () => {
        
        if(activeIndex === 2) {
            setActiveIndex(activeIndex - 2)
        }else{
            setActiveIndex(activeIndex - 1)
        }
    };
    const handleNext = async () => {

        const data = await childRef.current.submitedForm();
        console.log(data);
        if(data.images !== undefined){
            console.log(data.images);
        }
        if(data.status)
        {
            const localStorageData = localStorage.getItem('images');
            if(localStorageData !== null && activeIndex === 0) 
            {
                setActiveIndex(activeIndex + 2)

            }else{
                setActiveIndex(activeIndex + 1)
            }
        }
    };

    const handleSubmit = async  () => {
        childRef.current.submitedForm()

        
        const images = JSON.parse(localStorage.getItem('imagesWithColors'));
        const filters = JSON.parse(localStorage.getItem('filters'));
        const information = JSON.parse(localStorage.getItem('product_information'));
        const mainAndSecondary = JSON.parse(localStorage.getItem('images'))

        try {
            // const response = await axios.post('http://localhost:3000/api/product/store',{
            //     data: {
            //         images,
            //         filters,
            //         information,
            //         mainAndSecondary
            //     }
            // });
            
            localStorage.removeItem('imagesWithColors');
            localStorage.removeItem('filters');
            localStorage.removeItem('product_information');
            localStorage.removeItem('images');

            navigate('/products', {
                state: true,
            })

        } catch (error) {
            console.log(error);
        }
        console.log("submit from parent");
    }

    const isPreviousDisabled = activeIndex === 0;
    const isNextDisabled = activeIndex === items.length - 1;

    const stepStyles = {
        step: { className: 'w-12 h-12 text-lg' },
        activeStep: { className: 'font-bold' },
    };

    const stepComponents = [InformationsForm, ImagesUploadForm, ImageColorsFilters, FiltersStoreForm];


    
    return (
        <Layout>
            <div className='mx-4 lg:mx-32 mt-8 min-h-[80vh] md:min-h-[88vh] flex flex-col justify-between'>

                <div>
                    <Steps
                        model={items}
                        activeIndex={activeIndex}
                        pt={stepStyles}
                    />

                    <div>
                        {stepComponents.map((FormComponent, index) => (
                            <div key={index} style={{ display: index === activeIndex ? 'block' : 'none' }}>
                                <FormComponent 
                                    categories={categories}
                                    subcategories={subcategories}
                                    colors={colors}
                                    types={types}
                                    sizes={sizes}
                                    images={images !== undefined ? images : null}
                                    ref={index === activeIndex ? childRef : nullRef}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='w-full flex justify-between bottom-4'>
                    <Button
                        disabled={isPreviousDisabled}
                        onClick={handlePrevious}
                        label='Previous'
                        icon='pi pi-angle-left'
                        className='bg-light-gold border-light-gold'
                    />
                    <Button
                        onClick={ isNextDisabled ? handleSubmit  : handleNext}
                        label={isNextDisabled ? 'Submit' : 'Next'}
                        iconPos='right'
                        icon={isNextDisabled ? '' : 'pi pi-angle-right'}
                        className='bg-light-gold border-light-gold'
                    />
                </div>
            </div>
        </Layout>
    );
}
