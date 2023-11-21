import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import ImageItem from './ImageItem';


export default forwardRef((props, ref) => {
    const [selectedColors, setSelectedColors] = useState([]);
    const [errorIndex, setErrorIndex] = useState([]);
    const [images, setImages] = useState([
        { src:'https://via.placeholder.com/400x200' },
        { src:'https://via.placeholder.com/400x200' },
        { src:'https://via.placeholder.com/400x200' },
        { src:'https://via.placeholder.com/400x200' },
        { src:'https://via.placeholder.com/400x200' },
        { src:'https://via.placeholder.com/400x200' },
        { src:'https://via.placeholder.com/400x200' },
        { src:'https://via.placeholder.com/400x200' },
    ])


    const handleColorChange = (color, index) => {
        // Create a new copy of the images array
        const updatedImages = [...images];
        // Update the color property of the specific image
        updatedImages[index] = { ...updatedImages[index], color: color };
        // Update the state with the new copy of the images array
        setImages(updatedImages);

        console.log(updatedImages);
    };

    const colors = [
        { name: 'Blue' },
        { name: 'Red' },
        { name: 'Green' },
        { name: 'Yellow' },
        { name: 'Brown' }
    ];

    useImperativeHandle(ref, () => ({
        submitedForm() {

            const indicesWithoutColor = images.map((image, index) => (!image.color || image.color === '') ? index : -1)
                .filter(index => index !== -1);
            
            setErrorIndex(indicesWithoutColor);

            console.log(indicesWithoutColor.length);

            if(indicesWithoutColor.length !== 0) {
                return { status: false };
            }
            return { status: true };
        },
    }));

    return (
        <div className="mt-12">
            <div className="card flex justify-center">
                <MultiSelect value={selectedColors} onChange={(e)=> setSelectedColors(e.value)}
                    options={colors}
                    optionLabel="name"
                    filter
                    placeholder="Select Color"
                    maxSelectedLabels={3}
                    className="w-full"
                    />
            </div>

            <div className="mt-4">
                <div className='grid grid-cols-3'>
                    {images.map((image, index) => (
                        <div key={index}>
                            <ImageItem 
                                key={index}
                                image={image}
                                index={index}
                                errorIndex={errorIndex}
                                colors={selectedColors}
                                onColorChange={handleColorChange}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});