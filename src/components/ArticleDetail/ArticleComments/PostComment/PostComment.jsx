import './PostComment.css';
import React, { useState } from 'react';
import { postNewComment } from '../../../../utils/api'; 

const PostComment = ({ articleId, addComment }) => {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handlePostComment = async (event) => {
        event.preventDefault();

        if (!username.trim() || !comment.trim()) {
            setErrorMessage('Please fill in both fields.');
            return;
        }
        
        try {
            const newComment = await postNewComment(articleId, username, comment);
            addComment(newComment); 
            setUsername('');
            setComment(''); 
            setErrorMessage(''); 
        } catch (error) {
            console.error('Error posting comment:', error);
            setErrorMessage('Error posting comment. Please try again.');
        }
    };

    return (
        <div className="post-comment-container">
            <input
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="post-comment-input"
            />
            <textarea
                placeholder="Write your comment here..."
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className="post-comment-input"
            ></textarea>
            <button onClick={handlePostComment} className="post-comment-button">Post Comment</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default PostComment;