import React, { useEffect, useState, useRef } from "react";
import './CreateCard.scss'
import { useNavigate, useParams } from "react-router-dom";
import { getCardById, editCard } from "../../modules/cardManager";

export const EditCard = () => {
    const [card, setCard] = useState(
        {
            name: "",
            damage: 0,
            hitPoints: 0,
            cost: 0,
            backgroundColor: "",
            borderColor: "",
            statsBackgroundColor: "",
            image: "",
        }
    )
    const [borderColorSelectedDisplay, setborderColorSelectedDisplay] = useState("")
    const [characterImageSelectedDisplay, setCharacterImageSelectedDisplay] = useState("")
    const [backgroundSelectedDisplay, setBackgroundSelectedDisplay] = useState("")
    const [statsBackgroundSelectedDisplay, setStatsBackgroundSelectedDisplay] = useState("")
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

    const handleInput = event => {
        let newCard = { ...card }
        let value = event.target.attributes.value.value
        if (event.target.id.includes("characterImage")) {
            let imgUrl = event.target.id.split(" ")[1]
            event.stopPropagation()
            newCard.image = `/img/${imgUrl}.png`
            setCharacterImageSelectedDisplay(value)
            setCharacterImageSelected(false)
            imageSelect.current.classList.remove("active")
        }
        if (event.target.id.includes("borderColor")) {
            let imgUrl = event.target.id.split(" ")[1]
            event.stopPropagation()
            newCard.borderColor = `/img/${imgUrl}CardBorder.png`
            setborderColorSelectedDisplay(value)
            setborderColorSelected(false)
            borderSelect.current.classList.remove("active")
        }
        if (event.target.id.includes("statsBackground")) {
            let imgUrl = event.target.id.split(" ")[1]
            event.stopPropagation()
            newCard.statsBackgroundColor = `/img/statsBackground${imgUrl}.png`
            setStatsBackgroundSelectedDisplay(value)
            setStatsBackgroundSelected(false)
            statsBackgroundSelect.current.classList.remove("active")
        }
        if (event.target.id.includes("backgroundColor")) {
            let imgUrl = event.target.id.split(" ")[1]
            event.stopPropagation()
            newCard.backgroundColor = `/img/${imgUrl}Card.png`
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
        if (event.target.id === "damage") {
            newCard.damage = event.target.value
        }
        if (event.target.id === "hitPoints") {
            newCard.hitPoints = event.target.value
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
                                <div className="option" id="characterImage Warlock" value={"warlock"} onClick={handleInput}>
                                    <span value={"warlock"} id="characterImage Warlock">Warlock</span>
                                </div>
                                <div className="option" id="characterImage Wizard" value={"wizard"} onClick={handleInput}>
                                    <span value={"wizard"} id="characterImage Wizard">Wizard</span>
                                </div>
                                <div className="option" id="characterImage Paladin" value={"paladin"} onClick={handleInput}>
                                    <span value={"paladin"} id="characterImage Paladin">Paladin</span>
                                </div>
                                <div className="option" id="characterImage Druid" value={"druid"} onClick={handleInput}>
                                    <span value={"druid"} id="characterImage Druid">Druid</span>
                                </div>
                                <div className="option" id="characterImage Lich" value={"lich"} onClick={handleInput}>
                                    <span id="characterImage Lich" value={"lich"}>Lich</span>
                                </div>
                                <div className="option" value={"orc"} id="characterImage Orc" onClick={handleInput}>
                                    <span value={"orc"} id="characterImage Orc">Orc</span>
                                </div>
                                <div className="option" value={"sphinx"} id="characterImage Sphinx" onClick={handleInput}>
                                    <span value={"sphinx"} id="characterImage Sphinx">Sphinx</span>
                                </div>
                                <div className="option" value={"swordsman"} id="characterImage Swordsman" onClick={handleInput}>
                                    <span value={"swordsman"} id="characterImage Swordsman">Swordsman</span>
                                </div>
                                <div className="option" value={"seraphine"} id="characterImage Seraphine" onClick={handleInput}>
                                    <span value={"seraphine"} id="characterImage Seraphine">Seraphine</span>
                                </div>
                                <div className="option" value={"minotaur"} id="characterImage Minotaur" onClick={handleInput}>
                                    <span value={"minotaur"} id="characterImage Minotaur">Minotaur</span>
                                </div>
                                <div className="option" value={"devil"} id="characterImage Devil" onClick={handleInput}>
                                    <span value={"devil"} id="characterImage Devil">Devil</span>
                                </div></> : ""
                            }
                        </div>
                        <div className="selected" onClick={() => {
                            imageSelect.current.classList.toggle("active")
                            setCharacterImageSelected(!characterImageSelected)
                        }}>
                            {characterImageSelectedDisplay || card?.image?.split("g/")[1]?.split(".")[0]}
                        </div>
                    </div>
                </div>
                <div>
                    BORDER <br></br>
                    <div className="selectBox">
                        <div className="optionsContainer" ref={borderSelect}>
                            {borderColorSelected ? <>
                                <div className="option" value={"Gold"} id="borderColor Gold" onClick={handleInput}>
                                    <span value={"Gold"} id="borderColor Gold">Gold</span>
                                </div>
                                <div className="option" value={"Brown"} id="borderColor Brown" onClick={handleInput}>
                                    <span value={"Brown"} id="borderColor Brown">Brown</span>
                                </div>
                                <div className="option" value={"Silver"} id="borderColor Silver" onClick={handleInput}>
                                    <span value={"Silver"} id="borderColor Silver">Silver</span>
                                </div>
                            </> : ""
                            }
                        </div>
                        <div className="selected" onClick={() => {
                            borderSelect.current.classList.toggle("active")
                            setborderColorSelected(!borderColorSelected)
                        }}>
                            {borderColorSelectedDisplay || card?.borderColor?.split("g/")[1]?.split("Card")[0]}
                        </div>
                    </div>
                </div>
                <div>
                    NAME<br></br>
                    <input id="name" onChange={handleInput} value={card.name} maxLength={13} />
                </div>
                <div>
                    Cost<br></br>
                    <input id="cost" type="number" max={9} value={card.cost} onChange={handleInput} />
                </div>
            </div>
            <div>
                <div>
                    BACKGROUND<br></br>
                    <div className="selectBox">
                        <div className="optionsContainer" ref={backgroundSelect}>
                            {backgroundSelected ? <>
                                <div className="option" value={"Gray"} id="backgroundColor Gray" onClick={handleInput}>
                                    <span value={"Gray"} id="backgroundColor Gray">Gray</span>
                                </div>
                                <div className="option" value={"Blue"} id="backgroundColor Blue" onClick={handleInput}>
                                    <span value={"Blue"} id="backgroundColor Blue">Blue</span>
                                </div>
                                <div className="option" value={"Red"} id="backgroundColor Red" onClick={handleInput}>
                                    <span value={"Red"} id="backgroundColor Red">Red</span>
                                </div>
                                <div className="option" value={"Green"} id="backgroundColor Green" onClick={handleInput}>
                                    <span value={"Green"} id="backgroundColor Green">Green</span>
                                </div>
                                <div className="option" value={"Gold"} id="backgroundColor Gold" onClick={handleInput}>
                                    <span value={"Gold"} id="backgroundColor Gold">Gold</span>
                                </div></> : ""
                            }
                        </div>
                        <div className="selected" onClick={() => {
                            backgroundSelect.current.classList.toggle("active")
                            setBackgroundSelected(!backgroundSelected)
                        }}>
                            {backgroundSelectedDisplay || card?.backgroundColor?.split("g/")[1]?.split("Card")[0]}
                        </div>
                    </div>
                </div>
                <div>
                    STATS BACKGROUND<br></br>
                    <div className="selectBox">
                        <div className="optionsContainer" ref={statsBackgroundSelect}>
                            {statsBackgroundSelected ? <>
                                <div className="option" value={"Gray"} id="statsBackground Gray" onClick={handleInput}>
                                    <span value={"Gray"} id="statsBackground Gray" onClick={handleInput}>Gray</span>
                                </div>
                                <div className="option" value={"Brown"} id="statsBackground Brown" onClick={handleInput}>
                                    <span value={"Brown"} id="statsBackground Brown">Brown</span>
                                </div>
                                <div className="option" value={"Gold"} id="statsBackground Gold" onClick={handleInput}>
                                    <span value={"Gold"} id="statsBackground Gold">Gold</span>
                                </div>
                                <div className="option" value={"Shiny Gold"} id="statsBackground Shiny Gold" onClick={handleInput}>
                                    <span value={"Shiny Gold"} id="statsBackground Shiny Gold">Shiny Gold</span>
                                </div></> : ""
                            }
                        </div>
                        <div className="selected" onClick={() => {
                            statsBackgroundSelect.current.classList.toggle("active")
                            setStatsBackgroundSelected(!statsBackgroundSelected)
                        }}>
                            {statsBackgroundSelectedDisplay || card?.statsBackgroundColor?.split("g/")[1]?.split("Background")[1]?.split(".png")[0]}
                        </div>
                    </div>
                </div>
                <div>
                    damage<br></br>
                    <input id="damage" type="number" max={9} value={card.damage} onChange={handleInput} />
                </div>
                <div>
                    hit Points<br></br>
                    <input id="hitPoints" type="number" max={9} value={card.hitPoints} onChange={handleInput} />
                </div>
                <div>
                    <div className="pixelButton add"><p onClick={handleAddClick}>submit</p></div>
                </div>
            </div>
            <div className="card createCard" style={{ backgroundImage: `url(${card.backgroundColor})` }}>
                <div className="cardHeroImage" style={{ backgroundImage: `url(${card.borderColor})` }}>
                    <img src="/img/circleGray.png" className="circle"></img>
                    <span className="cost">{card.cost}</span>
                    <img className="characterImage" src={card.image}></img>
                </div>
                <h2>{card.name || "Name"}</h2>
                <div className="statsContainer" style={{ backgroundImage: `url(${card.statsBackgroundColor})` }} >
                    <div className="stats">
                        <img src="/img/cardDmg.png"></img>{card.damage || 0}
                    </div>
                    <div className="stats">
                        <img src="/img/cardHp.png"></img>{card.hitPoints || 0}
                    </div>
                </div>
            </div>
        </div>
    )
}