import React, { useEffect, useState, useRef } from "react";
import './CreateCard.scss'
import { useNavigate, useParams } from "react-router-dom";
import { getCardById, editCard } from "../../modules/cardManager";

export const EditCard = () => {
    const [card, setCard] = useState(
        {
            name: "",
            damage: "",
            hitPoints: "",
            cost: 0,
            backgroundColor: "",
            backgroundDisplay: "",
            borderColor: "",
            borderDisplay: "",
            statsBackgroundColor: "",
            statsBackgroundDisplay: "",
            image: "",
            imageDisplay: ""
        }
    )

    const [borderColorSelected, setborderColorSelected] = useState(false)
    const [characterImageSelected, setCharacterImageSelected] = useState(false)
    const [backgroundSelected, setBackgroundSelected] = useState(false)
    const [statsBackgroundSelected, setStatsBackgroundSelected] = useState(false)

    const imageSelect = useRef()
    const borderSelect = useRef()
    const backgroundSelect = useRef()
    const statsBackgroundSelect = useRef()

    const navigate = useNavigate()
    let { cardId } = useParams()

    useEffect(() => {
        getCardById(cardId).then(data => setCard(data))
    }, [])

    const handleSelect = event => {
        let newCard = { ...card }
        switch (event.target.id) {
            case "cost":
                if (parseInt(event.target.value) > 9 || event.target.value == "") {
                    newCard.cost = 0
                }
                else {
                    newCard.cost = parseInt(event.target.value)
                }
                break;
            case "backgroundSelect":
                newCard.backgroundColor = event.target.value
                break;
            case "borderSelect":
                newCard.borderColor = event.target.value
                break;
            case "statsBackgroundSelect":
                newCard.statsBackgroundColor = event.target.value
                break;
            case "name":
                newCard.name = event.target.value
                break;
            case "characterImage":
                newCard.image = event.target.value
                break;
        }
        setCard(newCard)
    }

    const handleAddClick = () => {
        editCard(card, card.id).then(() => navigate("/cards/list"))
    }

    return (
        <div className="create-container">
            <div>
                <div>
                    Character <br></br>
                    <div className="selectBox">
                        <div className="optionsContainer" ref={imageSelect}>
                            {characterImageSelected ? <>
                                <div className="option" id="characterImage Warlock" onClick={handleSelect}>
                                    <span id="characterImage Warlock">Warlock</span>
                                </div>
                                <div className="option" id="characterImage Wizard" onClick={handleSelect}>
                                    <span id="characterImage Wizard">Wizard</span>
                                </div>
                                <div className="option" id="characterImage Paladin" onClick={handleSelect}>
                                    <span id="characterImage Paladin">Paladin</span>
                                </div>
                                <div className="option" id="characterImage Druid" onClick={handleSelect}>
                                    <span id="characterImage Druid">Druid</span>
                                </div>
                                <div className="option" id="characterImage Lich" onClick={handleSelect}>
                                    <span id="characterImage Lich">Lich</span>
                                </div>
                                <div className="option" id="characterImage Orc" onClick={handleSelect}>
                                    <span id="characterImage Orc">Orc</span>
                                </div>
                                <div className="option" id="characterImage Sphinx" onClick={handleSelect}>
                                    <span id="characterImage Sphinx">Sphinx</span>
                                </div>
                                <div className="option" id="characterImage Swordsman" onClick={handleSelect}>
                                    <span id="characterImage Swordsman">Swordsman</span>
                                </div>
                                <div className="option" id="characterImage Seraphine" onClick={handleSelect}>
                                    <span id="characterImage Seraphine">Seraphine</span>
                                </div>
                                <div className="option" id="characterImage Minotaur" onClick={handleSelect}>
                                    <span id="characterImage Minotaur">Minotaur</span>
                                </div>
                                <div className="option" id="characterImage Devil" onClick={handleSelect}>
                                    <span id="characterImage Devil">Devil</span>
                                </div></> : ""
                            }
                        </div>
                        <div className="selected" onClick={() => {
                            imageSelect.current.classList.toggle("active")
                            setCharacterImageSelected(!characterImageSelected)
                        }}>
                            {card.image || "----"}
                        </div>
                    </div>
                </div>
                <div>
                    BORDER <br></br>
                    <div className="selectBox">
                        <div className="optionsContainer" ref={borderSelect}>
                            {borderColorSelected ? <>
                                <div className="option" id="borderColor Gold" onClick={handleSelect}>
                                    <span id="borderColor Gold">Gold</span>
                                </div>
                                <div className="option" id="borderColor Brown" onClick={handleSelect}>
                                    <span id="borderColor Brown">Brown</span>
                                </div>
                                <div className="option" id="borderColor Silver" onClick={handleSelect}>
                                    <span id="borderColor Silver">Silver</span>
                                </div>
                            </> : ""
                            }
                        </div>
                        <div className="selected" onClick={() => {
                            borderSelect.current.classList.toggle("active")
                            setborderColorSelected(!borderColorSelected)
                        }}>
                            {card.borderColor || "----"}
                        </div>
                    </div>
                </div>
                <div>
                    BACKGROUND<br></br>
                    <div className="selectBox">
                        <div className="optionsContainer" ref={backgroundSelect}>
                            {backgroundSelected ? <>
                                <div className="option" id="backgroundColor Gray" onClick={handleSelect}>
                                    <span id="backgroundColor Gray">Gray</span>
                                </div>
                                <div className="option" id="backgroundColor Blue" onClick={handleSelect}>
                                    <span id="backgroundColor Blue">Blue</span>
                                </div>
                                <div className="option" id="backgroundColor Red" onClick={handleSelect}>
                                    <span id="backgroundColor Red">Red</span>
                                </div>
                                <div className="option" id="backgroundColor Green" onClick={handleSelect}>
                                    <span id="backgroundColor Green">Green</span>
                                </div>
                                <div className="option" id="backgroundColor Gold" onClick={handleSelect}>
                                    <span id="backgroundColor Gold">Gold</span>
                                </div></> : ""
                            }
                        </div>
                        <div className="selected" onClick={() => {
                            backgroundSelect.current.classList.toggle("active")
                            setBackgroundSelected(!backgroundSelected)
                        }}>
                            {card.backgroundColor || "----"}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    STATS BACKGROUND<br></br>
                    <div className="selectBox">
                        <div className="optionsContainer" ref={statsBackgroundSelect}>
                            {statsBackgroundSelected ? <>
                                <div className="option" id="statsBackground Gray" value={"VALUE" }onClick={(event) => {
                                    event.stopPropagation();
                                    console.log("Div");
                                    console.log(event.target)
                                    console.log(event.target.value);
                                    console.log("currentTarget:", event.currentTarget.value);
                                    console.log();
                                }}>
                                    <span id="statsBackground Gray" value={"VALUE" }onClick={(event) => {
                                        event.stopPropagation();
                                        console.log("Span");
                                        console.log(event.target.value);
                                        console.log("currentTarget:", event.currentTarget.value);
                                        console.log();
                                    }}>Gray</span>
                                </div>
                                <div className="option" id="statsBackground Brown" onClick={handleSelect}>
                                    <span id="statsBackground Brown">Brown</span>
                                </div>
                                <div className="option" id="statsBackground Gold" onClick={handleSelect}>
                                    <span id="statsBackground Gold">Gold</span>
                                </div>
                                <div className="option" id="statsBackground Shiny Gold" onClick={handleSelect}>
                                    <span id="statsBackground Shiny Gold">Shiny Gold</span>
                                </div></> : ""
                            }
                        </div>
                        <div className="selected" onClick={() => {
                            statsBackgroundSelect.current.classList.toggle("active")
                            setStatsBackgroundSelected(!statsBackgroundSelected)
                        }}>
                            {card.statsBackgroundColor || "----"}
                        </div>
                    </div>
                </div>
                <div>
                    NAME<br></br>
                    <input id="name" onChange={handleSelect} maxLength={13} />
                </div>
                <div>
                    Cost<br></br>
                    <input id="cost" type="number" max={9} onChange={handleSelect} />
                </div>
            </div>
            <div className="card createCard" style={{ backgroundImage: card.backgroundColor ? `url(/img/${`${card.backgroundColor}Card.png`}` : ' url(/img/basecardbackground.png)' }}>
                <div className="cardHeroImage" style={{ backgroundImage: card.borderColor ? `url(/img/${card.borderColor}CardBorder.png` : "url(/img/baseCardBorder.png)" }}>
                    <img src="/img/circleGray.png" className="circle"></img>
                    <span className="cost">{card.cost}</span>
                    {card.image ? <img className="characterImage" src={`/img/${card.image}.png`}></img> : ""}
                </div>
                <h2>{card.name || "Name"}</h2>
                <div className="statsContainer" style={{ backgroundImage: card.statsBackgroundColor ? `url(/img/statsBackground${card.statsBackgroundColor}.png` : "" }} >
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