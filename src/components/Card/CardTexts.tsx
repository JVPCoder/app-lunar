import '../../assets/styles/output.css';
import React from 'react';

type CardTextsProps = {
    children: React.ReactNode;
};

export const CardTexts = ({children}: CardTextsProps) => {
    return(
        <div className="flex flex-row justify-between m-3 p-2 pr-8 pl-8">
            {children}
        </div>
    );
};
