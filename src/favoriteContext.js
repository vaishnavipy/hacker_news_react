import React from "react"
import { useState } from "react/cjs/react.development"

const FavoriteContext = React.createContext()


function FavoriteContextProvider(props){
    
    const [storyArr,setStoryArr] = useState([])

    const [objectIdArr,setObjectIdArr] = useState([])

    const [commentStoryArr,setCommentStoryArr] = useState([])

    let tempIndex; let temp;

    function handleFavoritedStory(story,id){
        tempIndex = objectIdArr.findIndex(elm => elm.objectID === id)
        temp = [...objectIdArr]
        temp[tempIndex].favorite = true;
        setObjectIdArr(temp)
        setStoryArr(prevState =>  [...prevState,story])
    }

    function  removeFavoritedStory(id){
        tempIndex= objectIdArr.findIndex(elm => elm.objectID === id)
        temp = [...objectIdArr]
        temp[tempIndex].favorite = false;
        setObjectIdArr(temp)
        setStoryArr(prevState => prevState.filter(elm => elm.objectID !== id))
    }

    function fillObjectIdArr(obj){
        setObjectIdArr(prevArr => [...prevArr,obj])
    }

    function getCommentStory(data,site,i){

        setCommentStoryArr([data,site,i])
    }

    return(
        <FavoriteContext.Provider value={{handleFavoritedStory, removeFavoritedStory,storyArr,fillObjectIdArr,objectIdArr,getCommentStory,commentStoryArr}}>
            {props.children}
        </FavoriteContext.Provider>

    )
}

export {FavoriteContextProvider,FavoriteContext}