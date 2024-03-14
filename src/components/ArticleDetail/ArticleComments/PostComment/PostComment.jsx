import './PostComment.css';
import React, { useEffect, useState } from 'react';
import { postNewComment, getUsers } from '../../../../utils/api'; 

const PostComment = ({ articleId, addComment, users, setUsers }) => {
    const [selectedUser, setSelectedUser] = useState('');
    const [comment, setComment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getUsers()
        .then(response => {
            const parsedData = response.data.users
            setUsers(parsedData);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        })

    }, [setUsers])

    const handlePostComment = async (event) => {
        event.preventDefault();

        if (!selectedUser || !comment.trim()) {
            setErrorMessage('Please select a user and fill in the comment field.');
            return;
        }
        
        try {
            const newComment = await postNewComment(articleId, selectedUser, comment);
            addComment(newComment); 
            setSelectedUser('');
            setComment(''); 
            setErrorMessage(''); 
        } catch (error) {
            console.error('Error posting comment:', error);
            setErrorMessage('Error posting comment. Please try again.');
        }
    };

    return (
        <div className="post-comment-container">
            <select
                value={selectedUser}
                onChange={(event) => setSelectedUser(event.target.value)}
                className="post-comment-dropdown"
            >
                <option value="">Select user...</option>
                {users.map(user => (
                    <option key={user.username} value={user.username}>{user.username}</option>
                ))}
            </select>
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