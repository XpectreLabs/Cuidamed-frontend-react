import React, { useEffect, useState } from "react";
import { map } from 'lodash';
import { Link } from 'react-router-dom';

import { ReactComponent as IconIndInfBasic } from '../../../images/icons/IndInfBasica.svg';
import { ReactComponent as IconIndMedHistorial } from '../../../images/icons/IndMedHistorial.svg';
import { ReactComponent as IconIndTratamiento } from '../../../images/icons/IndTratamiento.svg';
import { ReactComponent as IconIndContacto } from '../../../images/icons/IndContacto.svg';
import { ReactComponent as IconIndContactoMedico } from '../../../images/icons/IndContactoMedico.svg';
import { ReactComponent as IconIndSeguroMedico } from '../../../images/icons/IndSeguroMedico.svg';
import { ReactComponent as IconIndGinecologia } from '../../../images/icons/IndGinecologia.svg';


// import { Container, Grid } from "semantic-ui-react";
// import NavBarSecondary from "../../components/NavBarSecondary";
// import { LogoutIcon } from "../../images/icons/icons";
// //css
// // import "../../sass/index.scss";

import profileImg from "../../../images/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setImage, uploadImage } from "../../../redux/actions/UserAction";
import { CONECTION } from "../../../conection";
import { logout } from "../../../redux/actions/LoginAction";

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
    link4: '/dashboard/antecedentes'
  },
  {
    icon: <IconIndGinecologia></IconIndGinecologia>,
    link: '/dashboard/ginecologia',
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

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (state.login.user.img !== "" && state.user.imgProfile === null) {
      console.log(state.login.user.img);
      fetch(`${CONECTION}api/file/${state.login.user.img}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          return response.blob();
        })
        .then((images) => {
          let reader = new FileReader();
          reader.readAsDataURL(images);
          reader.onloadend = function () {
            var base64data = reader.result;
            console.log(base64data);
            dispatch(setImage(base64data));
          };
        });
    }
  }, []);

  const handleImage = (e) => {
    dispatch(uploadImage(e.target.files[0]));
  };

  const [isPhoneScreen, SetIsPhoneScreen] = useState(true);

  useEffect(() => {
    if (window.screen.width < 541) {
      console.log(window.screen.width);
      SetIsPhoneScreen(false);
    }
  }, [])

  const { sex } = JSON.parse(localStorage.getItem('user'));
  console.log(sex)
  return (
    <>
      {isPhoneScreen && (<label htmlFor="file_upload" className="btn-img">
        <img
          src={
            state.user.imgProfile !== null
              ? state.user.imgProfile
              : profileImg
          }
          alt="profile photo"
        />
      </label>)}
      {map(dataIcons, (icon, index) => {
        // if( icon.link === '/dashboard/ginecologia'){
        //   if(sex !== 'F'){

        //   }
        // }
        if (
          window.location.pathname === icon.link ||
          window.location.pathname === icon.link2 ||
          window.location.pathname === icon.link3 ||
          window.location.pathname === icon.link4
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
      {isPhoneScreen && (<button
        className="btn-img"
        onClick={() => {
          dispatch(logout());
        }}
      >
        <i className="fas fa-sign-out-alt"></i>
      </button>)}
    </>
  );
}
