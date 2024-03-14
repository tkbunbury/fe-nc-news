import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav/Nav'
import Homepage from './components/Homepage/Homepage'
import Articles from './components/Articles/Articles'
import ArticleDetail from './components/ArticleDetail/ArticleDetail';
import Topics from './components/Topics/Topics'
import ArticlesByTopic from './components/ArticlesByTopic/ArticlesByTopic'




function App() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  return (
    <BrowserRouter>
    <>
      <Nav/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/topics' element={<Topics isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
        <Route path='/articles' element={<Articles articles={articles} setArticles={setArticles} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
        <Route path={`/articles/:topic`} element={<ArticlesByTopic isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
        <Route path="/article/:id" element={<ArticleDetail articles={articles} isLoading={isLoading} setIsLoading={setIsLoading}/>}/> 
        
      </Routes>
    </>
  </BrowserRouter>
  )
}

export default App
