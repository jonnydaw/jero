// https://next-intl.dev/blog/next-intl-3-22
// https://next-intl.dev/docs/usage/configuration
// https://github.com/amannn/next-intl/discussions/1103
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
    // This typically corresponds to the `[[locale]]` segment
    let locale = await requestLocale;

    // Ensure that a valid [locale] is used
    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}/${locale}.json`)).default
    };
});