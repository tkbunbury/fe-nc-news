import { useState } from 'react'
import './DeleteComment.css'
import React from 'react';
import { deleteComment } from '../../../../../utils/api'; 

const DeleteComment = ({ comment_id, onDelete }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {

        setLoading(true);

    try {
        await deleteComment(comment_id);
        onDelete(comment_id)
    } 
    catch (error) {
        console.error('Error deleting comment:', error);
    }
    finally {
        setLoading(false); 
    }

};
return (
    <button onClick={handleDelete} disabled={loading} className={loading ? 'delete-button loading' : 'delete-button'}>
        {loading ? 'Deleting...' : 'Delete'}
    </button>
);
};

export default DeleteComment;