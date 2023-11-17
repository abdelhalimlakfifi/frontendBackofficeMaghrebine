import React, { useState, useEffect } from 'react';
import Layout from '../../layouts/layouts';
import { Steps } from 'primereact/steps';
import InformationsForm from './ProductComponents/InformationsForm';
import ImagesForm from './ProductComponents/ImagesForm';
import FiltersStoreForm from './ProductComponents/FiltersStoreForm';
import { Button } from 'primereact/button';

export default function ProductStore() {
    const [activeIndex, setActiveIndex] = useState(0);

    const items = [
        { label: 'Information', command: () => {} },
        { label: 'images', command: () => {} },
        { label: 'Colors', command: () => {} },
        { label: 'Filters', command: () => {} },
    ];

    const handlePrevious = () => setActiveIndex(activeIndex - 1);
    const handleNext = () => setActiveIndex(activeIndex + 1);

    const isPreviousDisabled = activeIndex === 0;
    const isNextDisabled = activeIndex === items.length - 1;

    const stepStyles = {
        step: { className: 'w-12 h-12 text-lg' },
        activeStep: { className: 'font-bold' },
    };

    useEffect(() => {
        console.log(activeIndex);
    }, [activeIndex]);

    const stepComponents = [InformationsForm, ImagesForm, FiltersStoreForm];

    return (
        <Layout>
            <div className='mx-4 lg:mx-32 mt-8 min-h-[80vh] md:min-h-[88vh] flex flex-col justify-between'>

                <div>
                    <Steps
                        model={items}
                        activeIndex={activeIndex}
                        onSelect={(e) => setActiveIndex(e.index)}
                        readOnly={false}
                        pt={stepStyles}
                    />

                    <div>
                        {stepComponents.map((FormComponent, index) => (
                            <div key={index} style={{ display: index === activeIndex ? 'block' : 'none' }}>
                                <FormComponent />
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
                        disabled={isNextDisabled}
                        onClick={handleNext}
                        label='Next'
                        iconPos='right'
                        icon='pi pi-angle-right'
                        className='bg-light-gold border-light-gold'
                    />
                </div>
            </div>
        </Layout>
    );
}
