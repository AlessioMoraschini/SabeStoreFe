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
  return response;
};

export const verifyMail = async (mail) => {
    const response = await axios.get(`${SABE_STORE_ROOT_URL}/user/resendVerificationMail`, {
    params: {
        mail: mail
    },
    headers: {
        'Content-Type': 'application/json'
    }
  });
  return response.status;
};

// TODO define and link to user creation endpoint with all the fields
export const createUser = async (name, surname, mail, password) => {
    const response = await axios.post(`${SABE_STORE_ROOT_URL}/user/createUser`, {
        mail: mail,
        password: password,
        name: name,
        surname: surname
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
  return response;
};
