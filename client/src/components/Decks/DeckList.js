import React, { useState, useEffect } from "react";
import { getDecksByUserId } from "../../modules/deckManager";
import firebase from "firebase";
import { getCurrentUser } from "../../modules/authManager";
import './DeckList.scss'
import { useNavigate } from "react-router-dom";

export const DeckList = () => {
    const [decks, setDecks] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getCurrentUser(firebase.auth().currentUser.uid).then(userData => getDecksByUserId(userData.id).then(data => setDecks(data)))
    }, [])

    return (
        <div className="deckList">
            {decks.map(d => {
                return (
                    <div key={d.id} className="deck" style={{backgroundImage: `url(${d.backgroundImage})`}}>
                        <h2>{d.name}</h2>
                        <div className="buttons">
                            <div className="pixelButton"><p onClick={() => navigate(`/deck/${d.id}`)}>view</p></div>
                            <div className="pixelButton edit"><p>edit</p></div>
                            <div className="pixelButton delete"><p>delete</p></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}