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

const carpetaSistemas = [
    {
        svgFirst: <CarpOseo />,
        idFirst: "oseo",
        nameFirst: "Sistema óseo",
        svgSecond: <CarpMuscular />,
        idSecond: "muscular",
        nameSecond: "Sistema muscular",
        svgThird: <CarpDigestivo />,
        idThird: "digestivo",
        nameThird: "Sistema digestivo",
        svgFourth: <CarpSanguineo />,
        idFourth: "sanguineo",
        nameFourth: "Sistema circulatorio",

    },
    // {
    //     svg: <CarpMuscular />,
    //     id: "muscular",
    //     name: "Sistema muscular",
    // },
    // {
    //     svg: <CarpDigestivo />,
    //     id: "digestivo",
    //     name: "Sistema digestivo",
    // },
    // {
    //     svg: <CarpSanguineo />,
    //     id: "sanguineo",
    //     name: "Sistema circulatorio",
    // },
    {
        svgFirst: <CarpUrinario />,
        idFirst: "urinario",
        nameFirst: "Sistema urinario",
        svgSecond: <CarpNervioso />,
        idSecond: "nervioso",
        nameSecond: "Sistema nervioso",
        svgThird: <CarpSexual />,
        idThird: "sexual",
        nameThird: "Sistema reproductivo",
        svgFourth: <CarpEndocrino />,
        idFourth: "endocrino",
        nameFourth: "Sistema endocrino",
    },
    // {
    //     svg: <CarpNervioso />,
    //     id: "nervioso",
    //     name: "Sistema nervioso",
    // },
    // {
    //     svg: <CarpSexual />,
    //     id: "sexual",
    //     name: "Sistema reproductivo",
    // },
    // {
    //     svg: <CarpEndocrino />,
    //     id: "endocrino",
    //     name: "Sistema endocrino",
    // },
    {
        svgFirst: <CarpRespiratorio />,
        idFirst: "respiratorio",
        nameFirst: "Sistema respiratorio",
        svgSecond: <CarpPiel />,
        idSecond: "piel",
        nameSecond: "Piel",
    },
    // {
    //     svg: <CarpPiel />,
    //     id: "piel",
    //     name: "Piel",
    // },
   
]


export { carpetaSistemas }