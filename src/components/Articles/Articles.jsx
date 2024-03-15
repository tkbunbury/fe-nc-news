import './Articles.css'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { getArticles } from '../../utils/api'
import ArticleCard from './ArticleCard/ArticleCard';
import SortDropdown from '../SortDropdown/SortDropdown';



const Articles = ({articles, setArticles, isLoading, setIsLoading}) => {
    const [sortBy, setSortBy] = useState('created_at');
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        setIsLoading(true);
        getArticles({ sortBy, sortOrder })
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
    }, [sortBy, sortOrder, setIsLoading, setArticles])

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
    <div className="articles-container">
        <h1 className="page-title">Articles</h1>
        <SortDropdown sortBy={sortBy} sortOrder={sortOrder} handleSortChange={handleSortChange} />
        {isLoading ? (
        <p>Loading...</p>
        ) : (
            articles.map((article, index) => <ArticleCard key={index} article={article} />)
        )}
    </div>
    );
};

export default Articles;