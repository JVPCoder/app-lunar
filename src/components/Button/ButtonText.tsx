import '../../assets/styles/output.css';

const Fonts = {
    ralewaywhite: 'font-raleway text-white',
    ralewaywhitebold: 'font-raleway font-bold text-white',
    ralewaywhitebolddetailed: 'font-raleway font-bold text-white text-xl',
}

type ButtonTextProps = {
    content: string;
    font?: 'ralewaywhite' | 'ralewaywhitebold' | 'ralewaywhitebolddetailed';
};

export const ButtonText = ({content, font = 'ralewaywhite', ...rest}: ButtonTextProps) => {

    const fontFamilyColor = Fonts[font]

    return(
        <p className={fontFamilyColor}>{content}</p>
    );
};
