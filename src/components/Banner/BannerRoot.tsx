import '../../assets/styles/output.css';
import React from 'react';

type BannerProps = {
    children: React.ReactNode;
};

export const BannerRoot = ({children}: BannerProps) =>{
    return(
        <>
            <div className="bg-white w-full">
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-full flex flex-col justify-between sm:flex-row items-center p-4 bg-white rounded-lg shadow-lg bg-cover bg-no-repeat bg-[url('../../assets/imgs/general-images/front.jpg')]">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
