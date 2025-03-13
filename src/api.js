import axios from 'axios';

const SABE_STORE_ROOT_URL = process.env.REACT_APP_SABE_STORE_ROOT_URL;

console.log('SABE_STORE_ROOT_URL:', SABE_STORE_ROOT_URL);

export const login = async (username, password) => {
    const response = await axios.post(`${SABE_STORE_ROOT_URL}/login`, {
        username: username,
        password: password
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
  return response.headers['authorization'];
};
