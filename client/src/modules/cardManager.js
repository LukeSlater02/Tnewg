const _apiUrl = "/api/card";

export const getAllCards = () => {
    return fetch(_apiUrl).then(res => res.json())
}