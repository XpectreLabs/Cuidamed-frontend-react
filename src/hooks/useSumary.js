import { useState, useEffect } from 'react';
import {CONECTION} from '../conection';
export const useSumary = () => {
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: {}
    });

    useEffect(() => {
        fetch(`${CONECTION}api/sumary`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'x-auth-token': localStorage.getItem('refreshToken'),
            }
        }).then(resp => resp.json()).then((json) => {
            let { data } = json;
            setState({...state, loading: false, data});
        }).catch(e => setState({...state,loading: false, error: 'Error al cargar los datos'})) 
    },[])

    return state;
}
