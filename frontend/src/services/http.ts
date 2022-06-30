import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:3000/";

const instance = axios.create({
  baseURL: BASE_URL,
});

/**
 * Request interceptor which appends the JWT access token to all backend requests.
 *
 * @returns the request
 */
instance.interceptors.request.use(async (request) => {
  if (request.url !== "open") {
    const token = `Bearer ${await Cookies.get("token")}`;
    if (request && request.headers) {
      request.headers.Authorization = token;
    }
  }
  return request;
});

/**
 * Response interceptor to validate different http status.
 *
 * @remarks
 * If an error occurs from the backend, the user is redirected, or it is displayed as a notification.
 *
 * @returns rejected error
 */
instance.interceptors.response.use(
  (response) => response,
  () => {
    alert("An error occurred. Please try again later.");
    /*    if (error.response.status === 403) router.push('/forbidden');
    if (error.response.status === 404) router.push('/not-found');*/
  }
);

export default instance;
