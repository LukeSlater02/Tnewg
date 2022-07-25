const _apiUrl = "/api/deck";

export const getDecksByUserId = userId => {
    return fetch(`${_apiUrl}/${userId}`).then(res => res.json())
}