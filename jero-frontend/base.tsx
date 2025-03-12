//https://stackoverflow.com/questions/64792787/easiest-way-to-detect-production-or-dev-environment-in-nextjs

export const inDevEnvironment = !!process && process.env.NODE_ENV === 'development';
