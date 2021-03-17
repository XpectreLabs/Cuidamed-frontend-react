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
    Circulatorio,
    CarpCancer
} from '../../images/icons/icons'

const arrayIconHumanSys = [
    {
        name: "óseo",
        component: <Oseo />,
        system: "Sistema óseo"
    },
    {
        name: "respiratorio",
        component: <Respiratorio />,
        system: "Sistema respiratorio"
    },
    {
        name: "reproductivo",
        component: <Reproductivo />,
        system: "Sistema reproductivo"
    },
    {
        name: "piel",
        component: <Piel />,
        system: "Piel"
    },
    {
        name: "endocrino",
        component: <Endocrino />,
        system: "Sistema endocrino"
    },
    {
        name: "urinario",
        component: <Urinario />,
        system: "Sistema urinario"
    },
    {
        name: "muscular",
        component: <Muscular />,
        system: "Sistema muscular"
    },
    {
        name: "nervioso",
        component: <Nervioso />,
        system: "Sistema nervioso"
    },
    {
        name: "digestivo",
        component: <Digestivo />,
        system: "Sistema digestivo"
    },
    {
        name: "circulatorio",
        component: <Circulatorio />,
        system: "Sistema circulatorio"
    },
    {
        name: "cancer",
        component: <CarpCancer />,
        system: "Cancer"
    }

]


const arraySearcHumanSystem = [
    {
        id: 1,
        status: "enfermedades",
        content: "sida 1"
    },
    {
        id: 2,
        status: "enfermedades",
        content: "sida 2"
    },
    {
        id: 3,
        status: "enfermedades",
        content: "sida 3"
    },
    {
        id: 4,
        status: "enfermedades",
        content: "Osteoporosis 1"
    },
    {
        id: 5,
        status: "enfermedades",
        content: "Osteoporosis 2"
    },
    {
        id: 6,
        status: "enfermedades",
        content: "Osteoporosis 2"
    }
]

export { arrayIconHumanSys, arraySearcHumanSystem }