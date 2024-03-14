import axios from 'axios';
const baseUrl = 'https://takai-nc-news.onrender.com/api/';

export const getArticles = () => {
   return axios.get(`${baseUrl}articles`)
   .then(response => {
      return response
   })
}

export const getArticleDetail = (article_id) => {
   return axios.get(`${baseUrl}articles/${article_id}`)
   .then(response => {
      return response
   })
}

export const getArticleComments = (article_id) => {
   return axios.get(`${baseUrl}articles/${article_id}/comments`)
   .then(response => {
      return response
   })
}

export const updateArticleVotes = (article_id, voteChange) => {
   const data = { inc_votes: voteChange }; 

   return axios.patch(`${baseUrl}articles/${article_id}`, data)
   .then(response => {
      return response.data.updatedArticle.votes; 
   })
   .catch(error => {
      throw error; 
   });
};

export const postNewComment = (article_id, username, comment) => {
   const data = {
      username: username,
      body: comment,
   };

   return axios.post(`${baseUrl}articles/${article_id}/comments`, data)
   .then(response => {
      return response.data.comment; 
   })
   .catch(error => {
      throw error; 
   });
}

export const deleteComment = (comment_id) => {
   return axios.delete(`${baseUrl}comments/${comment_id}`)
   .then(response => {
      return response.data; 
   })
   .catch(error => {
      throw error; 
   });
};

export const getTopics = () => {
   return axios.get(`${baseUrl}topics`)
   .then(response => {
      return response
   })
}

export const getArticlesByTopic = (topic) => {
   return axios.get(`${baseUrl}articles?topic=${topic}`)
   .then(response => {
      return response
   })
}

