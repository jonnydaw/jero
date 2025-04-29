'use client'

import { ChangeEvent, useState } from "react";
import style from "./review.module.css"
import { GoStarFill } from "react-icons/go";
import axios from "axios";
import { inDevEnvironment } from "@/base";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface Props {
    propertyId : string;
    bookingId : string;
}

type Review = {
    score : number
    title : string;
    body : string;
}

const Review = (props : Props) => {
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    // const pathname = usePathname();
    // const id = (pathname.split("/").at(-1));
    const t = useTranslations('ReviewsPage')
    const [review, setReview] = useState<Review>({
        score : 5,
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
        setReview({...review, score :  val + 1})
        console.log(val)
    }

    const handleChange = (e : any) => {
        const {value, name} = e.target;
        setReview({...review, [name] :  value})
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        console.log(review);
        try {
            const response = await axios.post(`${baseApi}/property/add-review`, {
                score : review.score,
                title : review.title,
                body : review.body,
                propertyId : props.propertyId,
                bookingId : props.bookingId,
               },
                   { withCredentials: true}
               );
               alert("Review Added")

        }catch (error :any){
            if(error.status === 409){
                alert("Already Reviewed")
            }else if(error.status === 404){
                alert("Property deleted")
            }
        }
    }

    return (
        <div id={style.container}>
        <h1>{t('rating')}</h1>
            <div id={style.stars}>

            <span 
                tabIndex={0}
                role='button'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      clickStar(e, 0);
                    }
                }}
                onClick={(e) => clickStar(e, 0)}
                aria-label="1 out of 10"
                > 
                {starRating[0] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>
           
            <span 
                tabIndex={0}
                role='button'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      clickStar(e, 1);
                    }
                }}
                onClick={(e) => clickStar(e, 1)}
                aria-label="2 out of 10"
                >
                {starRating[1] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>
           
            <span 
                tabIndex={0} 
                role='button'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      clickStar(e, 2);
                    }
                }}
                onClick={(e) => clickStar(e, 2)}
                aria-label="3 out of 10"
                >
                {starRating[2] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>
            
            <span 
                tabIndex={0}
                role='button'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      clickStar(e, 3);
                    }
                }}
                onClick={(e) => clickStar(e, 3)}
                aria-label="4 out of 10"
                >
                {starRating[3] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>
            
            <span 
                tabIndex={0}
                role='button'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      clickStar(e, 4);
                    }
                }}
                onClick={(e) => clickStar(e, 4)}
                aria-label="5 out of 10"
                >
                {starRating[4] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>
            
            <span 
                tabIndex={0}
                role='button'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      clickStar(e, 5);
                    }
                }}
                onClick={(e) => clickStar(e, 5)}
                aria-label="6 out of 10"
                >
                {starRating[5] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>
            
            <span 
                tabIndex={0} 
                role='button'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      clickStar(e, 6);
                    }
                }}
                onClick={(e) => clickStar(e, 6)}
                aria-label="7 out of 10"
                >
                {starRating[6] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>
            
            <span 
                tabIndex={0}
                role='button'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      clickStar(e, 7);
                    }
                }}
                onClick={(e) => clickStar(e, 7)}
                aria-label="8 out of 10"
                >
                {starRating[7] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>

            <span 
                tabIndex={0}
                role='button'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      clickStar(e, 8);
                    }
                }}
                onClick={(e) => clickStar(e, 8)}
                aria-label="9 out of 10"
                >
                {starRating[8] ? <GoStarFill fill="gold"/> : <GoStarFill/>}</span>
            
            <span 
                tabIndex={0}
                role='button'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      clickStar(e, 9);
                    }
                }}
                onClick={(e) => clickStar(e, 9)}
                aria-label="10 out of 10"
                >
                {starRating[9] ? <GoStarFill fill="gold"/> : <GoStarFill/>}
            </span>
            </div>
            

        <div id={style.textAreaContainer}>
            <label htmlFor="propertyTitle">{t('reviewTitle')}
                <textarea
                name="title"
                rows={3} 
                id="title" 
                required
                aria-required
                value={review.title}
                onChange={handleChange} />
            </label>
            
            <label htmlFor="propertyTitle">{t('reviewDescriptions')}
                <textarea
                name="body" 
                id="body" 
                rows={6}
                required
                aria-required
                value={review.body}
                onChange={handleChange} />
            </label>

            <button onClick={handleSubmit}className="basicButton">{t('submit')}</button>
            </div>
        </div>
    )
}

export default Review