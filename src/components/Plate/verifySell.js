
import { CONECTION } from "../../conection";
export const verifySell = async (successValue) => {
    try{
        let result = await fetch(`${CONECTION}api/checkout`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "x-auth-token": localStorage.getItem("refreshToken"),
            },
            body: JSON.stringify({ sesson: successValue, label:localStorage.getItem('labelCuidaband')})
        });
        if(result.status !== 200) throw new Error('No se pudo validar esta compra');
        let response = await result.json();
        return response;
    }catch(e){
        throw new Error(e);
    }
   
}