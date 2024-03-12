import './ArticleComments.css'; 
import { useState, useEffect } from 'react'
import React from 'react';
import moment from 'moment';
import { getArticleComments } from '../../../utils/api';
import { useParams } from 'react-router-dom';



const ArticleComments = () => {

    const [articleComments, setArticleComments] = useState([])
    const [commentsLoading, setCommentsLoading] = useState(false);

    const { id } = useParams()

    useEffect(() => {
        setCommentsLoading(true);
        getArticleComments(id)
        .then(response => {
            const parsedData = response.data.map(comment => ({
                ...comment,
                formattedData: moment(comment.created_at).format('MMM DD, YYYY')
            }));
            setArticleComments(parsedData)
        })
        .catch(error => {
            console.error('Error fetching article comments:', error);
        })
        .finally(() => {
            setCommentsLoading(false);
        });
    }, [setCommentsLoading, setArticleComments])

    return (
        <div className="article-comments">
            <h2>Comments</h2>
            {commentsLoading ? (
                <p>Loading comments...</p>
            ) : (
            articleComments.map((comment, index) => (
                <div key={index} className="comment">
                    <div className="comment-header">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-date">{comment.formattedData}</span>
                    </div>
                    <p className="comment-body">{comment.body}</p>
                    <div className="comment-meta">
                        <span className="comment-votes">{comment.votes} votes</span>
                    </div>
                </div>
                ))
            )}
        </div>
    );
}

export default ArticleComments;