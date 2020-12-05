import {
    CarpDigestivo,
    CarpEndocrino,
    CarpMuscular,
    CarpNervioso,
    CarpOseo,
    CarpPiel,
    CarpRespiratorio,
    CarpSanguineo,
    CarpSexual,
    CarpUrinario,
} from '../../images/icons/icons';

import {
    arrayCirculatorio,
    arrayDigestivo,
    arrayPiel,
    arrayEndocrino,
    arrayMuscular,
    arrayRespiratorio,
    arrayReproductor,
    arrayNervioso,
    arrayUrinario,
    arrayOseo,
} from '../DragAndDrop/data';

const carpetaSistemas = [
    {
        svg: <CarpOseo />,
        name: "Sistema óseo",
        humanSystem: 'óseo',
        arrayData: arrayOseo,
        color: '#2b19a0',
    },
    {
        svg: <CarpMuscular />,
        name: "Sistema muscular",
        humanSystem: 'muscular',
        arrayData: arrayMuscular,
        color: '#772d11',
    },
    {
        svg: <CarpDigestivo />,
        name: "Sistema digestivo",
        humanSystem: 'digestivo',
        arrayData: arrayDigestivo,
        color: '#19a054'
    },
    {
        svg: <CarpSanguineo />,
        name: "Sistema circulatorio",
        humanSystem: 'circulatorio',
        arrayData: arrayCirculatorio,
        color: '#a01919'
    },
    {
        svg: <CarpUrinario />,
        name: "Sistema urinario",
        humanSystem: 'urinario',
        arrayData: arrayUrinario,
        color: '#86a019'
    },
    {
        svg: <CarpNervioso />,
        name: "Sistema nervioso",
        humanSystem: 'nervioso',
        arrayData: arrayNervioso,
        color: '#32812c'
    },
    {
        svg: <CarpSexual />,
        name: "Sistema reproductivo",
        humanSystem: 'reproductivo',
        arrayData: arrayReproductor,
        color: '#ff1695'
    },
    {
        svg: <CarpEndocrino />,
        name: "Sistema endocrino",
        humanSystem: 'endocrino',
        arrayData: arrayEndocrino,
        color: '#a07319'
    },
    {
        svg: <CarpRespiratorio />,
        name: "Sistema respiratorio",
        humanSystem: 'respiratorio',
        arrayData: arrayRespiratorio,
        color: '#2c6d81'
    },
    {
        svg: <CarpPiel />,
        name: "Piel",
        humanSystem: 'piel',
        arrayData: arrayPiel,
        color: '#81452c'
    },

]


export { carpetaSistemas }