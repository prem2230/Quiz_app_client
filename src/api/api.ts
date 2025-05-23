import { APPLICATION_NAME, BASE_URL } from './constants';

interface Config {
    headers?: Record<string, string>;
    params?: Record<string, any>;
}

interface Api {
    get: <T>(url: string, config?: Config) => Promise<T>;
    post: <T>(url: string, data: any, config?: Config, isFormData?: boolean) => Promise<T>;
    put: <T>(url: string, data: any, config?: Config) => Promise<T>;
    delete: <T>(url: string, config?: Config) => Promise<T>;

}

function getToken(): string | null {
    return localStorage.getItem("token");
}

function getHeaders(config: Config = {}, isFormData: boolean = false): Record<string, string> {
    if (!config || !Object.keys(config).length) {
        config = { headers: {} };
    }

    let headers = config.headers || {};
    let token = getToken();

    headers['X-Application'] = APPLICATION_NAME;

    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
}

function appendQueryParams(url: string, params?: Record<string, any>): string {
    if (!params) return url;
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    });
    const queryString = searchParams.toString();
    return queryString ? `${url}${url.includes('?') ? '&' : '?'}${queryString}` : url;
}

export default function callApi(): Api {
    const api = {
        get: async <T>(url: string, config: Config = {}): Promise<T> => {
            const finalUrl = appendQueryParams(`${BASE_URL}${url}`, config.params);
            const response = await fetch(finalUrl, {
                method: 'GET',
                headers: getHeaders(config),
            });
            return response.json();
        },
        post: async <T>(url: string, data: any, config: Config = {}, isFormData: boolean = false): Promise<T> => {
            const finalUrl = appendQueryParams(`${BASE_URL}${url}`, config.params);
            const response = await fetch(finalUrl, {
                method: 'POST',
                headers: getHeaders(config, isFormData),
                body: isFormData ? data : JSON.stringify(data),
            });
            return response.json();
        },
        put: async <T>(url: string, data: any, config: Config = {}): Promise<T> => {
            const finalUrl = appendQueryParams(`${BASE_URL}${url}`, config.params);
            const response = await fetch(finalUrl, {
                method: 'PUT',
                headers: getHeaders(config),
                body: JSON.stringify(data),
            });
            return response.json();
        },
        delete: async <T>(url: string, config: Config = {}): Promise<T> => {
            const finalUrl = appendQueryParams(`${BASE_URL}${url}`, config.params);
            const response = await fetch(finalUrl, {
                method: 'DELETE',
                headers: getHeaders(config),
            });
            return response.json();
        }
    }

    return api;
}