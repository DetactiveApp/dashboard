const DEBUG = true
const apiUrl = DEBUG ? "http://localhost:3000/v1" : "https://test-api.detactive.de/v1"

const useApi = async (path: string, requestInit?: RequestInit) => {
    return await fetch(apiUrl + path, requestInit)
}

export default useApi;