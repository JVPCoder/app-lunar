import '../../assets/styles/output.css';
import { Link } from 'react-router-dom';

const Fonts = {
  ralewayblack: 'font-raleway font-semibold text-lg text-black',
  ralewayblackdetailed: 'font-raleway font-semibold text-3xl text-black',
}

type CardTitleProps = {
    titleSrc: string;
    link?: string | number;
    font?: 'ralewayblack' | 'ralewayblackdetailed' ;
    onClick?: () => void;
};

export const CardTitle = ({titleSrc , link, font='ralewayblack', onClick}: CardTitleProps) => {

  const fontFixed = Fonts[font]

    return (
        <div className="flex justify-center m-3 mt-6">
          <Link onClick={onClick} to={`/details/${link}`}>
            <h1 className={fontFixed}>{titleSrc}</h1>
          </Link>
        </div>
      );
};
