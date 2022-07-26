import React, { useState, useEffect, useRef } from "react";
import { getCurrentUserDecks, editDeck, deleteDeck, addDeck } from "../../modules/deckManager";
import firebase from "firebase";
import { getCurrentUser } from "../../modules/authManager";
import './DeckList.scss'
import { useNavigate } from "react-router-dom";

export const DeckList = () => {
    const [decks, setDecks] = useState([])
    const [isEditing, setIsEditing] = useState(0)
    const [deckNameUpdate, setDeckNameUpdate] = useState("")
    const [newDeckName, setNewDeckName] = useState("")
    const navigate = useNavigate()
    const modal = useRef()
    const nameEditField = useRef()
    const modalInput = useRef()

    const getDecks = () => {
        getCurrentUser(firebase.auth().currentUser?.uid).then(() => getCurrentUserDecks().then(data => setDecks(data)))
    }

    useEffect(() => {
        getDecks()
    }, [])

    useEffect(() => {
        nameEditField.current?.focus()
    }, [isEditing])

    const handleInput = event => {
        if (event.target.id == "deckEditInput") {
            setDeckNameUpdate(event.target.value)
        }
        if (event.target.id == "deckAddInput") {
            setNewDeckName(event.target.value)
        }
    }

    async function handleButtonClick(event) {
        const deckId = event.target.id.split(" ")[1]

        if (event.target.id.includes("edit")) {
            setIsEditing(deckId)
        }

        if (event.target.id.includes("save")) {
            if (deckNameUpdate == "") {
                setIsEditing(0)
                return
            }
            setDeckNameUpdate("")
            const deck = {
                name: deckNameUpdate
            }
            editDeck(deck, deckId).then(() => getDecks()).then(() => setIsEditing(0))
        }

        if (event.target.id.includes("delete")) {
            deleteDeck(deckId).then(() => getDecks())
        }

        if (event.target.id == "openAddModal") {
            setNewDeckName("")
            modal.current.classList.add('activeModal')
            modalInput.current.focus()
        }

        if (event.target.id == "add") {
            const backgroundColors = ["../img/blueCard.png", "../img/yellowCard.png", "../img/redCard.png", "../img/greenCard.png", "../img/grayCard.png"]

            const userId = await getCurrentUser(firebase.auth().currentUser.uid).then(userData => userData.id)
            
            const newDeck = {
                name: newDeckName,
                userProfileId: userId,
                backgroundImage: backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
            }

            addDeck(newDeck).then(() => getDecks())
            setNewDeckName("")
            closeModal()
        }
    }

    const closeModal = () => {
        modal.current.classList.remove('activeModal')
    }

    return (
        <>
            <div className="deckAdd"><button id="openAddModal" onClick={handleButtonClick}>Create New Deck</button></div>
            <div className="deckList">
                {decks.map(d => {
                    return (
                        <div key={d.id} className="deck" style={{ backgroundImage: `url(${d.backgroundImage})` }}>
                            {isEditing == d.id ?
                                <input maxLength={14} id="deckEditInput" ref={nameEditField} placeholder={d.name} className="deckEdit" value={deckNameUpdate} onChange={handleInput}></input>
                                :
                                <h2>{d.name}</h2>}
                            <div className="buttons">
                                <div className="pixelButton"><p onClick={() => navigate(`/deck/${d.id}`)}>view</p></div>
                                {isEditing == d.id ?
                                    <div className="pixelButton save"><p id={`save ${d.id}`} onClick={handleButtonClick}>save</p></div>
                                    :
                                    <div className="pixelButton edit" ><p id={`edit ${d.id}`} onClick={handleButtonClick}>edit</p></div>}
                                {isEditing == d.id ?
                                    <div className="pixelButton cancel" onClick={() => {
                                        setIsEditing(0)
                                        setDeckNameUpdate("")
                                    }}><p>cancel</p></div>
                                    :
                                    <div className="pixelButton delete"><p id={`delete ${d.id}`} onClick={handleButtonClick}>delete</p></div>}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div ref={modal} className="deckModal">
                <div className="deckModalContent">
                    <button className="close-button" onClick={closeModal}>&times;</button>
                    <h4>Deck Name</h4>
                    <input id="deckAddInput" ref={modalInput} value={newDeckName} onChange={handleInput} ></input>
                    <div className="pixelButton add"><p id="add" onClick={handleButtonClick}>add</p></div>
                </div>
            </div>
        </>
    )
}