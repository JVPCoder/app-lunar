import '../assets/styles/output.css';
import src from '../assets/imgs/ui-images/LogoSneakerPeak.png'
import { Link } from 'react-router-dom';

import { Button } from './Button';

const logoSrc = src;

const Hidden = {
  yes: 'visible',
  no: 'invisible'
}

// Definindo as propriedades que o componente Header irá aceitar
type HeaderProps = {
    onclick:() => void;
    isButtonVisible?: 'yes' | 'no';
}

 export const Header = ({ onclick, isButtonVisible='yes' }: HeaderProps) => {

  const visibleFix = Hidden[isButtonVisible];

    return (
      <header className="bg-white min-h-[10vh] border-b-2 border-black flex flex-row items-center justify-between p-6">
        <Link to="/"><img src={logoSrc} alt="Logo" className="h-32" /></Link>

        <div className={visibleFix}>
          <Button.Root onclick={onclick}>
            <Button.Image icon='bag'></Button.Image>
          </Button.Root>
        </div>

      </header>
    );
};

export default Header;
