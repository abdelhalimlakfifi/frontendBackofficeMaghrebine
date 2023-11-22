import React, { useState } from 'react'

export default function ImageItem({ image, colors, index, onColorChange, errorIndex }) {
    const [selectedColor, setSelectedColor] = useState(null);

    const handleColorChange = (color) => {
        setSelectedColor(color);
        onColorChange(color, index);
    };

return (
<div
    className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
    <div
        className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
            <img className="object-cover" src={image.src} alt="product image" />
        </div>
        <div className="mt-4 px-5 pb-5">

            <label htmlFor={`color-select-${index}`}
                className="block mb-2 text-sm font-medium text-gray-900">Color</label>
            <select id={`color-select-${index}`} value={selectedColor || "" } onChange={(e)=>
                handleColorChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                <option value="">Choose image Color</option>
                {colors.map((color, index) => (
                    <option key={index} value={color.name}>{color.name}</option>
                ))}

            </select>
            <small className='text-red-600 italic text-xs'>{errorIndex.includes(index) ? 'Select Color for this image' : ''}</small>            
        </div>
    </div>
</div>
)
}