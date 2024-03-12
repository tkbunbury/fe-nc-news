import './Vote.css'
import React, { useState } from 'react';
import { updateArticleVotes } from '../../../utils/api'; 


const Vote = ({ articleId, currentVotes }) => {
    const [votes, setVotes] = useState(currentVotes); 
    const [buttonClicked, setButtonClicked] = useState(false); 

    const updateVotes = async (voteChange) => {
        try {
            setButtonClicked(true)
            const updatedVotes = await updateArticleVotes(articleId, voteChange);
            setVotes(updatedVotes);
        } 
        catch (error) {
            console.error('Error voting:', error);
        } 
    };


    const handleUpvote = () => {
        if (!buttonClicked) {
            updateVotes(1);
        }
    };


    const handleDownvote = () => {
        if (!buttonClicked) {
        updateVotes(-1);
    }
    };

    return (
    <div className="vote-container">
        <button className="vote-button upvote-button" onClick={handleUpvote} disabled={buttonClicked}>Upvote</button>
        <span className="vote-count">{votes}</span>
        <button className="vote-button downvote-button" onClick={handleDownvote} disabled={buttonClicked}>Downvote</button>
    </div>
    );
};

export default Vote;