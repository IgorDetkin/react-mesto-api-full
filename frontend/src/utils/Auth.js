
export const baseUrl = 'https://api.mesto.learnproject.nomoredomains.icu';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({email, password}) => {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then((res) => checkResponse(res));
  };


export const authorize = ({email, password}) => {
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password
         })
    })
    .then((res) => checkResponse(res));
  };



  export function getInfo () {
    const token = localStorage.getItem('jwt');
        return fetch(`${baseUrl}/users/me`, {
          method: 'GET',
          headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
        .then((res) => checkResponse(res));
  }
