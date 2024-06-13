import '../../assets/styles/output.css';
import React from 'react';

const Sizes = {
    normal: 'w-96',
    detailed: 'w-[700px]'
}

type CardProps = {
    children?: React.ReactNode;
    size?: 'normal' | 'detailed';
};

export const CardRoot = ({ children, size='normal' }: CardProps) => {

    const sizeFixer = Sizes[size];

    return(
        <>
            <div className="bg-white">
                <div className="flex items-center justify-center">
                    <div className={`flex flex-col bg-white h-fit ${sizeFixer} overflow-hidden rounded-md shadow-2xl border-2"`}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};
