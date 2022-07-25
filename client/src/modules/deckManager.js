const _apiUrl = "/api/deck";

export const getDeckByUserId = userId => {
    return fetch(`${_apiUrl}/${userId}`).then(res => res.json())
}