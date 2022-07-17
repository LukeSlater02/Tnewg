import React, { useState } from "react";
import './CreateCard.scss'

export const CreateCard = () => {
    const [name, setName] = useState("Name")
    const [cost, setCost] = useState(0)
    const [cardBackground, setCardBackground] = useState(0)

    const handleInput = event => {
        if (event.target.id === "cost") {
            if (parseInt(event.target.value) > 9) {
                setCost(9)
            }
            else {
                setCost(event.target.value)
            }

        }
        if (event.target.id === "backgroundSelect") {
            setCardBackground(event.target.value)
        }
        else {
            setName(event.target.value)
        }
    }

    const determineBackground = () => {
        if (cardBackground == "blue") {
            return "blueBackground"
        }
        if (cardBackground == "red") {
            return "redBackground"
        }
        if (cardBackground == "green") {
            return "greenBackground"
        }
        if (cardBackground == "yellow") {
            return "yellowBackground"
        }
        else {
            return "card"
        }
    }

    return (
        <div className="create-container">
            <div>
                <div>
                    BORDER <br></br>
                    <select>
                        <option>----</option>
                        <option>Gold</option>
                        <option>Silver</option>
                    </select>
                </div>
                <div>
                    BACKGROUND<br></br>
                    <select id="backgroundSelect" onChange={handleInput}>
                        <option value={"gray"}>Gray</option>
                        <option value={"blue"}>Blue</option>
                        <option value={"red"}>Red</option>
                        <option value={"green"}>Green</option>
                        <option value={"yellow"}>Yellow</option>
                    </select>
                </div>
                <div>
                    STATS BACKGROUND<br></br>
                    <select>
                        <option>----</option>
                        <option>Gray</option>
                        <option>Brown</option>
                    </select>
                </div>
                <div>
                    NAME<br></br>
                    <input id="name" onChange={handleInput} maxLength={13} />
                </div>
                <div>
                    Cost<br></br>
                    <input id="cost" type="number" max={9} onChange={handleInput} />
                </div>
            </div>
            <div className={`card ${determineBackground()}`}>
                <div className="cardHeroImage">
                    <img src="../img/circleGray.png" className="circle"></img>
                    <span className="cost">{cost}</span>
                    <img src="../img/wizardCard2.png"></img>
                </div>
                <h2>{name}</h2>
                <div className="statsContainer">
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
        </div>
    )
}