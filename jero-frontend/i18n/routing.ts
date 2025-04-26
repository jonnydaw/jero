// https://next-intl.dev/blog/next-intl-3-22
// https://next-intl.dev/docs/routing
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