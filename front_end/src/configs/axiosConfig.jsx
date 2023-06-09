import axios from "axios"
import NProgress from "nprogress"

const instance = axios.create({
    baseURL: 'http://localhost:9876/api',
})
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
})

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    NProgress.start();
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();
    return response && response.data ? response.data : response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    NProgress.done();
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});
export default instance;