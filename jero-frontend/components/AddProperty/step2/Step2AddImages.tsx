'use client';
 
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useState, useRef, Dispatch, SetStateAction } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Link } from "@/i18n/routing";
import style from "./step2AddProperty.module.css"

import bottomNavStyle from "../AddPropertyNavigation.module.css"




 // https://vercel.com/docs/storage/vercel-blob/client-upload
 interface Props {
    isUpdate : boolean;
    getter : string[] | null;
    setter: Dispatch<SetStateAction<string[]>> | null;
 }
export default function Step2AddImages(props : Props) {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const [blobs, setBlobs] = useState<(PutBlobResult | null)[]>([]);

    const handleClick = (Unwantedblob : PutBlobResult) => {
        setBlobs(blobs.filter((blob) => blob !== Unwantedblob));
    }

    const handleOriginalSubmit = (e : any) => {
        e.preventDefault()
        const images : string[] = [];
        if (blobs) {
            blobs.forEach((blob, index) => {
            if (blob?.url) {
                images.push(blob.url); 
            }   
            });
            localStorage.setItem(`images`,JSON.stringify(images));
            const locale = (pathname.split("/").at(1));
            router.push(`/${locale}/add-property/step3`);
        }else{
            alert("No images have been uploaded");
        }
    }

    const handleUpdateSubmit = (e : any) => {
        e.preventDefault()
        if(props.getter && props.setter){
            const images : string[] = [...props.getter];
            if (blobs) {
                blobs.forEach((blob, index) => {
                if (blob?.url) {
                    images.push(blob.url); 
                }   
                });
            props.setter(images);
            console.log("arr " + props.getter)
            console.log(images)
            setBlobs([]);
            }else{
                alert("No images have been uploaded");
            }
    }
    }
    
    const handleInputFileChange = async (e : any) => {
        e.preventDefault();
        const [file] = e.target.files;
        const newBlob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/api/avatar/upload',
        });

        setBlobs([...blobs, newBlob]);
        console.log(file);

    }

    return (
        <div id={style.container}>
        <h1>{props.isUpdate ? `Add new images`: `Step 2: Upload images of your property`}</h1>
    
        <div id={style.uploadArea}>
        <form>
            {/** https://dev.to/ibn_abubakre/styling-file-inputs-like-a-boss-mhm*/}
            <div>
                <input 
                    onChange={handleInputFileChange} 
                    id="file" 
                    className={style.file}  
                    name="file" ref={inputFileRef} 
                    type="file" 
                    required
                    accept="image/png,image/jpeg" />
                <label htmlFor="file" className={style.fileLabel}>Upload file</label>
            </div>
        </form>
        </div>
        {blobs && (
            <div id={style.imageArea}>
            {/* Blob url: <a href={blob.url}>{blob.url}</a> */}
            {blobs.map((blob, index) => (
                blob?.url && (
                <div  className={style.imageSubArea} key={index}>
                    <h3>Image {index + 1}</h3>
                    <img src={blob.url} alt="" />
                    <button onClick={() => handleClick(blob)}>Remove image</button>
                </div>
    )
    ))}
            </div>
        )}
        {
            !props.isUpdate 
            ?
(        <nav id={bottomNavStyle.hi}>

        <form onSubmit={handleOriginalSubmit}>
            <button className={style.button} >Save and next</button>
        </form>

            <div id={bottomNavStyle.links}>
                <Link href={"/add-property/step1"}>1</Link>
            </div>
        

        </nav>)
        : (
            <form onSubmit={handleUpdateSubmit}>
            <button  className={`basicButton`} >Add New</button>
        </form>
        )
        }
        </div>
    );
}