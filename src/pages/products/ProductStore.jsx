import React, { useState, useRef} from 'react'
import Layout from '../../layouts/layouts'
import { Steps } from 'primereact/steps';
import InformationsForm from './ProductComponents/InformationsForm';
import { Button } from 'primereact/button';

export default function ProductStore() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [data, setData] = useState({});

    const items = [
        {
            label: 'Information',
            command: (event) => {
                
            }
        },
        {
            label: 'Colors&images',
            command: (event) => {
                
            }
        },
        {
            label: 'Filters',
            command: (event) => {
                
            }
        },
        
    ];
    return (

        <Layout>

            <div className=' mx-4 lg:mx-32 mt-8'>
                <Steps 
                    model={items}
                    activeIndex={activeIndex}
                    onSelect={(e) => setActiveIndex(e.index)}
                    readOnly={false}
                    pt={{
                        step: { className: 'w-12 h-12 text-lg'},
                        activeStep: { className: 'font-bold' }
                    }}
                />

                {activeIndex === 0 && (
                    <div>
                        <InformationsForm />
                    </div>
                )}


                {activeIndex === 1 && (
                    <div>
                        <InformationsForm />
                    </div>
                )}
                {activeIndex === 2 && (
                    <div>
                        <InformationsForm />
                    </div>
                )}

                <div className='w-full flex justify-between'>

                    <Button disabled={activeIndex == 0} onClick={() => setActiveIndex(activeIndex - 1)} label="Previous" icon="pi pi-angle-left" className=' bg-light-gold border-light-gold'/>
                    <Button disabled={activeIndex == items.length - 1} onClick={() => setActiveIndex(activeIndex + 1)} label="Next" iconPos="right" icon="pi pi-angle-right" className=' bg-light-gold border-light-gold' />
                </div>
            </div>

        </Layout>
    )
}
