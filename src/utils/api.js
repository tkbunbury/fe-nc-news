import axios from 'axios';
const baseUrl = 'https://takai-nc-news.onrender.com/api/';

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

export const getArticleComments = (id) => {
   return axios.get(`${baseUrl}articles/${id}/comments`)
   .then(response => {
      return response
   })
   
}

export const updateArticleVotes = (id, voteChange) => {
   const data = { inc_votes: voteChange }; 

   return axios.patch(`${baseUrl}articles/${id}`, data)
   .then(response => {
      return response.data.updatedArticle.votes; 
   })
   .catch(error => {
      throw error; 
   });
};


