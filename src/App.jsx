import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav/Nav'
import Homepage from './components/Homepage/Homepage'
import Articles from './components/Articles/Articles'
import ArticleDetail from './components/ArticleDetail/ArticleDetail';




function App() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  return (
    <BrowserRouter>
    <>
      <Nav/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/articles' element={<Articles articles={articles} setArticles={setArticles} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
        <Route path="/articles/:id" element={<ArticleDetail articles={articles} isLoading={isLoading} setIsLoading={setIsLoading}/>}/> 
      </Routes>
    </>
  </BrowserRouter>
  )
}

export default App
