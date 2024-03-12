import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    return (
        <Link to={`/articles/${article.article_id}`} className="article-link">
            <div className="article-card">
                <div className="article-details">
                    <div className="author">{article.author}</div>
                    <div className="date">{article.formattedData}</div>
                </div>
                <h2 className="title">{article.title}</h2>
                <img className="image" src={article.article_img_url} alt={article.title} />
                <div className="article-meta">
                    <div className="votes">{article.votes} votes</div>
                    <div className="comments">{article.comment_count} comments</div>
                </div>
            </div>
        </Link>
    );
}

export default ArticleCard;