import {
  Alergias,
  Bisturi,
  Fractura,
  Protesis,
  Silla,
  UnidadSangre,
  Virus,
  IconDonador,
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
    objectKey: "covid"
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
    objectKey: "cirujias"
  },
  {
    id: 3,
    icon: <Fractura />,
    subtitle: 'Fracturas',
    question: '¿Alguna ves has tenido fracturas?',
    placeholderNumber: 'Número de fracturas',
    placeholderAnswer: 'Fractura',
    placeholderDate: 'Año aproximado',
    objectKey: "fracturas"
  },
  {
    id: 4,
    icon: <UnidadSangre />,
    subtitle: 'Transfusiones',
    question: '¿Alguna ves has tenido transfuciones de sangre?',
    placeholderNumber: 'Número de fracturas',
    placeholderAnswer: 'Fractura',
    placeholderDate: 'Año aproximado',
    objectKey:"sangre"
  },
  {
    id: 4,
    icon: <Alergias />,
    subtitle: 'Alergias',
    question: '¿Tienes alergias?',
    placeholderNumber: 'Número de alergias',
    placeholderAnswer: 'Tipos de alergias',
    placeholderDate: 'Año de diagnostico',
    objectKey:"elergias"
  },
  {
    id: 5,
    icon: <Silla />,
    subtitle: 'Discapacidades',
    question: '¿Tienes discapacidades?',
    placeholderNumber: 'Número de discapacidades',
    placeholderAnswer: 'Discapacidad',
    placeholderDate: 'Año de diagnostico',
    objectKey: "discapacidades"
  },
  {
    id: 6,
    icon: <Protesis />,
    subtitle: 'Otras características',
    question: '¿Tienes implantes, protesis, marcapasos, etc?',
    placeholderNumber: 'Caracteristicas',
    placeholderAnswer: 'Tipo de característica',
    placeholderDate: 'Año de implementacion',
    objectKey: "other"
  },
  // {
  //     icon: <IconDonador />,
  //     subtitle: 'Transplante de órganos',
  //     question: '¿Alguna ves has tenido transplantes?'
  // },
];

export { records };
