import React from "react"
import Favorite from "./favorite"
import {Link} from "react-router-dom"

import calculateTime from "./calculateTime"

import {FavoriteContext} from "./favoriteContext"
import { useContext, useEffect, useState } from 'react';


function Story({data,site,i}){

    const {getCommentStory} = useContext(FavoriteContext)

    function handleShowComments(){
        getCommentStory(data,site,i)
    }
       
    return(
               
        <div>
            <h3 className="title"><a href={data.url} target="_blank">{i+1}.  {data.title} </a><span className="website">{site }</span></h3>
            <p className="details">
                {data.points} by {data.author} {calculateTime(data.created_at)} |
              <Link to={`/hacker_news_react/item/id=${data.objectID}`}>  <span className="comments" id="comment" onClick={handleShowComments}> {data.num_comments} comments </span> </Link> |
             <Favorite storyId={data.objectID} fullStory={data} />
            </p>
            <hr />
        </div>
     
        )
}

export default Story;
