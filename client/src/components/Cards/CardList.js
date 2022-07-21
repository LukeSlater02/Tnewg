import React, { useEffect, useState } from "react";
import { getAllCards } from "../../modules/cardManager";
import './CardList.scss'

export const CardList = () => {
    const [cards, setCards] = useState([])

    useEffect(() => {
        getAllCards().then(data => setCards(data))
    })

    return (
        <div className="cardsContainer">
            {cards.map(c => {
                return (
                    <div key={c.id}>
                        <div className="card" style={{ backgroundImage: `url(${c.backgroundColor})` }}>
                            <div className="cardHeroImage" style={{ backgroundImage: `url(${c.borderColor})` }}>
                                <img src="../img/circleGray.png" className="circle"></img>
                                <span className="cost">{c.cost}</span>
                                <img className="characterImage" src={c.image}></img>
                            </div>
                            <h2>{c.name}</h2>
                            <div className="statsContainer" style={{ backgroundImage: `url(${c.statsBackgroundColor})` }} >
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
                        <div className="buttons" >
                            <div className="pixelButton add"><p>add</p></div>
                            <div className="pixelButton edit"><p>edit</p></div>
                            <div className="pixelButton delete"><p>delete</p></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}