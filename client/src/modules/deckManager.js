import { getToken } from "./authManager";
const _apiUrl = "/api/deck";

export const getDecksByUserId = userId => {
    return fetch(`${_apiUrl}/${userId}`).then(res => res.json())
}

export const editDeck = (deck, deckId) => {
    return getToken().then((token => {
        return fetch(`${_apiUrl}/${deckId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deck)
        })
    }))
}

export const deleteDeck = deckId => {
    return fetch(`${_apiUrl}/${deckId}`, {
        method: "DELETE"
    })
}

export const addDeck = deck => {
    return getToken().then((token => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deck)
        })
    }))
}