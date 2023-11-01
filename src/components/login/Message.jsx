import React from "react";
import {useSelector}  from "react-redux"; 
import { Message } from 'primereact/message';


export default function ErrorMessage () {

    const {error } = useSelector((state) => state.user);

    return(
        <>
        
        <Message severity="error" text={error && <div>{error}</div>} />

    </>

    )
 
}


