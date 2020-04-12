import axios from 'axios';

// TODO to env file
const apiUrl = 'https://www.boredapi.com/api/activity';

export default axios.create({
  baseURL: apiUrl
});
