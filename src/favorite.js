import React from "react"
import {FavoriteContext} from "./favoriteContext"
import { useContext, useEffect, useState } from 'react';

function Favorite({storyId,fullStory}){

    const {handleFavoritedStory, removeFavoritedStory,objectIdArr} = useContext(FavoriteContext)

   
    function handleFavorites(event){
       
        if(!favorite){
            handleFavoritedStory(fullStory,event.target.id) 
        }else{
            console.log(event.target.id)
            removeFavoritedStory(event.target.id)
        }
    }

  let favorite = objectIdArr.find(elm => elm.objectID === storyId ).favorite

    return( 
    <span className="fav-icon" onClick={handleFavorites} id={storyId}> 
    { favorite ? " ✖️  Remove From Favorites" : " ➕ Add to Favorites"} 
    </span> )
}

export default Favorite;
