import { CONECTION } from '../conection';

const customFetch = async (pUrl,pMethod='GET',body={},isLogged=false) => {
    try{
        let request = await fetch(`${CONECTION}${pUrl}`, {
            method: pMethod,
            body: JSON.stringify(body),
            headers: isLogged ? 
            {
              'Content-type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('refreshToken'),
            } : 
            {
                'Content-type': 'application/json'
            },
        });
        if(request.status === 200) return await request.json();
        else return {type: 'Error', code:request.status }
    }catch(e){
        return {type: 'Error', code: 500 };
    }
}

export default customFetch;