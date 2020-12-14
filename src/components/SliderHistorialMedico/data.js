import {
  Alergias,
  Bisturi,
  Fractura,
  Protesis,
  Silla,
  UnidadSangre,
  Virus,
  IconDonador,
  Abuelo,
  Abuela,
  Madre,
  Padre,
} from '../../images/icons/icons';

const records = [
  {
    id: 1,
    icon: <Virus />,
    subtitle: 'Covid 19',
    question: '¿Alguna ves has tenido coronavirus?',
    placeholderNumber: 'Veces contagiado',
    placeholderAnswer: 'Medicamentos tomados',
    placeholderDate: 'Año de contagio',
  },
  {
    id: 2,
    icon: <Bisturi />,
    subtitle: 'Cirugías',
    question: '¿Alguna ves has tenido cirugías?',
    placeholder: 'Fecha aproximada',
    placeholderNumber: 'Número de cirugías',
    placeholderAnswer: 'Cirugías',
    placeholderDate: 'Año aproximado',
  },
  {
    id: 3,
    icon: <Fractura />,
    subtitle: 'Fracturas',
    question: '¿Alguna ves has tenido fracturas?',
    placeholderNumber: 'Número de fracturas',
    placeholderAnswer: 'Fractura',
    placeholderDate: 'Año aproximado',
  },
  {
    id: 4,
    icon: <UnidadSangre />,
    subtitle: 'Transfusiones',
    question: '¿Alguna ves has tenido transfuciones de sangre?',
    placeholderNumber: 'Número de fracturas',
    placeholderAnswer: 'Fractura',
    placeholderDate: 'Año aproximado',
  },
  {
    id: 4,
    icon: <Alergias />,
    subtitle: 'Alergias',
    question: '¿Tienes alergias?',
    placeholderNumber: 'Número de alergias',
    placeholderAnswer: 'Tipos de alergias',
    placeholderDate: 'Año de diagnostico',
  },
  {
    id: 5,
    icon: <Silla />,
    subtitle: 'Discapacidades',
    question: '¿Tienes discapacidades?',
    placeholderNumber: 'Número de discapacidades',
    placeholderAnswer: 'Discapacidad',
    placeholderDate: 'Año de diagnostico',
  },
  {
    id: 6,
    icon: <Protesis />,
    subtitle: 'Otras características',
    question: '¿Tienes implantes, protesis, marcapasos, etc?',
    placeholderNumber: 'Caracteristicas',
    placeholderAnswer: 'Tipo de característica',
    placeholderDate: 'Año de implementacion',
  },
  {
      id: 7,
      icon: <IconDonador />,
      subtitle: 'Transplante de órganos',
      question: '¿Alguna ves has tenido transplantes?',
      placeholderNumber: 'Número de transplantes',
      placeholderAnswer: 'Tipo de transplante',
      placeholderDate: 'Fecha de transplante',
  },
];

const relativeRecords = [
  {
    id: 1,
    iconFirst: <Madre />,
    iconSecond: <Padre />,
    subtitle: 'Enfermedades de los padres',
  },
  // {
  //   id: 1,
  //   iconFirst: <Abuela />,
  //   iconSecond: <Abuelo />,
  //   subtitle: 'Enfermedades de los abuelos paternos',
  // },
  // {
  //   id: 1,
  //   iconFirst: <Abuela />,
  //   iconSecond: <Abuelo />,
  //   subtitle: 'Enfermedades de los abuelos maternos',
  // },
  
];

export { records, relativeRecords };
