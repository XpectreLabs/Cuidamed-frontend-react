import React, { useState,useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Grid, Input, Button, Modal } from "semantic-ui-react";
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
const [agree, setAgree] = useState(false);
const [open,setOpen] = useState(false);
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
    if(name.length >0 && emergencyContact.length >0 && typeBlood.length >0 && disease.length >0 && agree){
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

      if(response.status === 401 || response.status === 403){
        Swal.fire({
          icon: 'error',
          title:'Error en la petición',
          text: 'Necesita iniciar sesión para comprar la pulsera',
        }).then((result) => {
          if (result.isConfirmed) history.replace('/login');
        });
      }else if( response.status !== 200 ){
        let resp = await response.json();
        Swal.fire({
          icon: 'error',
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
    }else {
      Swal.fire({
        icon: 'error',
        title:'Error',
        text: 'Rellene los campos y acepte los terminos y condiciones'
      })
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
            <input
              className="checkboxCustom"
              type="checkbox"
              onChange={(e) => {
                setAgree(!agree);
              }}
            />
            <span>Aceptar <a href="#" onClick={() => setOpen(true)}>terminos y condiciones.</a></span>
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
      <Modal open={open} onClose={() => setOpen(false)}>
      <Modal.Content>
        <h1 style={{ textAlign: 'center' }} >
          Terminos y condiciones
        </h1>
        <div className="conditions_container">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, mi vitae finibus rutrum, odio neque maximus lacus, eu euismod ex lorem et est. Pellentesque vulputate sapien dui, at maximus turpis mollis a. Integer tempor blandit orci eget accumsan. Nulla facilisi. Nunc sit amet erat lacus. Vestibulum efficitur lectus quis leo blandit pulvinar. Suspendisse auctor nisi est, porttitor cursus dui dapibus quis. Fusce laoreet pellentesque sem. Curabitur et fermentum tortor.
            Vivamus eros nisi, malesuada rutrum faucibus vel, suscipit eu mauris. Curabitur gravida lorem ac justo interdum, vitae accumsan ipsum tempus. Sed sit amet consectetur dui. Donec sit amet enim sed dui malesuada fermentum sed iaculis nisl. Fusce gravida tincidunt lacus, pulvinar tincidunt orci venenatis eget. Etiam dictum volutpat urna, sit amet volutpat sapien mollis a. Nam sit amet enim euismod tellus condimentum lacinia vitae vel tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque nec egestas elit. Etiam fringilla auctor leo, et vehicula risus sagittis placerat. Sed et felis pellentesque, sodales tortor sit amet, eleifend massa. Phasellus maximus elit ac dictum maximus. Proin pulvinar luctus mollis. Cras posuere, nisl sit amet interdum molestie, nulla mauris molestie orci, in tincidunt metus metus vitae erat.
            In ullamcorper quam eu diam lacinia ultrices id vitae dolor. Cras id velit ut diam consequat facilisis in vel ligula. In dignissim lacus ut neque vestibulum, ac scelerisque libero venenatis. Quisque dui tortor, luctus eu sodales vel, mattis non nisl. Ut nisl nibh, consequat ut tincidunt ultrices, viverra et nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam odio lectus, hendrerit a tellus at, fringilla sagittis mi. Proin tincidunt nisl at ex convallis, at condimentum magna accumsan. Donec commodo quam sit amet tempus cursus.
          </p>
        </div>
      </Modal.Content>
    </Modal>
    </Grid>
  );
}
