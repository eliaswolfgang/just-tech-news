import axios from 'axios';

export const API = {
    // User routes
    getAllUsers: () => axios.get('api/users'),
    getUser: (userID) => axios.get(`/api/users/${userID}`),
    createUser: (userInfo) => axios.post('/api/users', userInfo),
    login: (userInfo) => axios.post('/api/users/login', userInfo),
    updateUser: (userID, updatedData) => axios.put(`/api/users/${userID}`, updatedData),
    deleteUser: (userID) => axios.delete(`/api/users/${userID}`),
    // Post routes
    getAllPosts: () => axios.get('/api/posts'),
    getPostByID: (postID) => axios.get(`/api/posts/${postID}`),
    createPost: (postData) => axios.post('/api/posts', postData),
    upvotePost: (upvoteData) => axios.put('/api/posts/upvote', upvoteData),
    updatePost: (updatedPost, postID) => axios.put(`/api/posts/${postID}`, updatedPost),
    deletePost: (postID) => axios.delete(`/api/posts/${postID}`),
    // Comment routes
    getAllComments: () => axios.get('/api/comments'),
    createComment: (commentData) => axios.post('/api/comments', commentData),
    deleteComment: (commentID) => axios.delete(`/api/comments/${commentID}`),
}

export default API;