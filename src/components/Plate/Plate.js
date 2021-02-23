import React, { useState,useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Grid, Input, Button } from "semantic-ui-react";
import Logo from "../../images/CuidaMEDLogo.png";
import { SelectCustom } from "../inputsCustom/Select/Select";
import bloodType from "./data";
import { CONECTION } from "../../conection";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { verifySell } from "./verifySell";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export default function Plate() {
 const history = useHistory();
 const [formValues, setFormValues] = useState({
  name: "",
  emergencyContact: "",
  typeBlood: "",
  disease: "",
});
const { name, emergencyContact, typeBlood, disease } = formValues;

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      verifySell(query.get("success")).then(e => {
        localStorage.removeItem('labelCuidaband');
        Swal.fire({
          icon: 'success',
          text: 'Su pulsera cuidamed sera enviada, cuando llegue el ingresela en la pantalla de landing presionando el boton "Ya tego cuidaband" con su sesión iniciada y se procedera a asociar este numero con su cuenta',
          title: 'Pago Realizado',
          confirmButtonText: 'Sí',
          cancelButtonText: 'Cancelar',
          willClose: () => history.replace('/landing')
        });
      }).catch(e => {
        console.log(e);
      })
    }else if (query.get("canceled")) {
      localStorage.removeItem('labelCuidaband');
      Swal.fire({
        icon: 'error',
        text: 'Pago cancelado'
      });
    }
  }, []);

  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch(`${CONECTION}api/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-auth-token": localStorage.getItem("refreshToken"),
      },
    });

    if(response.status === 401){
      Swal.fire({
        type: 'error',
        title:'Error en la petición',
        text: 'Necesita iniciar sesión para comprar la pulsera',
      }).then((result) => {
        if (result.isConfirmed) history.replace('/login');
      });
    }else if( response.status !== 200 ){
      let resp = await response.json();
      Swal.fire({
        type: 'error',
        title:'Error en la petición',
        text: resp.message,
      });
    }else{
      const session = await response.json();
      localStorage.setItem('labelCuidaband', `${name};${emergencyContact};${typeBlood};${disease}`);
      
      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      }
    }
    
  };


  return (
    <Grid className="plate">
      <Grid.Column computer={8} tablet={16} mobile={16} verticalAlign="middle">
        <Grid.Row className="bg-plate">
          <Grid.Column verticalAlign="middle">
            <Grid.Row>
              <p>{name}</p>
            </Grid.Row>
            <Grid.Row>
              <p>{emergencyContact}</p>
            </Grid.Row>
            <Grid.Row>
              <p>{typeBlood}</p>
            </Grid.Row>
            <Grid.Row>
              <p>{disease}</p>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column computer={8} tablet={16} mobile={16} verticalAlign="middle">
        <Grid.Row className="logo" style={{marginTop: 10}}>
          <img src={Logo} alt='Logo'/>
        </Grid.Row>
        <Grid.Row className="description">
          <p>Información que tendrá la placa.</p>
        </Grid.Row>
        <Grid.Row className="information">
          <label>¿Quién usuará la pulsera?</label>
          <br />
          <Input
            type="text"
            name="name"
            placeholder="Raúl Núñez / Raúl Núñez 1991"
            // setValue={(e) => setFormValues({ ...formValues, email: e })}
            //     value={email}
            onChange={(e) => {
              setFormValues({ ...formValues, name: e.currentTarget.value });
            }}
            value={name}
          />
          <span className={name.length > 25 ? "warning" : ""}>
            {name.length}/25
          </span>
        </Grid.Row>
        <Grid.Row className="information">
          <label>¿Quién será tu contacto de emergencia?</label>
          <br />
          <Input
            type="text"
            name="emergency-contact"
            placeholder="Eduardo +529932000000"
            onChange={(e) => {
              setFormValues({
                ...formValues,
                emergencyContact: e.currentTarget.value,
              });
            }}
            value={emergencyContact}
          />
          <span className={emergencyContact.length > 25 ? "warning" : ""}>
            {emergencyContact.length}/25
          </span>
        </Grid.Row>
        <Grid.Row className="information">
          <label>Tipo de sangre</label>
          <br />
          <SelectCustom
            placeholder=""
            dataOptions={bloodType}
            name="type-blood"
            setValue={(e) => {
              setFormValues({ ...formValues, typeBlood: e });
            }}
            value={typeBlood}
          />
        </Grid.Row>
        <Grid.Row className="information">
          <label>Padecimiento principal</label>
          <br />
          <Input
            type="text"
            placeholder="Hipertensión / Diabético / Alzheimer"
            name="disease"
            onChange={(e) => {
              setFormValues({ ...formValues, disease: e.currentTarget.value });
            }}
            value={disease}
          />
          <span className={disease.length > 25 ? "warning" : ""}>
            {disease.length}/25
          </span>
        </Grid.Row>
        <Grid.Row>
          <Button
            className="btn-main"
            id="checkout-button"
            role="link"
            onClick={handleClick}
          >
            Proceder al pago
          </Button>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}
