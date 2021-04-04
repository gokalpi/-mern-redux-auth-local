import http from '../../helpers/axios';

async function createUser(email, password, name, role, avatar) {
  const response = await http.post('/users', { email, password, name, role, avatar });
  return response.data;
}

async function deleteUser(id) {
  const response = await http.delete(`/users/${id}`);
  return response.data;
}

async function getUser(id) {
  const response = await http.get(`/users/${id}`);
  return response.data;
}

async function getAllUsers() {
  const response = await http.get('/users');
  return response.data;
}

async function updateUser(id, email, password, name, role, avatar) {
  const response = await http.put(`/users/${id}`, { email, password, name, role, avatar });
  return response.data;
}

export { createUser, deleteUser, getUser, getAllUsers, updateUser };
