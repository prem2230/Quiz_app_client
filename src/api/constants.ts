const isDevelopment = import.meta.env.DEV;

export const CONFIG = {
    ENV: import.meta.env.MODE,
    API_URL: import.meta.env.VITE_API_URL,
    APP_TITLE: import.meta.env.VITE_APP_TITLE,
    IS_DEV: isDevelopment,
}
export const APPLICATION_NAME: string = CONFIG.APP_TITLE;
export const BASE_URL: string = CONFIG.API_URL;