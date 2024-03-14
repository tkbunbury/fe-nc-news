import React from 'react';
import { useState } from 'react'
import './CommentCard.css';
import DeleteComment from './DeleteComment/DeleteComment';

const CommentCard = ({ comment, selectedUser }) => {
    const [ showComment, setShowComment ] = useState(true);

    const handleDelete = (comment_id) => {
        setShowComment(false); 
    };


    return (
        <div className={`comment ${showComment ? '' : 'hidden'}`}>
            <div className="comment-header">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-date">{comment.formattedData}</span>
            </div>
            <p className="comment-body">{comment.body}</p>
            <div className="comment-meta">
                <span className="comment-votes">{comment.votes} votes</span>
                {selectedUser === comment.author ? (
                    <DeleteComment
                        comment_id={comment.comment_id}
                        article_id={comment.article_id}
                        onDelete={handleDelete}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default CommentCard;