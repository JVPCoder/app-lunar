import '../../assets/styles/output.css';

import React from 'react';

type BannerTitleProps = {
    title: string;
};

export const BannerTitle = ({title}: BannerTitleProps) => {
    return(
        <div className="flex justify-center m-3">
            <h1 className="font-bebas drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-7xl text-white">{title}</h1>
        </div>
    );
};
