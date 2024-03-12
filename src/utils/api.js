import axios from 'axios';


const baseUrl = 'https://takai-nc-news.onrender.com/api/'

export const getArticles = () => {
   return axios.get(`${baseUrl}articles`)
   .then(response => {
    return response
   })
   
}

export const getArticleDetail = (id) => {
   return axios.get(`${baseUrl}articles/${id}`)
   .then(response => {
    return response
   })
   
}


