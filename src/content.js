import React, { useContext, useEffect } from "react"
import { useState } from "react/cjs/react.development";
import Favorite from "./favorite";
import {FavoriteContext} from "./favoriteContext"
import Story from "./story";
import InfiniteScroll from "react-infinite-scroll-component";



function Content({news,loadMore,menu}){
    const [content,setContent] = useState("")
    
    const {fillObjectIdArr} = useContext(FavoriteContext)

    const [noOfStories,setNoOfStories] = useState(60)
    
    const links = {
        latest : `https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=${noOfStories}`  ,
      popular : `https://hn.algolia.com/api/v1/search?&hitsPerPage=${noOfStories}`,
       ask : `http://hn.algolia.com/api/v1/search_by_date?tags=ask_hn&hitsPerPage=${noOfStories}&numericFilters=num_comments>3`,
      show : `http://hn.algolia.com/api/v1/search_by_date?tags=show_hn&hitsPerPage=${noOfStories}&numericFilters=num_comments>3`
    } 
      

    useEffect(()=>{
        if(news){

        setContent(news.map((data,i) => {

           fillObjectIdArr({objectID:data.objectID,favorite:false})

            if(data.url ){
           let start = data.url.indexOf("//") 
            var site =  data.url.slice(start+2)
           let end =  site.indexOf("/")
            site = site.slice(0,end)}
             return  <Story data ={data} site={site} i={i}/>
            }))
        
        }
    },[news])

    function fetchMoreData(){
           
        fetch( links[menu])
            .then(response => response.json())
            .then(data => loadMore(data.hits,menu))

            setNoOfStories(prevState => Number(prevState)+30)    

        }


    return(<div>
         <InfiniteScroll
          dataLength={news.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4></h4>}
        >
        {content}
        </InfiniteScroll>
    </div>)
}
export default Content;




