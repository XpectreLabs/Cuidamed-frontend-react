import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {CONECTION} from '../conection';
import { types } from '../redux/types';
export const useSumary = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: {}
    });

    useEffect(() => {
        dispatch({type:types.loading});
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
            dispatch({type:types.loaded});
        }).catch(e => setState({...state,loading: false, error: 'Error al cargar los datos'})) 
    },[])

    return state;
}
