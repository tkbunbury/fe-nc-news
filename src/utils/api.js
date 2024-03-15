import axios from 'axios';
const baseUrl = 'https://takai-nc-news.onrender.com/api/';

export const getArticles = ({ sortBy, sortOrder }) => {
   const params = {
      sort_by: sortBy,
      order: sortOrder,
   };

   return axios.get(`${baseUrl}articles`, { params })
      .then(response => response)
      .catch(error => {
         throw error;
      });
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

export const getArticlesByTopic = (topic, { sortBy, sortOrder }) => {
   let url = `${baseUrl}articles?topic=${topic}`;
   if (sortBy && sortOrder) {
      url += `&sort_by=${sortBy}&order=${sortOrder}`;
   }

   return axios.get(url)
   .then(response => response)
   .catch(error => {
      throw error;
   });
}

export const getUsers = () => {
   return axios.get(`${baseUrl}users`)
   .then(response => {
      return response
   })
}

