import React from 'react';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { ReactComponent as IconIndInfBasic } from '../../../images/icons/IndInfBasica.svg';
import { ReactComponent as IconIndMedHistorial } from '../../../images/icons/IndMedHistorial.svg';
import { ReactComponent as IconIndTratamiento } from '../../../images/icons/IndTratamiento.svg';
import { ReactComponent as IconIndContacto } from '../../../images/icons/IndContacto.svg';
import { ReactComponent as IconIndContactoMedico } from '../../../images/icons/IndContactoMedico.svg';
import { ReactComponent as IconIndSeguroMedico } from '../../../images/icons/IndSeguroMedico.svg';

const dataIcons = [
  {
    icon: <IconIndInfBasic></IconIndInfBasic>,
    link: '/dashboard/info-basic',
  },
  {
    icon: <IconIndMedHistorial></IconIndMedHistorial>,
    link: '/dashboard/enfermedades-comunes',
    link2: '/dashboard/sistemas',
    link3: '/dashboard/lista-enfermedades',
  },
  {
    icon: <IconIndTratamiento></IconIndTratamiento>,
    link: '/dashboard/tratamiento',
  },
  {
    icon: <IconIndContacto></IconIndContacto>,
    link: '/dashboard/contacto',
  },
  {
    icon: <IconIndContactoMedico></IconIndContactoMedico>,
    link: '/dashboard/contacto-medico',
  },
  {
    icon: <IconIndSeguroMedico></IconIndSeguroMedico>,
    link: '/dashboard/seguro-medico',
  },
];

export default function IconsNavBar() {
  return (
    <>
      {map(dataIcons, (icon, index) => {
        if (
          window.location.pathname === icon.link ||
          window.location.pathname === icon.link2 ||
          window.location.pathname === icon.link3
        ) {
          return (
            <Link
              key={index}
              to={icon.link}
              className="icon-container icon-selected">
              {icon.icon}
            </Link>
          );
        }
        return (
          <Link key={index} to={icon.link} className="icon-container">
            {icon.icon}
          </Link>
        );
      })}
    </>
  );
}
