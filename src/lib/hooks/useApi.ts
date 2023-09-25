const apiUrl = "test-api.detactive.de"

const useApi = (path: string, requestInit?: RequestInit) => {
    return fetch(apiUrl + path, requestInit)
}

export default useApi;