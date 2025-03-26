import axios from 'axios';

let baseURL 
if (import.meta.env.MODE === 'development') {
  baseURL = 'http://localhost:3001';
} else {
  baseURL = import.meta.env.VITE_API_BASE_URL;
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // Skip token refresh for login or refresh endpoints
    if (
      originalRequest.url.includes('/api/user/login') ||
      originalRequest.url.includes('/api/user/refreshtoken')
    ) {
      return Promise.reject(error);
    }
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        // Attempt to refresh tokens
        await axiosInstance.post('/api/user/refreshtoken');
        isRefreshing = false;
        processQueue(null, null);
        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);
        // Redirect to login on refresh failure
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
export default axiosInstance; 