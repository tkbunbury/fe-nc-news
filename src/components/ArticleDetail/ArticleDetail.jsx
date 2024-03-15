import './ArticleDetail.css'
import { useState, useEffect } from 'react'
import React from 'react';
import moment from 'moment';
import { getArticleDetail } from '../../utils/api'
import { useParams } from 'react-router-dom'
import ArticleComments from './ArticleComments/ArticleComments';
import Vote from './Vote/Vote'; 

const ArticleDetail = ({ articles, isLoading, setIsLoading }) => {
    const [articleDetail, setArticleDetail] = useState({})
    const [error, setError] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        setIsLoading(true);
        getArticleDetail(id)
        .then(response => {
            const articleData = response.data.article;
            const formattedDate = moment(articleData.created_at).format('MMM DD, YYYY');
            setArticleDetail({ ...articleData, formattedDate });
        })
        .catch(error => {
            console.error('Error fetching article detail:', error);
            setError(true)
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [id, setIsLoading, setArticleDetail])

    if (error === true) {
        return (
            <div className="error-container">
            <p className="error-message">Oops! The article you are looking for does not exist.</p>
        </div>
        )
    }
    else {
        return (
        <div className="article-detail">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1 className="article-title">{articleDetail.title}</h1>
                    <div className="article-details">
                        <div className="author">{articleDetail.author}</div>
                        <div className="date">{articleDetail.formattedDate}</div>
                        <div className="topic">{articleDetail.topic}</div> 
                    </div>
                    <img className="image" src={articleDetail.article_img_url} alt={articleDetail.title} />
                    <div className="article-content">
                        <p>{articleDetail.body}</p> 
                    </div>
                    <div className="article-meta">
                        <Vote articleId={id} currentVotes={articleDetail.votes} />
                        <div className="comments">{articleDetail.comment_count} comments</div>
                    </div>
                    <ArticleComments/>
                </>
            )}
        </div>
    );
    }

    
}

export default ArticleDetail;