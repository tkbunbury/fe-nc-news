import React from 'react';

const CommentCard = ({ comment }) => {
    return (
    <div  className="comment">
        <div className="comment-header">
            <span className="comment-author">{comment.author}</span>
            <span className="comment-date">{comment.formattedData}</span>
        </div>
        <p className="comment-body">{comment.body}</p>
        <div className="comment-meta">
            <span className="comment-votes">{comment.votes} votes</span>
        </div>
    </div>
    );
}

export default CommentCard;