import axios from 'axios';

axios.defaults.baseURL = 'https://nomad-narratives-05968209a16d.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true