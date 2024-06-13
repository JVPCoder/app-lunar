import '../../assets/styles/output.css';
import React from 'react';

type BannerActionsProps = {
    children: React.ReactNode;
};

export const BannerActions = ({children}: BannerActionsProps) => {
    return(
        <div className="flex flex-row gap-5 justify-center m-3 p-2">
            {children}
        </div>
    );
};
