import axios from 'axios';

// TODO to env file
const apiUrl = 'http://www.boredapi.com/api/activity';

export default axios.create({
  baseURL: apiUrl
});
