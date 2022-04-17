import axios from 'axios';

const getToken = () => {
  return "dummy-token";
}

export const serviceWithToken = (token = getToken()) => axios.create({
  baseURL:  "https://randomuser.me/api",
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": `application/json`
  }
});

export const serviceWithoutToken = () => axios.create({
  baseURL:  "https://randomuser.me/api",
  timeout: 60 * 4 * 1000,
  headers: {
    "Content-Type": `application/json`,
  }
});