import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://test-dynamicore-server-ayv6wxfld-yaki55s-projects.vercel.app/api',
  //baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  // Usuarios
  getUsers() {
    return apiClient.get('/users');
  },
  createUser(user) {
    return apiClient.post('/users/new', user);
  },
  updateUser(id, user) {
    return apiClient.put(`/users/${id}`, user);
  },
  deleteUser(id) {
    return apiClient.delete(`/users/${id}`);
  },
  // Contactos
  getContacts(userId) {
    return apiClient.get(`/contacts/user/${userId}`);
  },
  createContact(userId, contact) {
    return apiClient.post(`/contacts/user/${userId}`, contact);
  },
  updateContact(id, contact) {
    return apiClient.put(`/contacts/${id}`, contact);
  },
  deleteContact(id) {
    return apiClient.delete(`/contacts/${id}`);
  },
};
