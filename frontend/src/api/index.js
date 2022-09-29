import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000/" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
});

export const readPost = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id , user) => API.patch(`/posts/likePost/${id}`, user );
export const modifyPost = (id, modifyPost) => API.patch(`/posts/${id}`, modifyPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signup = (formData) => API.post('/user/signup', formData);
export const login = (formData) => API.post('/user/login', formData);
