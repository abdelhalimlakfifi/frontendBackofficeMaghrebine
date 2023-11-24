import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../layouts/layouts';
import { Steps } from 'primereact/steps';
import InformationsForm from './ProductComponents/InformationsForm';
import ImagesUploadForm from './ProductComponents/ImagesUploadForm';
import FiltersStoreForm from './ProductComponents/FiltersStoreForm';
import ImageColorsFilters from './ProductComponents/ImageColorsFilters';
import { Button } from 'primereact/button';
import axios from 'axios';

export default function ProductStore() {
    // const [data, setData] = useState({});
    const [activeIndex, setActiveIndex] = useState(0);
    const [backendData, setBackendData] = useState({})
    useEffect(() => {
        const getDataFromBackend = async () => {
            const data = await axios.get('http://localhost:3000/api/product/create');
            setBackendData(data.data);
        }
        getDataFromBackend();
    }, []);


    const nullRef = useRef();
    const childRef = useRef();
    
    const items = [
        { label: 'Information', command: () => {} },
        { label: 'images upload', command: () => {} },
        { label: 'Image/Colors filters', command: () => {} },
        { label: 'Size-Category-Type', command: () => {} },
    ];

    const handlePrevious = () => setActiveIndex(activeIndex - 1);
    const handleNext = async () => {
        if(childRef.current.submitedForm().status)
        {
            setActiveIndex(activeIndex + 1)
        }
    };

    const handleSubmit = () => {
        console.log(childRef.current.submitedForm());
        console.log('submit');
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
                                <FormComponent ref={index === activeIndex ? childRef : nullRef} />
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
