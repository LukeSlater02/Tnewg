import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllByDeck, deleteCardFromDeck } from "../../modules/deckCardManager";

export const DeckView = () => {
    const [deckCards, setDeckCards] = useState([])
    let { deckId } = useParams()

    const getDeckCards = () => {
        getAllByDeck(deckId).then(data => setDeckCards(data))
    }

    useEffect(() => {
        getDeckCards()
    }, [])

    const removeCard = event => {
        let deckCardId = event.target.id.split(" ")[1]
        deleteCardFromDeck(deckCardId).then(() => getDeckCards())
    }

    return (
        <div className="cardsContainer">
            {deckCards.map(c => {
                return (
                    <div key={c.id}>
                        <div className="card" style={{ backgroundImage: `url(${c.card.backgroundColor})` }}>
                            <div className="cardHeroImage" style={{ backgroundImage: `url(${c.card.borderColor})` }}>
                                <img src="../img/circleGray.png" className="circle"></img>
                                <span className="cost">{c.card.cost}</span>
                                <img className="characterImage" src={c.card.image}></img>
                            </div>
                            <h2>{c.card.name}</h2>
                            <div className="statsContainer" style={{ backgroundImage: `url(${c.card.statsBackgroundColor})` }} >
                                <div className="stats">
                                    <img src="../img/cardDmg.png"></img>
                                </div>
                                <div className="stats">
                                    <img src="../img/cardArmor.png"></img>
                                </div>
                                <div className="stats">
                                    <img src="../img/cardHp.png"></img>
                                </div>
                            </div>
                        </div>
                        <div className="buttons">
                            <div className="pixelButton delete"><p onClick={removeCard} id={`remove ${c.id}`}>remove</p></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}