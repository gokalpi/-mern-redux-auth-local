import http from '../../helpers/axios';

async function loginUser(email, password) {
  const response = await http.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
}

async function logoutUser() {
  await http.get('/auth/logout');
  localStorage.removeItem('token');
}

async function registerUser(email, password, name, role, avatar) {
  const response = await http.post('/auth/register', { email, password, name, role, avatar });
  localStorage.setItem('token', response.data.token);
  return response.data;
}

export { loginUser, logoutUser, registerUser };
