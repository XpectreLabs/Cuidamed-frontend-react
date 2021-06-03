import customFetch from '../../utils/customFetch';
import Swal from 'sweetalert2';

const login = async (email,password) => {
    let resp = await customFetch(
                                    'api/login',
                                    'POST',
                                    {email, password}
    );
    if (resp.err) Swal.fire('Error', resp.err.message, 'error');
    else {
        if (resp.token) {
            localStorage.setItem('token', resp.token);
            localStorage.setItem('refreshToken', resp.refreshToken);
            localStorage.setItem('user', JSON.stringify(resp.data));
            return {success: true, data: resp};
        } else {
            Swal.fire('Error', 'Usuario o contraseña incorrecta', 'error');
            return {success: false, data: null};
        }
    }
}

export { login }