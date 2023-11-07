import React from "react";
import { Link } from "react-router-dom";

import { Button } from "primereact/button";


export default function Botton({ loading }) {
    return (
            <>
                <Button 
                    label="Confirm email" 
                    type="submit" 
                    iconPos="right" 
                    icon="pi pi-check-square" 
                    className="text-xm w-full bg-custom-purple hover:bg-custom-purple focus:outline-none focus:bg-custom-purple"
                    loading={loading}
                />
            </>
    );
}
