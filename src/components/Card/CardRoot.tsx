import '../../assets/styles/output.css';
import React from 'react';

const Sizes = {
    normal: 'w-full md:w-96', // Ajustado para largura total em telas pequenas e médias, e largura fixa em telas grandes
    detailed: 'w-full transform scale-60 sm:scale-75 md:scale-90 lg:scale-95 xl:scale-100', // Utilizando transform scale para ajustar o tamanho responsivo
}

type CardProps = {
    children?: React.ReactNode;
    size?: 'normal' | 'detailed';
};

export const CardRoot = ({ children, size='normal' }: CardProps) => {

    const sizeFixer = Sizes[size];

    return(
        <div className="bg-white">
            <div className="flex items-center justify-center">
                <div className={`flex flex-col bg-white ${sizeFixer} overflow-hidden rounded-md shadow-2xl border-2`}>
                    {children}
                </div>
            </div>
        </div>
    );
};
