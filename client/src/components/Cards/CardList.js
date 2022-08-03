import React, { useEffect, useRef, useState } from "react";
import { getAllCards, deleteCard, searchCards } from "../../modules/cardManager";
import { getCurrentUser } from "../../modules/authManager";
import { getCurrentUserDecks } from "../../modules/deckManager";
import { addCardToDeck, getAllByDeck, deleteCardFromDeck } from "../../modules/deckCardManager";
import './CardList.scss'
import firebase from "firebase";
import { useNavigate } from "react-router-dom";

export const CardList = () => {
    const [cards, setCards] = useState([])
    const [decks, setDecks] = useState([])
    const [selectedDeck, setSelectedDeck] = useState(
        {
            name: "",
            id: 0
        }
    )
    const [selectedCard, setSelectedCard] = useState(0)
    const [user, setUser] = useState({})
    const [searchInput, setSearchInput] = useState("")
    const [deckListSelected, setDeckListSelected] = useState(false)
    const [deckIsFull, setDeckIsFull] = useState(false)
    const [cardsInFullDeck, setCardsInFullDeck] = useState([])
    const [cardToBeReplaced, setCardToBeReplaced] = useState({})
    const modal = useRef()
    let deckSelect = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        getAllCards().then(data => setCards(data))
    }, [])

    useEffect(() => {
        getAllByDeck(selectedDeck.id).then(data => setCardsInFullDeck(data))
    }, [deckIsFull])

    useEffect(() => {
        getCurrentUser(firebase.auth().currentUser.uid).then(userData => {
            setUser(userData)
            getCurrentUserDecks().then(data => setDecks(data))
        })
    }, [])

    const handleButtonClick = event => {
        let cardId = event.target.id.split(" ")[1]
        if (event.target.id === "replace") {
            const deckCard = {
                deckId: selectedDeck.id,
                cardId: selectedCard
            }
            deleteCardFromDeck(cardToBeReplaced.id).then(() => addCardToDeck(deckCard)).then(() => modal.current.classList.remove('activeModal'))
        }
        if (event.target.id.includes("delete")) {
            deleteCard(cardId).then(() => getAllCards().then(data => setCards(data)))
        }
        if (event.target.id.includes("openAddModal")) {
            modal.current.classList.add('activeModal')
            setSelectedCard(cardId)
        }
        if (event.target.id === "add" && selectedDeck.id != 0) {
            const deckCard = {
                deckId: selectedDeck.id,
                cardId: selectedCard
            }
            addCardToDeck(deckCard).then(cardLimitTriggered => {
                if (cardLimitTriggered) {
                    setDeckIsFull(true)
                }
                else {
                    modal.current.classList.remove('activeModal')
                }
            })
        }
    }

    async function handleSearchInput(event) {
        let searchInput = event.target.value
        setSearchInput(searchInput)
        let filteredCards = await searchCards(searchInput).then(data => data)
        setCards(filteredCards)
    }

    const closeModal = () => {
        modal.current.classList.remove('activeModal')
        setSelectedCard(0)
        setDeckIsFull(false)
        deckSelect.current.classList.toggle("active")
        setDeckListSelected(!deckListSelected)
        setCardToBeReplaced({})
    }

    const handleSelect = event => {
        if (deckIsFull) {
            let card = {
                id: event.target.id,
                name: event.target.attributes.value.value
            }
            setCardToBeReplaced(card)
            setDeckListSelected(false)
            deckSelect.current.classList.remove("active")
        }
        else {
            setDeckListSelected(false)
            deckSelect.current.classList.remove("active")
            let newSelectedDeck = {
                name: event.target.attributes.value.value,
                id: event.target.id
            }
            setSelectedDeck(newSelectedDeck)
        }
    }

    return (
        <>
            <input onChange={handleSearchInput} className="cardSearch" placeholder="Search by name..." value={searchInput} id="search"></input>
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
                                        <img src="/img/cardDmg.png"></img>{c.damage}
                                    </div>
                                    <div className="stats">
                                        <img src="/img/cardHp.png"></img>{c.hitPoints}
                                    </div>
                                </div>
                            </div>
                            <div className="buttons" >
                                <div className="pixelButton add"><p id={`openAddModal ${c.id}`} onClick={handleButtonClick}>add</p></div>
                                {user.userType === "admin" ? <>
                                    <div className="pixelButton edit" onClick={() => navigate(`/card/${c.id}/${c.name}/edit`)}><p>edit</p></div>

                                    <div className="pixelButton delete"><p id={`delete ${c.id}`} onClick={handleButtonClick}>delete</p></div>
                                </> : ""}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div ref={modal} className="deckModal">
                {!deckIsFull ?
                    <div className="deckModalContent">
                        <button className="close-button" onClick={closeModal}>&times;</button>
                        <h4>Select the Deck to add Card to</h4>
                        <div className="selectBox">
                            <div className="optionsContainer" ref={deckSelect}>
                                {deckListSelected ? <>
                                    {decks.map(d => {
                                        return (<div key={d.id} className="option" id={d.id} value={d.name} onClick={handleSelect}>
                                            <span id={d.id} value={d.name} onClick={handleSelect}>{d.name}</span>
                                        </div>)
                                    })}
                                </>
                                    : ""}
                            </div>
                            <div className="selected" onClick={() => {
                                deckSelect.current.classList.toggle("active")
                                setDeckListSelected(!deckListSelected)
                            }}>
                                {selectedDeck.name || "----"}
                            </div>
                        </div>
                        <div className="pixelButton add"><p id="add" onClick={handleButtonClick}>add</p></div>
                    </div>
                    :

                    <div className="deckModalContent">
                        <button className="close-button" onClick={closeModal}>&times;</button>
                        <h4>{selectedDeck.name} is full</h4>
                        <div className="selectBox">
                            <div className="optionsContainer" ref={deckSelect}>
                                {deckListSelected ? <>
                                    {cardsInFullDeck.map(deckCard => {
                                        return (<div key={deckCard.id} className="option" id={deckCard.id} value={deckCard.card.name} onClick={handleSelect}>
                                            <span id={deckCard.id} value={deckCard.card.name} onClick={handleSelect}>{deckCard.card.name}</span>
                                        </div>)
                                    })}
                                </>
                                    : ""}
                            </div>
                            <div className="selected" onClick={() => {
                                deckSelect.current.classList.toggle("active")
                                setDeckListSelected(!deckListSelected)
                            }}>
                                {cardToBeReplaced?.name || "Choose a card to replace"}
                            </div>
                        </div>
                        <div className="pixelButton add"><p id="replace" onClick={handleButtonClick}>replace</p></div>
                    </div>}

            </div>
        </>
    )
}