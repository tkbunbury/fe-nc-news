import './Articles.css'
import { useEffect, useState } from 'react'
import baseUrl from '../../utils/baseUrl'
import { Link } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';



const Articles = ({articles, setArticles, isLoading, setIsLoading}) => {

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${baseUrl}articles`)
        .then(response => {
            const parsedData = response.data.articles.map(article => ({
                ...article,
                formattedData: moment(article.created_at).format('MMM DD, YYYY')
            }));
            setArticles(parsedData)
        })
        .catch(error => {
            console.error('Error fetching articles:', error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [setIsLoading, setArticles])

    return (
    <div className='articles-container'>
        <h1 className='page-title'>Articles</h1>
        {isLoading ? (
            <p>Loading...</p> 
        ) : (
            articles.map((article, index) => (
                <div key={index} className="article-card">
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
            ))
        )}
    </div>
);
}

export default Articles;