'use client'
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import axios from 'axios';

export default function HomePage() {

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        try {
            const response = await axios.delete('http://localhost:8080/auth/delete',
                { withCredentials: true}
            );
            console.log("hi" + response.data);
        } catch (error : any) {
            console.log(error)
            //onsole.log('Login failed:', error.response ? error.response.data : error.message);
        }
    }

    const t = useTranslations('HomePage');
    return (
        <div>
            <h1>{t('about')}</h1>
            <form onSubmit={handleSubmit}>
                <button type='submit'>
                    Delete
                    </button>
            </form>
        </div>
    );  
}