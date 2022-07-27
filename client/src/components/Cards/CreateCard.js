import React, { useState } from "react";
import './CreateCard.scss'
import { addCard } from "../../modules/cardManager";
import { useNavigate } from "react-router-dom";
export const CreateCard = () => {
    const [name, setName] = useState("Name")
    const [cost, setCost] = useState(0)
    const [cardBackground, setCardBackground] = useState("/img/baseCardBackground.png")
    const [cardBorder, setCardBorder] = useState("/img/baseCardBorder.png")
    const [cardStatsBackground, setCardStatsBackground] = useState("")
    const [characterImage, setCharacterImage] = useState("")

    let navigate = useNavigate()

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

    const handleAddClick = () => {
        const card = {
            name: name,
            damage: 0,
            hitPoints: 0,
            cost: cost,
            backgroundColor: cardBackground,
            borderColor: cardBorder,
            statsBackgroundColor: cardStatsBackground,
            image: characterImage,
        }
        addCard(card).then(() => navigate("/cards/list"))
    }

    return (
        <div className="create-container">
            <div>
                <div>
                    Character <br></br>
                    <select id="characterImage" onChange={handleInput}>
                        <option>----</option>
                        <option value={"/img/samurai.webp"}>The Ronin</option>
                        <option value={"/img/wizardCard2.png"}>The Arcanist</option>
                        <option value={"/img/highwaymanCard.png"}>Highwayman</option>
                    </select>
                </div>
                <div>
                    BORDER <br></br>
                    <select id="borderSelect" onChange={handleInput}>
                        <option>----</option>
                        <option value={"/img/yellowCardBorder.png"}>Gold</option>
                        <option value={"/img/silverCardBorder.png"}>Silver</option>
                        <option value={"/img/brownCardBorder.png"}>Brown</option>
                    </select>
                </div>
                <div>
                    BACKGROUND<br></br>
                    <select id="backgroundSelect" onChange={handleInput}>
                        <option>----</option>
                        <option value={"/img/grayCard.png"}>Gray</option>
                        <option value={"/img/blueCard.png"}>Blue</option>
                        <option value={"/img/redCard.png"}>Red</option>
                        <option value={"/img/greenCard.png"}>Green</option>
                        <option value={"/img/yellowCard.png"}>Gold</option>
                    </select>
                </div>
                <div>
                    STATS BACKGROUND<br></br>
                    <select id="statsBackgroundSelect" onChange={handleInput}>
                        <option>----</option>
                        <option value={"/img/statsBackgroundGray.png"}>Gray</option>
                        <option value={"/img/statsBackgroundBrown.png"}>Brown</option>
                        <option value={"/img/statsBackgroundYellow.png"}>Gold</option>
                        <option value={"/img/statsBackgroundShinyYellow.png"}>Shiny Gold</option>
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
                <div>
                <div className="pixelButton add"><p onClick={handleAddClick}>submit</p></div>
                </div>
            </div>
            <div className="card createCard" style={{backgroundImage: `url(${cardBackground})`}}>
                <div className="cardHeroImage" style={{backgroundImage: `url(${cardBorder})`}}>
                    <img src="/img/circleGray.png" className="circle"></img>
                    <span className="cost">{cost}</span>
                    <img className="characterImage" src={characterImage}></img>
                </div>
                <h2>{name}</h2>
                <div className="statsContainer" style={{backgroundImage: `url(${cardStatsBackground})`}} >
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
        </div>
    )
}