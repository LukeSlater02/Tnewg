import { getToken } from "./authManager";
const _apiUrl = "/api/deck";

export const getCurrentUserDecks = () => {
    return getToken().then(token => {
        return fetch(_apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
    })
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
    return getToken().then(token => {
        return fetch(`${_apiUrl}/${deckId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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