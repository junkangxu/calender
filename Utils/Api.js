import axios from 'axios';
import rootUrl from './Constants';
axios.defaults.baseURL = rootUrl;

const app = "Calendar";

export function getLogin(username, password) {
  let params = {
    params: {
      username: username,
      password: password
    }
  }
  return axios.get('/authentication/login', params);
}

export function getRegister(username, password, name) {
  let params = {
    params: {
      name: name,
      username: username,
      password: password
    }
  }
  return axios.get('/authentication/register', params);
}

export function getInbox(username) {
  return axios.get('/inbox/' + username);
}

export function getContacts(username) {
  return axios.get('/contacts/' + username);
}

export function addContact(username, contact) {
  return axios.post('/contacts/' + username + '/' + contact);
}

export function getProfile(username) {
  return axios.get('/profile/' + username);
}

export function createTask(username, receiver, params) {
  return axios.post('/inbox/' + username + '/' + receiver + '?task=' + params);
}

export function getCalendar(username) {
  return axios.get('/calendar/' + username);
}

export function acceptTask(username, params) {
  return axios.post('/calendar/' + username + '?task=' + params);
}

export default app;
