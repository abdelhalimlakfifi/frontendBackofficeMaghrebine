import React from "react"

export default function Divider () {
    return (
        <>
          <div className="flex items-center mt-4">
          <div className="border-t w-1/2"></div>
          <div className="mx-4 text-gray-600 font-bold">or</div>
          <div className="border-t w-1/2"></div>
        </div>    
        </>
    )
}