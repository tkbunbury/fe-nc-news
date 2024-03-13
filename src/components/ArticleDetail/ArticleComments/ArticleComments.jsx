import './ArticleComments.css'; 
import { useState, useEffect } from 'react'
import React from 'react';
import moment from 'moment';
import { getArticleComments } from '../../../utils/api';
import { useParams } from 'react-router-dom';
import PostComment from './PostComment/PostComment';
import CommentCard from './CommentCard/CommentCard';



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

    const addComment = (newComment) => {
        setArticleComments([newComment, ...articleComments]);
    };


    return (
        <div className="article-comments">
            <h2>Comments</h2>
            <PostComment articleId={id} addComment={addComment} />
            {commentsLoading ? (
                <p>Loading comments...</p>
            ) : (
            articleComments.map((comment, index) => (
                <CommentCard key={index} comment={comment} />
                ))
            )}
        </div>
    );
}

export default ArticleComments;