import '../../assets/styles/output.css';
import React from 'react';

const justifyType = {
    justifyEnd: 'justify-end',
    justifyCenter: 'justify-center'
}

type CardActionsProps = {
    children: React.ReactNode;
    style?: 'justifyEnd' | 'justifyCenter';
};

export const CardActions = ({children, style = 'justifyEnd'}: CardActionsProps) => {

    const justifyStyled = justifyType[style]

    return(
        <div className={`flex flex-row ${justifyStyled} m-3 p-2`}>
            {children}
        </div>
    );
};
