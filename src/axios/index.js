import axios from 'axios';
import {BASE_URL} from '../constans';

export const instance = axios.create({
  baseURL: BASE_URL,
});
