import React, { useEffect, useState } from "react";
import './CreateCard.scss'
import { useNavigate, useParams } from "react-router-dom";
import { getCardById } from "../../modules/cardManager";

export const EditCard = () => {
    const [card, setCard] = useState(
        {
            name: "",
            damage: "",
            hitPoints: "",
            cost: "",
            backgroundColor: "",
            borderColor: "",
            statsBackgroundColor: "",
            image: "",
        }
    )

    const navigate = useNavigate()
    let { cardId } = useParams()

    useEffect(() => {
        getCardById(cardId).then(data => setCard(data))
    }, [])

    const handleInput = event => {
        switch (event.target.id) {
            case "cost":
                if (parseInt(event.target.value) > 9) {
  
                }
                else {
        
                }
                break;
            case "backgroundSelect":

                break;
            case "borderSelect":

                break;
            case "statsBackgroundSelect":

                break;
            case "name":

                break;
            case "characterImage":
      
                break;
        }
    }

    const handleAddClick = () => {
        // const card = {
        //     name: name,
        //     damage: 0,
        //     hitPoints: 0,
        //     cost: cost,
        //     backgroundColor: cardBackground,
        //     borderColor: cardBorder,
        //     statsBackgroundColor: cardStatsBackground,
        //     image: characterImage,
        // }
    }

    return (
        <div className="create-container">
            <div>
                <div>
                    Character <br></br>
                    <select id="characterImage" onChange={handleInput}>
                        <option>----</option>
                        <option value={"../../img/samurai.webp"}>The Ronin</option>
                        <option value={"../../img/wizardCard2.png"}>The Arcanist</option>
                        <option value={"../../img/highwaymanCard.png"}>Highwayman</option>
                    </select>
                </div>
                <div>
                    BORDER <br></br>
                    <select id="borderSelect" onChange={handleInput}>
                        <option>----</option>
                        <option value={"../../img/yellowCardBorder.png"}>Gold</option>
                        <option value={"../../img/silverCardBorder.png"}>Silver</option>
                        <option value={"../../img/brownCardBorder.png"}>Brown</option>
                    </select>
                </div>
                <div>
                    BACKGROUND<br></br>
                    <select id="backgroundSelect" onChange={handleInput}>
                        <option>----</option>
                        <option value={"../../img/grayCard.png"}>Gray</option>
                        <option value={"../../img/blueCard.png"}>Blue</option>
                        <option value={"../../img/redCard.png"}>Red</option>
                        <option value={"../../img/greenCard.png"}>Green</option>
                        <option value={"../../img/yellowCard.png"}>Gold</option>
                    </select>
                </div>
                <div>
                    STATS BACKGROUND<br></br>
                    <select id="statsBackgroundSelect" onChange={handleInput}>
                        <option>----</option>
                        <option value={"../../img/statsBackgroundGray.png"}>Gray</option>
                        <option value={"../../img/statsBackgroundBrown.png"}>Brown</option>
                        <option value={"../../img/statsBackgroundYellow.png"}>Gold</option>
                        <option value={"../../img/statsBackgroundShinyYellow.png"}>Shiny Gold</option>
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
                    <button onClick={handleAddClick}>Submit</button>
                </div>
            </div>
            <div className="card" style={{ backgroundImage: `url(../${card.backgroundColor})` }}>
                <div className="cardHeroImage" style={{ backgroundImage: `url(../${card.borderColor})` }}>
                    <img src="../../img/circleGray.png" className="circle"></img>
                    <span className="cost">{card.cost}</span>
                    <img className="characterImage" src={`../${card.image}`}></img>
                </div>
                <h2>{card.name}</h2>
                <div className="statsContainer" style={{ backgroundImage: `url(../${card.statsBackgroundColor})` }} >
                    <div className="stats">
                        <img src="../../img/cardDmg.png"></img>
                    </div>
                    <div className="stats">
                        <img src="../../img/cardArmor.png"></img>
                    </div>
                    <div className="stats">
                        <img src="../../img/cardHp.png"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}