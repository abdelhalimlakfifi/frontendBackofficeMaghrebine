import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Editor } from 'primereact/editor';

// InformationsForm component using forwardRef to expose a submitedForm function
const InformationsForm = forwardRef((props, ref) => {
    // State for form data and errors
    const [formData, setFormData] = useState({
        title: '',
        price: 0,
        description: '',
    });

    const [formDataError, setFormDataError] = useState({
        title: '',
        price: '',
        description: '',
    });

    const [longDescription, setLongDescription] = useState();
    const titleLimits = 100;
    const descriptionLimit = 255;

    // Handler for title input change
    const handleTitleChange = (e) => {
        const newTitle = e.target.value.slice(0, titleLimits);
        setFormData({ ...formData, title: newTitle });
    };

    // Handler for description input change
    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value.slice(0, descriptionLimit);
        setFormData({ ...formData, description: newDescription });
    };

    // useImperativeHandle to expose a submitedForm function via ref
    useImperativeHandle(ref, () => ({
        submitedForm() {
            const newFormDataError = {};

            // Validation for title, price, and description
            if (formData.title.length === 0) {
                newFormDataError.title = "Title is required";
            }
            if (formData.price === 0) {
                newFormDataError.price = "Price should not be 0";
            }
            if (formData.description.length === 0) {
                newFormDataError.description = "Description is required";
            }

            // Set errors in state
            setFormDataError(newFormDataError);

            // If there are errors, return status: false
            if (Object.keys(newFormDataError).length !== 0) {
                return { status: false };
            }

            // If no errors, set longDescription in formData and return status: true with data
            setFormData({ ...formData, longDescription: longDescription });
            return {
                status: true,
                data: formData,
                longDescription: longDescription
            };
        },
    }));

    // JSX for the form
    return (
        <form>
            <div className="my-2 flex flex-col space-y-6">
                {/* Title and Price section */}
                <div className="flex flex-col md:flex-row md:space-x-5">
                    <div className="flex flex-col w-full">
                        <label htmlFor="title" className="font-bold block mb-2">
                            Title
                        </label>
                        <InputText
                            id="title"
                            aria-describedby="title-help"
                            name="title"
                            value={formData.title}
                            onChange={handleTitleChange}
                        />
                        <div className="flex justify-between">
                            <small className={formData.title.length === titleLimits ? `text-red-700` : `text-gray-800`}>{formData.title.length}/{titleLimits}</small>
                            <small className='text-red-600 italic text-xs'>{formDataError.title}</small>
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="currency-us" className="font-bold block mb-2">
                            Price
                        </label>
                        <InputNumber
                            className="w-full"
                            inputId="currency-us"
                            value={formData.price}
                            onValueChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            mode="currency"
                            currency="MAD"
                            locale="en-US"
                        />
                        <div className='flex justify-between'>
                            <small className='text-red-600 italic text-xs'>{formDataError.price}</small>
                        </div>
                    </div>
                </div>

                {/* Short Description section */}
                <div>
                    <label htmlFor="description" className="font-bold block mb-2">
                        Short Description
                    </label>
                    <InputTextarea
                        className={`w-full`}
                        rows={5}
                        cols={30}
                        value={formData.description}
                        onChange={handleDescriptionChange}
                    />
                    <div className='flex justify-between'>
                        <small id="title-help">{formData.description.length}/{descriptionLimit}</small>
                        <small className='text-red-600 italic text-xs'>{formDataError.description}</small>
                    </div>
                </div>

                {/* Long Description section */}
                <div>
                    <label htmlFor="title" className="font-bold block mb-2">
                        Long Description
                    </label>
                    <Editor
                        value={longDescription}
                        onTextChange={(e) => setLongDescription(e.htmlValue)}
                        style={{ height: '200px' }}
                        className="w-full"
                    />
                </div>
            </div>
        </form>
    );
});

// Export the InformationsForm component
export default InformationsForm;
