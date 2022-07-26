import { getToken } from "./authManager";
const _apiUrl = "/api/card";

export const getAllCards = () => {
    return getToken().then(token => {
        return fetch(_apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
    })
}

export const addCard = card => {
    return getToken().then((token => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(card)
        })
    }))
}

export const getCardById = cardId => {
    return getToken().then(token => {
        return fetch(`${_apiUrl}/${cardId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
    })
}

export const editCard = (card, id) => {
    return getToken().then((token => {
        return fetch(`${_apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(card)
        })
    }))
}

export const deleteCard = cardId => {
    return getToken().then(token => {
        return fetch(`${_apiUrl}/${cardId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}