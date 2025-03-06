'use client';
 
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';




 // https://vercel.com/docs/storage/vercel-blob/client-upload
export default function Step2AddImages() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const [blobs, setBlobs] = useState<(PutBlobResult | null)[]>([]);

    const handleClick = (Unwantedblob : PutBlobResult) => {
        setBlobs(blobs.filter((blob) => blob !== Unwantedblob));
    }

    const handleSubmit = (e : any) => {
        e.preventDefault()
        if (blobs) {
            blobs.forEach((blob, index) => {
            if (blob?.url) {
                localStorage.setItem(`imageUrl_${index}`, blob.url);
            }
            });

            const locale = (pathname.split("/").at(1));
            router.push(`/${locale}/add-property/step3`);
        }else{
            alert("No images have been uploaded");
        }
    }

    return (
        <>
        <h1>Upload Your Avatar</h1>
    
        <form
            onSubmit={async (event) => {
            event.preventDefault();
    
            if (!inputFileRef.current?.files) {
                throw new Error('No file selected');
            }
    
            const file = inputFileRef.current.files[0];
    
            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/avatar/upload',
            });
    
            setBlobs([...blobs, newBlob]);
            }}
        >
            <input name="file" ref={inputFileRef} type="file" required />
            <button type="submit">Upload</button>
        </form>
        {blobs && (
            <div>
            {/* Blob url: <a href={blob.url}>{blob.url}</a> */}
            {blobs.map((blob, index) => (
                blob?.url && (
                <div key={index}>
                    <h3>Image {index + 1}</h3>
                    <img src={blob.url} alt="" />
                    <button onClick={() => handleClick(blob)}>Remove image</button>
                </div>
    )
    ))}
            </div>
        )}
        <form onSubmit={handleSubmit}>
            <button>Save and next</button>
        </form>
        </>
    );
}