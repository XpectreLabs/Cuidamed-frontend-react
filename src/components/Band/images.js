import ImageBlue1 from '../../images/Azul1.png';
import ImageBlue2 from '../../images/Azul2.png';
import ImageBlue3 from '../../images/Azul3.png';
import ImageBlue4 from '../../images/Azul4.png';

import ImageBlack1 from '../../images/Negra1.png';
import ImageBlack2 from '../../images/Negra2.png';
import ImageBlack3 from '../../images/Negra3.png';
import ImageBlack4 from '../../images/Negra4.png';


const arrayImages = [
    {type: "blue", data: [
        {image:ImageBlue1 },
        {image:ImageBlue2 },
        {image:ImageBlue3 },
        {image:ImageBlue4 },
    ]},
    {type: "black", data: [
        {image:ImageBlack1 },
        {image:ImageBlack2 },
        {image:ImageBlack3 },
        {image:ImageBlack4 },
    ]}
];

export const findImageByType = (type) => {
    const found = arrayImages.find((val) => val.type === type );
    return found ? found.data : {};
}