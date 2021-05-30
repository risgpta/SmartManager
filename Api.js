const API_URL = 'https://murmuring-castle-16656.herokuapp.com';
//const API_URL = 'https://risgpta.github.io/MERN';

const HEADER = {
  'Content-Type': 'application/json',
};

export const loginApi = payload => {
  let url = `${API_URL}/users/login/${payload.username}/${payload.password}`;
  console.log(url);
  return fetch(url, {
    headers: {
      ...HEADER,
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const signupApi = payload => {
  let url = `${API_URL}/users/create`;
  console.log(url);
  return fetch(url, {
    method: 'POST',
    headers: {
      ...HEADER,
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
};

export const getTasksApi = payload => {
  let url = `${API_URL}/tasks/get/${payload.userId}`;
  console.log(url);
  return fetch(url, {
    headers: {
      ...HEADER,
    },
  }).then(res => res.json());
};

export const checkUsernameApi = payload => {
  let url = `${API_URL}/users/check/${payload.username}`;
  console.log(url);
  return fetch(url, {
    headers: {
      ...HEADER,
    },
  }).then(res => res.json());
};

export const createTaskApi = payload => {
  let url = `${API_URL}/tasks/create`;
  console.log(url);
  return fetch(url, {
    method: 'POST',
    headers: {
      ...HEADER,
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
};

export const updateTaskApi = payload => {
  console.log(payload);
  let url = `${API_URL}/tasks/update/${payload.task_id}`;
  console.log(url);
  return fetch(url, {
    method: 'PUT',
    headers: {
      ...HEADER,
    },
    body: JSON.stringify(payload.actual_payload),
  })
    .then(res => res.json())
    .then(data => console.log('data=', data));
};

export const updateTaskApi2 = payload => {
  console.log(payload);
  let url = `${API_URL}/tasks/updateRemove/${payload.task_id}`;
  console.log(url);
  console.log('SHOOOOWW', payload.actual_payload.Tasks);
  return fetch(url, {
    method: 'PUT',
    headers: {
      ...HEADER,
    },
    body: JSON.stringify(payload.actual_payload),
  })
    .then(res => res.json())
    .then(data => console.log('data=', data))
    .catch(err => console.log(err));
};

export const updateTodo = ({id, fields}) => {
  const url = `${API_URL}/${BASE}/${TABLE}/${id}`;

  return fetch(url, {
    method: 'PATCH',
    headers: {
      ...AUTH_HEADER,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({fields}),
  });
};

export const deleteTodo = id => {
  const url = `${API_URL}/${BASE}/${TABLE}/${id}`;

  return fetch(url, {
    method: 'DELETE',
    headers: {
      ...AUTH_HEADER,
    },
  });
};
