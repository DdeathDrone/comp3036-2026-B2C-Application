// mocks/next/link.js
import React, { ReactHTMLElement } from "react";

const Image = ({
    src,
    alt,
    width,
    height
}: {src: string, alt: string, width: string, height: string}) =>{
    return <p>{src}</p>
    
}

export default Image;