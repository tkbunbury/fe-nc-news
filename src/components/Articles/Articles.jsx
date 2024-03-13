import './Articles.css'
import { useEffect } from 'react'
import moment from 'moment';
import { getArticles } from '../../utils/api'
import ArticleCard from './ArticleCard/ArticleCard';



const Articles = ({articles, setArticles, isLoading, setIsLoading}) => {

    useEffect(() => {
        setIsLoading(true);
        getArticles()
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
                <ArticleCard key={index} article={article} />
            ))
        )}
    </div>
);
}

export default Articles;