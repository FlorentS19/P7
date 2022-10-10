import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000/" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
});

export const readPost = () => API.get('/post');
export const createPost = (newPost) => API.post('/post', newPost);
export const likePost = (id , user) => API.patch(`/post/likePost/${id}`, user );
export const modifyPost = (id, modifyPost) => API.put(`/post/${id}`, modifyPost);
export const deletePost = (id) => API.delete(`/post/${id}`);

export const signup = (formData) => API.post('api/auth/signup', formData);
export const login = (formData) => API.post('api/auth/login', formData);
console.log(login)