import '../../assets/styles/output.css';

import React from 'react';

type CardImageProps = {
    produtoSrc: string;
};

export const CardImage = ({ produtoSrc }: CardImageProps) => {
    return(
        <div className="border ml-10 mr-10 mt-5 rounded-md">
            <img src={produtoSrc} alt="Sneaker Img" className="w-fit h-fit shadow-lg rounded-md"/>
        </div>
    );
};
