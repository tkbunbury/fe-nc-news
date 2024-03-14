import './Topics.css'
import { useEffect, useState } from 'react'
import { getTopics } from '../../utils/api';
import { Link } from 'react-router-dom';



const Topics = ({ isLoading, setIsLoading }) => {

    const [topics, setTopics] = useState([])

    useEffect(() => {
        setIsLoading(true)
        getTopics()
        .then(response => {
            const parsedData = response.data.topics
            setTopics(parsedData)
        })
        .catch(error => {
            console.error('Error fetching topics:', error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [setTopics, setIsLoading])
    
    return (
        <div className='topics-container'>
            <h1 className='page-title'>Topics</h1>
            {isLoading ? (
                <p>Loading...</p> 
                ) : (
                topics.map((topic, index) => (
                <Link
                key={index}
                to={`/articles/${topic.slug}`}>
                    <div className="topic-card">
                        <h2 className="title">{topic.slug}</h2>
                        <div className="topic-description">
                            <p>{topic.description}</p> 
                        </div>  
                    </div>  
                </Link> 
                ))   
            )}
        </div>
    );
}

export default Topics;