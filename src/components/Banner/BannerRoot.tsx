import '../../assets/styles/output.css';
import React from 'react';

type BannerProps = {
    children: React.ReactNode;
    bgSrc?: string;
};

export const BannerRoot = ({children, bgSrc}: BannerProps) =>{
    return(
        <>
            <div className="bg-white">
                <div className="flex items-center justify-center">
                    <div className="flex flex-col bg-cover bg-no-repeat bg-[url('../../assets/imgs/general-images/front.jpg')] w-[1337px] h-[700px] overflow-hidden rounded-md shadow-2xl border-2 justify-center">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
