import axios from 'axios';
import { toast } from 'react-toastify';

const BASEURL = '/api';

const api = async (config, token) => {
  try {
    const res = await axios({ ...config, baseURL: BASEURL, headers: { authorization: token } });
    return { data: res.data, error: null };
  } catch (err) {
    const error = err?.response?.data?.message ? err.response.data.message : 'Something went wrong';
    toast.error(error, {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
    });
    return {
      data: null,
      error,
    };
  }
};

export default api;
