'use client';
 
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useState, useRef, Dispatch, SetStateAction } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Link } from "@/i18n/routing";
import style from "./step2AddProperty.module.css"

import bottomNavStyle from "../AddPropertyNavigation.module.css"
import { useTranslations } from 'next-intl';




 // https://vercel.com/docs/storage/vercel-blob/client-upload
 interface Props {
    isUpdate : boolean;
    getter : string[] | null;
    setter: Dispatch<SetStateAction<string[]>> | null;
 }
export default function Step2AddImages(props : Props) {
    const t = useTranslations("Step2");
    const inputFileRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const [blobs, setBlobs] = useState<(PutBlobResult | null)[]>([]);

    const handleClick = (Unwantedblob : PutBlobResult) => {
        setBlobs(blobs.filter((blob) => blob !== Unwantedblob));
    }

    const handleOriginalSubmit = (e : any) => {
        e.preventDefault();
        console.log("blobs " + blobs)
        const images : string[] = [];
        if (blobs.length > 0) {
            blobs.forEach((blob, index) => {
            if (blob?.url) {
                images.push(blob.url); 
            }   
            });
            localStorage.setItem(`images`,JSON.stringify(images));
            const locale = (pathname.split("/").at(1));
            router.push(`/${locale}/add-property/step3`);
        }else{
            console.log("hi")
            alert(t('noImages'));
        }
    }

    const handleUpdateSubmit = (e : any) => {
        e.preventDefault()
        if(props.getter && props.setter){
            const images : string[] = [...props.getter];
            if (blobs.length > 0) {
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
                alert(t('noImages'));
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
        <h1>{props.isUpdate ? t('titleUpdate'): t('titleOriginal')}</h1>
    
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
                <label htmlFor="file" className={style.fileLabel}>{t('upload')}</label>
            </div>
        </form>
        </div>
        {blobs && (
            <div id={style.imageArea}>
            {/* Blob url: <a href={blob.url}>{blob.url}</a> */}
            {blobs.map((blob, index) => (
                blob?.url && (
                <div  className={style.imageSubArea} key={index}>
                    <h3>{t("image")} {index + 1}</h3>
                    <img src={blob.url} alt="" />
                    <button className='basicButton' onClick={() => handleClick(blob)}>{t('remove')}</button>
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
            <button className={`${style.button} basicButton`} >{t('save')}</button>
        </form>

            <div id={bottomNavStyle.links}>
                <Link href={"/add-property/step1"}>1</Link>
                <Link href={"/add-property/step2"}>2</Link>
                <Link href={"/add-property/step3"}>3</Link>
                <Link href={"/add-property/step4"}>4</Link>
                <Link href={"/add-property/step5"}>5</Link>
            </div>
        

        </nav>)
        : (
            <form onSubmit={handleUpdateSubmit}>
            <button style={{marginTop: "0.5em"}} className={`basicButton`} >{t('saveNew')}</button>
        </form>
        )
        }
        </div>
    );
}