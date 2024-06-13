import '../../assets/styles/output.css';

const Fonts = {
    bebaswhite: 'font-bebas text-white',
    ralewayblack: 'font-raleway text-black',
    ralewayblackdetailed: 'font-raleway text-black text-2xl',
    ralewaywhite: 'font-raleway text-white',
    ralewaygray: 'font-raleway text-gray-400',
    interblack: 'font-inter text-black',
    interblackdetailed: 'font-inter text-black text-2xl',
    intergray: 'font-inter text-gray-400',
    intergraydetailed: 'font-inter text-gray-400 font-bold text-2xl',
    intergreen: 'font-inter font-bold text-green-700',
    intergreendetailed: 'font-inter font-bold text-green-700 text-3xl',
}

type CardTextProps = {
    content: string;
    font?: 'bebaswhite' | 'ralewayblack' | 'ralewayblackdetailed' | 'ralewaywhite' | 'ralewaygray' | 'interblack' | 'interblackdetailed' | 'intergray' | 'intergraydetailed' | 'intergreen' | 'intergreendetailed';
};

export const CardText = ({content, font = 'ralewayblack', ...rest}: CardTextProps) => {

    const fontFixed = Fonts[font]

    return(
        <p className={fontFixed}>{content}</p>
    );
};
