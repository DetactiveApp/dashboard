import { PUBLIC_API_URL } from '$env/static/public';

const useApi = async (path: string, requestInit?: RequestInit) => {
    return await fetch(PUBLIC_API_URL + path, requestInit)
}

export default useApi;