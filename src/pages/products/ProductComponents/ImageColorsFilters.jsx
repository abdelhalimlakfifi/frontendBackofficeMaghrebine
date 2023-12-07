import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import ImageItem from './ImageItem';


export default forwardRef((props, ref) => {
    const [selectedColors, setSelectedColors] = useState([]);
    const [errorIndex, setErrorIndex] = useState([]);
    const [images, setImages] = useState([]);




    const handleColorChange = (color, index) => {
        // Create a new copy of the images array
        const updatedImages = [...images];
        // Update the color property of the specific image
        updatedImages[index] = { ...updatedImages[index], color: color };
        // Update the state with the new copy of the images array
        setImages(updatedImages);
    
    };

    

    useImperativeHandle(ref, () => ({
        submitedForm() {

            const indicesWithoutColor = images.map((image, index) => (!image.color || image.color === '') ? index : -1)
                .filter(index => index !== -1);
            
            setErrorIndex(indicesWithoutColor);

            if(indicesWithoutColor.length == 0) {
                localStorage.setItem('imagesWithColors', JSON.stringify(images));
                return { 
                    status: true,
                    step: 3
                };
            }

            return { status: false };
        },
    }));


    useEffect(() => {
        const imageFromLocal = JSON.parse(localStorage.getItem('imagesWithColors'));
        if(imageFromLocal !== null) {
            setImages(imageFromLocal);
        }else{
            const imagesLocal = JSON.parse(localStorage.getItem('images'));
            if(imagesLocal !== null) {
                setImages(imagesLocal.others);
            }
        }
    }, [])
    return (
        <div className="mt-12">
            <div className="mt-4">
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
                    {images.map((image, index) => (
                        <div key={index} className='flex justify-center'>
                            <ImageItem 
                                key={index}
                                image={image}
                                index={index}
                                errorIndex={errorIndex}
                                colors={props.colors ?? []}
                                onColorChange={handleColorChange}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});