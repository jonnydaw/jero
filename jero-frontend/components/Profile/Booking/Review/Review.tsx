'use client'

import { ChangeEvent, useState } from "react";
import style from "./review.module.css"
import { GoStarFill } from "react-icons/go";

type Review = {
    title : string;
    body : string;
}

const Review = () => {
    const [review, setReview] = useState<Review>({
        title : "",
        body : "",
    })
    const [starRating, setStarRating] = useState<boolean[]>([true,true,true,true,true,false,false,false,false,false])
    const clickStar = (e : any, val : number) => {
        const cop :boolean[] = []
        for(let i = 0; i < 10; i++){
            if(i <= val){
                cop[i] = true;
            }else{
                cop[i] = false;
            }
        }
        setStarRating(cop);
        console.log(val)
    }

    const handleChange = (e : any) => {
        const {value, name} = e.target;
        setReview({...review, [name] :  value})
    }

    const handleSubmit = (e : any) => {
        e.preventDefault();
        console.log(review)
    }

    return (
        <div id={style.container}>
            <div id={style.stars}>

            <span onClick={(e) => clickStar(e, 0)}> 
                {starRating[0] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>
           
            <span onClick={(e) => clickStar(e, 1)}>
                {starRating[1] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>
           
            <span onClick={(e) => clickStar(e, 2)}>
                {starRating[2] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>
            
            <span onClick={(e) => clickStar(e, 3)}>
                {starRating[3] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>
            
            <span onClick={(e) => clickStar(e, 4)}>
                {starRating[4] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>
            
            <span onClick={(e) => clickStar(e, 5)}>
                {starRating[5] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>
            
            <span onClick={(e) => clickStar(e, 6)}>
                {starRating[6] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>
            
            <span onClick={(e) => clickStar(e, 7)}>
                {starRating[7] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>

            <span onClick={(e) => clickStar(e, 8)}>
                {starRating[8] ? <GoStarFill fill="gold"/> : <GoStarFill/>}</span>
            
            <span onClick={(e) => clickStar(e, 9)}>
                {starRating[9] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>

            </div>
            

        <div id={style.textAreaContainer}>
            <label htmlFor="propertyTitle"> Review Title
                <textarea
                placeholder="Title of your choice. e.g. Modern, 2 bedroom apartment in a quiet neighbourhood. Perfect for weekend trips, or long stays."
                name="title"
                rows={3} 
                id="title" 
                value={review.title}
                onChange={handleChange} />
            </label>
            
            <label htmlFor="propertyTitle"> Review Description
                <textarea
                placeholder="A more detailed insight into your stay."
                name="body" 
                id="body" 
                rows={6}
                value={review.body}
                onChange={handleChange} />
            </label>

            <button onClick={handleSubmit}className="basicButton">Submit</button>
            </div>
        </div>
    )
}

export default Review