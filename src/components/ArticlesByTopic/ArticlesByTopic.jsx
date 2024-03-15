import './ArticlesByTopic.css'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import moment from 'moment';
import { getArticlesByTopic } from '../../utils/api';
import ArticleCard from '../Articles/ArticleCard/ArticleCard';
import SortDropdown from '../SortDropdown/SortDropdown';

const ArticlesByTopic = ({ isLoading, setIsLoading }) => {
    const [topic, setTopic] = useState([])
    const [sortBy, setSortBy] = useState('created_at');
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams()
    const topicName = params.topic

    useEffect(() => {
        setIsLoading(true);
        getArticlesByTopic( topicName, { sortBy, sortOrder })
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
    }, [setIsLoading, setTopic, sortBy, sortOrder])


    useEffect(() => {
        setSearchParams({ sort_by: sortBy, order: sortOrder });
    }, [sortBy, sortOrder, setSearchParams]);

    const handleSortChange = (event) => {
        const { name, value } = event.target;
        if (name === 'sortBy') {
            setSortBy(value);
        }
        else if (name === 'sortOrder') {
            setSortOrder(value);
        }
    };

    return (
    <div className='articles-container'>
        <h1 className='page-title'>{`${topicName} Articles`}</h1>
        <SortDropdown sortBy={sortBy} sortOrder={sortOrder} handleSortChange={handleSortChange} />
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