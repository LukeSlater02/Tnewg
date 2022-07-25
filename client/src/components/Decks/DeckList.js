import React, { useState, useEffect, useRef } from "react";
import { getDecksByUserId, editDeck, deleteDeck } from "../../modules/deckManager";
import firebase from "firebase";
import { getCurrentUser } from "../../modules/authManager";
import './DeckList.scss'
import { useNavigate } from "react-router-dom";

export const DeckList = () => {
    const [decks, setDecks] = useState([])
    const [isEditing, setIsEditing] = useState(0)
    const [newName, setNewName] = useState("")
    const navigate = useNavigate()
    const newNameInput = useRef()

    const getDecks = () => {
        getCurrentUser(firebase.auth().currentUser.uid).then(userData => getDecksByUserId(userData.id).then(data => setDecks(data)))
    }

    useEffect(() => {
        getDecks()
    }, [])

    const handleInput = event => {
        setNewName(event.target.value)
    }

    const handleButtonClick = event => {
        const deckId = event.target.id.split(" ")[1]

        if(newName == "")
        {
            setIsEditing(0)
            return
        }

        if (event.target.id.includes("edit")) {
            setNewName("")
            const deck = {
                name: newName
            }
            editDeck(deck, deckId).then(() => getDecks()).then(() => setIsEditing(0))
        }

        if(event.target.id.includes("delete"))
        {
            deleteDeck(deckId).then(() => getDecks())
        }
    }

    return (
        <div className="deckList">
            {decks.map(d => {
                return (
                    <div key={d.id} className="deck" style={{ backgroundImage: `url(${d.backgroundImage})` }}>
                        {isEditing == d.id ?
                            <input placeholder={d.name} className="deckEdit" autoFocus={true} value={newName} onChange={handleInput}></input>
                            :
                            <h2>{d.name}</h2>}
                        <div className="buttons">
                            <div className="pixelButton"><p onClick={() => navigate(`/deck/${d.id}`)}>view</p></div>
                            {isEditing == d.id ?
                                <div className="pixelButton save"><p id={`edit ${d.id}`} onClick={handleButtonClick}>save</p></div>
                                :
                                <div className="pixelButton edit" ref={newNameInput} onClick={() => setIsEditing(d.id)}><p>edit</p></div>}
                            {isEditing == d.id ?
                                <div className="pixelButton cancel" onClick={() => {
                                    setIsEditing(0)
                                    setNewName("")
                                }}><p>cancel</p></div>
                                :
                                <div className="pixelButton delete"><p id={`delete ${d.id}`} onClick={handleButtonClick}>delete</p></div>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}