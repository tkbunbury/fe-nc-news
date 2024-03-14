import './ArticlesByTopic.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment';
import { getArticlesByTopic } from '../../utils/api';
import ArticleCard from '../Articles/ArticleCard/ArticleCard';



const ArticlesByTopic = ({ isLoading, setIsLoading }) => {
    const [topic, setTopic] = useState([])
    const params = useParams()
    const topicName = params.topic

    useEffect(() => {
        setIsLoading(true);
        getArticlesByTopic(topicName)
        .then(response => {
            const parsedData = response.data.articles.map(article => ({
                ...article,
                formattedData: moment(article.created_at).format('MMM DD, YYYY')
            }));
            setTopic(parsedData)
        })
        .catch(error => {
            console.error('Error fetching articles:', error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [setIsLoading, setTopic])

    return (
    <div className='articles-container'>
        <h1 className='page-title'>{`${topicName} Articles`}</h1>
        {isLoading ? (
            <p>Loading...</p> 
        ) : (
            topic.map((article, index) => (
                <ArticleCard key={index} article={article} />
            ))
        )}
    </div>

    )
}

export default ArticlesByTopic;