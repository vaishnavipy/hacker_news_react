
import './App.css';
import {Link,Switch,Route} from "react-router-dom"
import Content from "./content"
import { useContext, useEffect, useState } from 'react';
import CommentSection from "./commentSection";
import {FavoriteContext} from "./favoriteContext"


function App() {

  const {storyArr} = useContext(FavoriteContext)

  const [news,setNews] = useState([])
  const [popular,setPopular] = useState([])
  const [ask,setAsk] = useState([])
  const [show,setShow] = useState([])
  

  const links = [
    "https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=30",
   "https://hn.algolia.com/api/v1/search?&hitsPerPage=30",
   "http://hn.algolia.com/api/v1/search_by_date?tags=ask_hn&hitsPerPage=30&numericFilters=num_comments>3",
   "http://hn.algolia.com/api/v1/search_by_date?tags=show_hn&hitsPerPage=30&numericFilters=num_comments>3"
  ]
   

  
  const menuElements = document.querySelectorAll(".menu")

  useEffect(()=>{

    links.forEach((elm,i) => {
      fetch(elm)
      .then(response => response.json())
      .then(data => {

        if(i==0){
          setNews(data.hits)
        }else if(i == 1){
          setPopular(data.hits)
        }else if(i==2){
          setAsk(data.hits)
        }else{
          setShow(data.hits)
        } 


      })
     

    })

   

  },[])

  function loadMore(data,selectedMenu){
    if(selectedMenu === "latest"){
      setNews(data)
    }else if(selectedMenu === "popular"){
      setPopular(data)
    }else if(selectedMenu === "ask"){
      setAsk(data)
    }else if(selectedMenu === "show"){
      setShow(data)
    }
  }

  function handleClick(event){
    
    if(event.target.classList.contains("menu")){

      menuElements.forEach(elm => elm.classList.remove("active"))

      event.target.classList.add("active")

    /*  fetch(links[event.target.id])
      .then(response => response.json())
      .then(data => setNews(data.hits)) */
    }
  
  } 





  return (
    <div className="app-container">

      <div className="header"  onClick={handleClick}>
        <h2 className="logo">HackerNews</h2>
      <Link to="/">  <div className="menu active" id="latest">New</div></Link>
      <Link to="/popular"><div className="menu" id="popular">Popular</div></Link>
      <Link to="/ask"><div className="menu" id="ask">Ask</div></Link>
      <Link to="/show"><div className="menu" id="show">Show</div></Link>
      <Link to="/favorites"><div className="menu" id="favorites">Favorites</div></Link>
      </div>

      <Switch>
        <Route exact path="/">  <Content news={news} loadMore={loadMore} menu="latest"/> </Route>
        <Route path="/popular"><Content news={popular} loadMore={loadMore} menu="popular"/></Route>
        <Route path="/ask"><Content news={ask} loadMore={loadMore} menu="ask"/></Route>
        <Route path="/show"><Content news={show} loadMore={loadMore} menu="show"/></Route>
        <Route path="/favorites"><Content news={storyArr} loadMore={loadMore} menu=""/></Route>
        <Route path="/item/id=:itemID"><CommentSection /></Route>

      </Switch>
      
    </div>

  );
}

export default App;
