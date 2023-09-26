const apiUrl = "https://test-api.detactive.de/v1"

const useApi = async (path: string, requestInit?: RequestInit) => {
    return await fetch(apiUrl + path, requestInit)
}

export default useApi;