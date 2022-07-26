import { getToken } from "./authManager";
const _apiUrl = "/api/deckcard";

export const addCardToDeck = deckCard => {
    return getToken().then((token => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deckCard)
        })
    }))
}

export const getAllByDeck = deckId => {
    return getToken().then(token => {
        return fetch(`${_apiUrl}/${deckId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
    })
}

export const deleteCardFromDeck = (cardId, deckId) => {
    return getToken().then(token => {
        return fetch(`${_apiUrl}/${cardId}/${deckId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}