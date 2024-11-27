import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({

    locales: ['en', 'es','br'],

    defaultLocale: 'en',

    localePrefix: 'always',

    });

// https://next-intl-docs.vercel.app/docs/routing/navigation
export const {Link, redirect, usePathname, useRouter} =
    createNavigation(routing);