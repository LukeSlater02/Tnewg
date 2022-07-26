import React, { useEffect, useRef, useState } from "react";
import { getAllCards, deleteCard, addCard } from "../../modules/cardManager";
import { getCurrentUser } from "../../modules/authManager";
import { getCurrentUserDecks } from "../../modules/deckManager";
import { addCardToDeck } from "../../modules/deckCardManager";
import './CardList.scss'
import firebase from "firebase";
import { useNavigate } from "react-router-dom";

export const CardList = () => {
    const [cards, setCards] = useState([])
    const [decks, setDecks] = useState([])
    const [selectedDeck, setSelectedDeck] = useState(0)
    const [selectedCard, setSelectedCard] = useState(0)
    const [user, setUser] = useState({})
    const modal = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        getAllCards().then(data => setCards(data))
    }, [])

    useEffect(() => {
        getCurrentUser(firebase.auth().currentUser.uid).then(userData => {
            setUser(userData)
            getCurrentUserDecks().then(data => setDecks(data))
        })
    }, [])

    const handleButtonClick = event => {
        let cardId = event.target.id.split(" ")[1]
        if (event.target.id.includes("delete")) {
            deleteCard(cardId).then(() => getAllCards().then(data => setCards(data)))
        }
        if (event.target.id.includes("openAddModal")) {
            modal.current.classList.add('activeModal')
            setSelectedCard(cardId)
        }
        if (event.target.id == "add") {
            const deckCard = {
                deckId: selectedDeck,
                cardId: selectedCard
            }
            addCardToDeck(deckCard).then(() => navigate(`/deck/${selectedDeck}`))
        }
    }

    const closeModal = () => {
        modal.current.classList.remove('activeModal')
        setSelectedCard(0)
    }

    const handleSelect = event => {
        setSelectedDeck(event.target.value)
    }

    return (
        <div className="cardsContainer">
            {cards.map(c => {
                return (
                    <div key={c.id}>
                        <div className="card" style={{ backgroundImage: `url(${c.backgroundColor})` }}>
                            <div className="cardHeroImage" style={{ backgroundImage: `url(${c.borderColor})` }}>
                                <img src="/img/circleGray.png" className="circle"></img>
                                <span className="cost">{c.cost}</span>
                                <img className="characterImage" src={c.image}></img>
                            </div>
                            <h2>{c.name}</h2>
                            <div className="statsContainer" style={{ backgroundImage: `url(${c.statsBackgroundColor})` }} >
                                <div className="stats">
                                    <img src="/img/cardDmg.png"></img>
                                </div>
                                <div className="stats">
                                    <img src="/img/cardArmor.png"></img>
                                </div>
                                <div className="stats">
                                    <img src="/img/cardHp.png"></img>
                                </div>
                            </div>
                        </div>
                        <div className="buttons" >
                            <div className="pixelButton add"><p id={`openAddModal ${c.id}`} onClick={handleButtonClick}>add</p></div>
                            {user.userType == "admin" ? <>
                                <div className="pixelButton edit" onClick={() => navigate(`/card/${c.id}/edit`)}><p>edit</p></div>

                                <div className="pixelButton delete"><p id={`delete ${c.id}`} onClick={handleButtonClick}>delete</p></div>
                            </> : ""}
                        </div>
                    </div>
                )
            })}

            <div ref={modal} className="deckModal">
                <div className="deckModalContent">
                    <button className="close-button" onClick={closeModal}>&times;</button>
                    <h4>Select the Deck to add Card to</h4>
                    <select onChange={handleSelect}>
                        <option value={0}>----</option>
                        {decks.map(d => {
                            return (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            )
                        })}
                    </select>
                    <div className="pixelButton add"><p id="add" onClick={handleButtonClick}>add</p></div>
                </div>
            </div>
        </div>
    )
}