import {
    Alergias,
    Bisturi,
    Fractura,
    Protesis,
    Silla,
    UnidadSangre,
    Virus,
    IconDonador,
  } from "../../images/icons/icons";

const records = [
    {
      icon: <Virus />,
      subtitle: 'Covid 19',
      question: '¿Alguna ves has tenido coronavirus?'
    },
    {
        icon: <Bisturi />,
        subtitle: 'Cirugías',
        question: '¿Alguna ves has tenido cirugías?'
    },
    {
      icon: <Fractura />,
      subtitle: 'Fracturas',
      question: '¿Alguna ves has tenido fracturas?'
    },
    {
        icon: <UnidadSangre />,
        subtitle: 'Transfusiones',
        question: '¿Alguna ves has tenido transfuciones de sangre?'
    },
    {
      icon: <Alergias />,
      subtitle: 'Alergias',
      question: '¿Tienes alergias?'
    },
    {
        icon: <Silla />,
        subtitle: 'Discapacidades',
        question: '¿Tienes discapacidades?'
    },
    {
        icon: <Protesis />,
        subtitle: 'Otras características',
        question: '¿Tienes implantes, protesis, marcapasos, etc?'
    },
    // {
    //     icon: <IconDonador />,
    //     subtitle: 'Transplante de órganos',
    //     question: '¿Alguna ves has tenido transplantes?'
    // },
    
  ];

  export {records};