import React from "react"
import {useParams} from "react-router-dom";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import {FavoriteContext} from "./favoriteContext"
import Story from "./story"
import calculateTime from "./calculateTime"
import Favorite from "./favorite"
import {Link} from "react-router-dom"

function CommentSection(){

    const {itemID}  = useParams();
    const {commentStoryArr,getCommentStory} = useContext(FavoriteContext)

    const [data,site,i] = commentStoryArr;

    const [commentsArr,setCommentsArr] = useState("")

    const [comment,setComment] = useState("")


    useEffect(()=>{
        if(itemID){

            fetch(`https://hn.algolia.com/api/v1/search?tags=comment,story_${itemID}`)
            .then(response => response.json())
            .then(data => setCommentsArr(data.hits))
        }
    },[])
    


    function handleShowComments(){
        getCommentStory(data,site,i)
    }

  
    useEffect(()=>{
        let final=[] ;
        if(commentsArr){
            let allParents = commentsArr.filter(elm => elm.parent_id == itemID).map(elm => elm.objectID)
           console.log(allParents,"hi")
            allParents.forEach(parent => {

              final = [...final,...commentsArr.filter(elm => elm.objectID == parent).map(elm => <CommentComponent comment={elm} margin="2em"/> )]

              final = [...final,...commentsArr.filter(elm => elm.parent_id == parent ).map(elm => {
                   
                       

                        return <CommentComponent comment={elm} margin="5em"/>
                    
                })
            ]

            

           }) 
           
           
        setComment(final)
            
        }
    },[commentsArr])


    console.log(commentsArr)
    console.log(comment,"comment")

    return(
    <div className="comment-container">
         <div>
            <h3 className="title ">   <a href={data.url} target="_blank">  {data.title} </a><span className="website">{site }</span></h3>
            <p className="details">
                {data.points} by {data.author} {calculateTime(data.created_at)} |
              <Link to={`/hacker_news_react/item/id=${data.objectID}`}>  <span className="comments" id="comment" onClick={handleShowComments}> {data.num_comments} comments </span> </Link> |
             <Favorite storyId={data.objectID} fullStory={data} />
            </p>
            <hr />
        </div>
        {comment}
    </div>)
}

function CommentComponent({comment,margin}){
    return(
    <div style={{marginLeft:margin}}>
        <h3 className="comment-author">{comment.author} | {calculateTime(comment.created_at)} </h3>
        <p>{comment.comment_text}</p>
    </div>)
}
export default CommentSection
