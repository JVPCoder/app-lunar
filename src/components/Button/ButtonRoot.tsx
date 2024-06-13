import '../../assets/styles/output.css';
import React from 'react';

const Styles = {
    blackImg:  'bg-black flex justify-center text-white w-[80px] h-fit p-1 rounded-md hover:bg-gray-800 hover:scale-90',
    greenImg:  'bg-green-700 flex justify-center text-white w-[80px] h-fit p-1 rounded-md hover:bg-green-900 hover:scale-90',
    greenText: 'bg-green-700 flex justify-center text-white w-[400px] h-fit p-2 rounded-md hover:bg-green-900 hover:scale-90',
    blackText: 'bg-black flex justify-center text-white w-[600px] h-fit p-2 rounded-md hover:bg-gray-800 hover:scale-90',
}

type ButtonProps = {
    children: React.ReactNode;
    style?: 'blackImg' | 'greenImg' | 'greenText' | 'blackText';
    onclick: () => void;
    disabled?: boolean;
    transition?: string;
};

export const ButtonRoot = ({ children,disabled, transition, style = 'blackImg', onclick}: ButtonProps) => {
    const buttonStyled = Styles[style]

    return(
        <button className='border-none' onClick={onclick}>
            <div className="flex items-center justify-center">
                <div className={buttonStyled + disabled + transition}>
                    {children}
                 </div>
            </div>
        </button>
    );
};
