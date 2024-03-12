import './ArticleDetail.css'

import { useState, useEffect } from 'react'
import React from 'react';
import moment from 'moment';
import { getArticleDetail } from '../../utils/api'
import { useParams } from 'react-router-dom'

const ArticleDetail = ({ articles, isLoading, setIsLoading }) => {
    const [articleDetail, setArticleDetail] = useState({})
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
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [setIsLoading, setArticleDetail])

    return (
        <div className="article-detail">
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
                <div className="votes">{articleDetail.votes} votes</div>
                <div className="comments">{articleDetail.comment_count} comments</div>
            </div>
        </div>
    );
}

export default ArticleDetail;