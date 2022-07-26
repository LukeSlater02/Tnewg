import { getToken } from "./authManager";
const _apiUrl = "/api/card";

export const getAllCards = () => {
    return fetch(_apiUrl).then(res => res.json())
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
    return fetch(`${_apiUrl}/${cardId}`).then(res => res.json())
}

export const editCard = ( card, id )=> {
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
    return fetch(`${_apiUrl}/${cardId}`, {
        method: "DELETE"
    })
}