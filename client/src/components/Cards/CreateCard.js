import React, { useState } from "react";
import './CreateCard.scss'

export const CreateCard = () => {
    const [name, setName] = useState("Name")
    const [cost, setCost] = useState(0)
    const [cardBackground, setCardBackground] = useState("")
    const [cardBorder, setCardBorder] = useState("")
    const [cardStatsBackground, setCardStatsBackground] = useState("")
    const [characterImage, setCharacterImage] = useState("")

    const handleInput = event => {
        switch (event.target.id) {
            case "cost":
                if (parseInt(event.target.value) > 9) {
                    setCost(9)
                }
                else {
                    setCost(event.target.value)
                }
                break;
            case "backgroundSelect":
                setCardBackground(event.target.value)
                break;
            case "borderSelect":
                setCardBorder(event.target.value)
                break;
            case "statsBackgroundSelect":
                setCardStatsBackground(event.target.value)
                break;
            case "name":
                setName(event.target.value)
                break;
            case "characterImage":
                setCharacterImage(event.target.value)
                break;
        }
    }

    return (
        <div className="create-container">
            <div>
                <div>
                    Character <br></br>
                    <select id="characterImage" onChange={handleInput}>
                        <option>----</option>
                        <option value={"../img/samurai.webp"}>The Ronin</option>
                        <option value={"../img/wizardCard2.png"}>The Arcanist</option>
                        <option value={"../img/highwaymanCard.png"}>Highwayman</option>
                    </select>
                </div>
                <div>
                    BORDER <br></br>
                    <select id="borderSelect" onChange={handleInput}>
                        <option>----</option>
                        <option value={"goldBorder"}>Gold</option>
                        <option value={"silverBorder"}>Silver</option>
                        <option value={"brownBorder"}>Brown</option>
                    </select>
                </div>
                <div>
                    BACKGROUND<br></br>
                    <select id="backgroundSelect" onChange={handleInput}>
                        <option>----</option>
                        <option value={"grayBackground"}>Gray</option>
                        <option value={"blueBackground"}>Blue</option>
                        <option value={"redBackground"}>Red</option>
                        <option value={"greenBackground"}>Green</option>
                        <option value={"yellowBackground"}>Gold</option>
                    </select>
                </div>
                <div>
                    STATS BACKGROUND<br></br>
                    <select id="statsBackgroundSelect" onChange={handleInput}>
                        <option>----</option>
                        <option value={"grayStatsBackground"}>Gray</option>
                        <option value={"brownStatsBackground"}>Brown</option>
                        <option value={"goldStatsBackground"}>Gold</option>
                        <option value={"shinyGoldStatsBackground"}>Shiny Gold</option>
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
            <div className={`card ${cardBackground}`}>
                <div className={`cardHeroImage ${cardBorder}`}>
                    <img src="../img/circleGray.png" className="circle"></img>
                    <span className="cost">{cost}</span>
                    <img src={characterImage}></img>
                </div>
                <h2>{name}</h2>
                <div className={`statsContainer ${cardStatsBackground}`}>
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