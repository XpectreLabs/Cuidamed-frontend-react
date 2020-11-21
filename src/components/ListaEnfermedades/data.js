import {
    Oseo,
    Respiratorio,
    Reproductivo,
    Piel,
    Endocrino,
    Nervioso,
    Urinario,
    Muscular,
    Digestivo,
    Circulatorio
} from '../../images/icons/icons'

const arrayIconHumanSys = [
    {
        name: "óseo",
        component: <Oseo></Oseo>,
        system: "Sistema óseo",
        color: "#2b19a0",
    },
    {
        name: "respiratorio",
        component: <Respiratorio></Respiratorio>,
        system: "Sistema respiratorio",
        color: '#2c6d81',
    },
    {
        name: "reproductivo",
        component: <Reproductivo></Reproductivo>,
        system: "Sistema reproductivo",
        color: '#ff1695',
    },
    {
        name: "piel",
        component: <Piel></Piel>,
        system: "Piel",
        color: "#81452c"
    },
    {
        name: "endocrino",
        component: <Endocrino></Endocrino>,
        system: "Sistema endocrino",
        color: '#a07319',
    },
    {
        name: "urinario",
        component: <Urinario></Urinario>,
        system: "Sistema urinario",
        color: '#86a019',
    },
    {
        name: "muscular",
        component: <Muscular></Muscular>,
        system: "Sistema muscular",
        color: '#772d11',
    },
    {
        name: "nervioso",
        component: <Nervioso></Nervioso>,
        system: "Sistema nervioso",
        color: '#32812c',
    },
    {
        name: "digestivo",
        component: <Digestivo></Digestivo>,
        system: "Sistema digestivo",
        color: '#19a054',
    },
    {
        name: "circulatorio",
        component: <Circulatorio></Circulatorio>,
        system: "Sistema circulatorio",
        color: '#a01919',
    }

]

export { arrayIconHumanSys }