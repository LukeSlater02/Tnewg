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
    const [borderColorSelectedDisplay, setborderColorSelectedDisplay] = useState(false)
    const [characterImageSelectedDisplay, setCharacterImageSelectedDisplay] = useState(false)
    const [backgroundSelectedDisplay, setBackgroundSelectedDisplay] = useState(false)
    const [statsBackgroundSelectedDisplay, setStatsBackgroundSelectedDisplay] = useState(false)
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
        let value = event.target.attributes.value.value
        if (event.target.id.includes("characterImage")) {
            let imgUrl = event.target.id.split(" ")[1]
            event.stopPropagation()
            newCard.image = imgUrl
            setCharacterImageSelectedDisplay(value)
            setCharacterImageSelected(false)
            imageSelect.current.classList.remove("active")
        }
        if (event.target.id.includes("borderColor")) {
            let imgUrl = event.target.id.split(" ")[1]
            event.stopPropagation()
            newCard.borderColor = imgUrl
            setborderColorSelectedDisplay(value)
            setborderColorSelected(false)
            borderSelect.current.classList.remove("active")
        }
        if (event.target.id.includes("statsBackground")) {
            let imgUrl = event.target.id.split(" ")[1]
            event.stopPropagation()
            newCard.statsBackgroundColor = imgUrl
            setStatsBackgroundSelectedDisplay(value)
            setStatsBackgroundSelected(false)
            statsBackgroundSelect.current.classList.remove("active")
        }
        if (event.target.id.includes("backgroundColor")) {
            let imgUrl = event.target.id.split(" ")[1]
            event.stopPropagation()
            newCard.backgroundColor = imgUrl
            setBackgroundSelectedDisplay(value)
            setBackgroundSelected(false)
            backgroundSelect.current.classList.remove("active")
        }
        if (event.target.id === "cost") {
            if (parseInt(event.target.value) > 9) {
                newCard.cost = 9
            }
            else {
                newCard.cost = event.target.value
            }
        }
        if (event.target.id === "name") {
            newCard.name = event.target.value
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
                                <div className="option" id="characterImage Warlock" value={"warlock"} onClick={handleSelect}>
                                    <span value={"warlock"} id="characterImage Warlock">Warlock</span>
                                </div>
                                <div className="option" id="characterImage Wizard" value={"wizard"} onClick={handleSelect}>
                                    <span value={"wizard"} id="characterImage Wizard">Wizard</span>
                                </div>
                                <div className="option" id="characterImage Paladin" value={"paladin"} onClick={handleSelect}>
                                    <span value={"paladin"} id="characterImage Paladin">Paladin</span>
                                </div>
                                <div className="option" id="characterImage Druid" value={"druid"} onClick={handleSelect}>
                                    <span value={"druid"} id="characterImage Druid">Druid</span>
                                </div>
                                <div className="option" id="characterImage Lich" value={"lich"} onClick={handleSelect}>
                                    <span id="characterImage Lich" value={"lich"}>Lich</span>
                                </div>
                                <div className="option" value={"orc"} id="characterImage Orc" onClick={handleSelect}>
                                    <span value={"orc"} id="characterImage Orc">Orc</span>
                                </div>
                                <div className="option" value={"sphinx"} id="characterImage Sphinx" onClick={handleSelect}>
                                    <span value={"sphinx"} id="characterImage Sphinx">Sphinx</span>
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
                            {characterImageSelectedDisplay || "----"}
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
                            {borderColorSelectedDisplay || "----"}
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
                            {backgroundSelectedDisplay || "----"}
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
                                <div className="option" id="statsBackground Gray" value={"VALUE"} onClick={(event) => {
                                    event.stopPropagation();
                                    console.log("Div");
                                    console.log(event.target)
                                    console.log(event.target.value);
                                    console.log("currentTarget:", event.currentTarget.value);
                                    console.log();
                                }}>
                                    <span id="statsBackground Gray" value={"VALUE"} onClick={(event) => {
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
                            {statsBackgroundSelectedDisplay || "----"}
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