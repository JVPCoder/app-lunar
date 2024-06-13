import '../../assets/styles/output.css';

import addIcon from '../../assets/imgs/ui-images/add.png'
import removeIcon from '../../assets/imgs/ui-images/minus.png'
import closeIcon from '../../assets/imgs/ui-images/close.png'
import cartIcon from '../../assets/imgs/ui-images/shopCar.png'
import undoIcon from '../../assets/imgs/ui-images/undo.png'
import bagIcon from '../../assets/imgs/ui-images/bag.png'
import filterIcon from '../../assets/imgs/ui-images/filter.png'
import checkedIcon from '../../assets/imgs/ui-images/checked.png'
import ccIcon from '../../assets/imgs/ui-images/cc.png'
import instagramIcon from '../../assets/imgs/ui-images/instagram.png'
import xIcon from '../../assets/imgs/ui-images/twitter.png'
import whatsappIcon from '../../assets/imgs/ui-images/whatsapp.png'

const Icons = {
    add: addIcon,
    remove: removeIcon,
    close: closeIcon,
    cart: cartIcon,
    undo: undoIcon,
    bag: bagIcon,
    filter: filterIcon,
    checked: checkedIcon,
    cc: ccIcon,
    instagram: instagramIcon,
    x: xIcon,
    whatsapp: whatsappIcon,
}

type ButtonImageProps = {
    icon: 'add' | 'remove' | 'close' | 'cart' | 'undo' | 'bag' | 'filter' | 'checked' | 'cc' | 'instagram' | 'x' | 'whatsapp';
};

export const ButtonImage = ({ icon = 'add' }: ButtonImageProps) => {

    const buttonIcon = Icons[icon]

    return(
        <div>
            <img src={buttonIcon} alt="Button Icon" className="w-[32px] h-[32px]"/>
        </div>
    );
};
