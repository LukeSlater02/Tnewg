import React, { useRef, useState } from "react";
import './CreateCard.scss'
import { addCard } from "../../modules/cardManager";
import { useNavigate } from "react-router-dom";
export const CreateCard = () => {
    const [name, setName] = useState("Name")
    const [cost, setCost] = useState(0)
    const [cardBackground, setCardBackground] = useState("")
    const [cardBorder, setCardBorder] = useState("")
    const [cardStatsBackground, setCardStatsBackground] = useState("")
    const [characterImage, setCharacterImage] = useState("")
    const [damage, setDamage] = useState(0)
    const [hitPoints, setHitPoints] = useState(0)

    const [borderColorSelected, setborderColorSelected] = useState(false)
    const [characterImageSelected, setCharacterImageSelected] = useState(false)
    const [backgroundSelected, setBackgroundSelected] = useState(false)
    const [statsBackgroundSelected, setStatsBackgroundSelected] = useState(false)

    const imageSelect = useRef()
    const borderSelect = useRef()
    const backgroundSelect = useRef()
    const statsBackgroundSelect = useRef()

    let navigate = useNavigate()

    const handleSelect = event => {
        if (event.target.id.includes("characterImage")) {
            let imgUrl = event.target.id.split(" ")[1]
            event.stopPropagation()
            setCharacterImage(imgUrl)
            setCharacterImageSelected(false)
            imageSelect.current.classList.remove("active")
        }
        if (event.target.id.includes("borderColor")) {
            let imgUrl = event.target.id.split(" ")[1]
            event.stopPropagation()
            setCardBorder(imgUrl)
            setborderColorSelected(false)
            borderSelect.current.classList.remove("active")
        }
        if (event.target.id.includes("statsBackground")) {
            let imgUrl = event.target.id.split(" ")[1]
            event.stopPropagation()
            setCardStatsBackground(imgUrl)
            setStatsBackgroundSelected(false)
            statsBackgroundSelect.current.classList.remove("active")
        }
        if (event.target.id.includes("backgroundColor")) {
            let imgUrl = event.target.id.split(" ")[1]
            event.stopPropagation()
            setCardBackground(imgUrl)
            setBackgroundSelected(false)
            backgroundSelect.current.classList.remove("active")
        }
        if (event.target.id === "cost") {
            if (parseInt(event.target.value) > 9) {
                setCost(9)
            }
            else {
                setCost(parseInt(event.target.value))
            }
        }
        if (event.target.id === "name") {
            setName(event.target.value)
        }
        if (event.target.id === "damage") {
            if (parseInt(event.target.value) > 9) {
                setDamage(9)
            }
            else {
                setDamage(parseInt(event.target.value))
            }
        }
        if (event.target.id === "hitPoints") {
            if (parseInt(event.target.value) > 9) {
                setHitPoints(9)
            }
            else {
                setHitPoints(parseInt(event.target.value))
            }
        }
    }

    const handleAddClick = () => {
        const card = {
            name: name,
            damage: damage,
            hitPoints: hitPoints,
            cost: cost,
            backgroundColor: `/img/${cardBackground}Card.png`,
            borderColor: `/img/${cardBorder}CardBorder.png`,
            statsBackgroundColor: `/img/statsBackground${cardStatsBackground}.png`,
            image: `/img/${characterImage}.png`,
        }
        addCard(card).then(() => navigate("/cards/list"))
    }

    const submitButtonVisible = () => {
        if (cardBackground === "" || cardBorder === "" || cardStatsBackground === "" || characterImage === "" || name === "Name" || name === "" || isNaN(cost) || cost === 0 || damage === 0 || isNaN(damage) || isNaN(hitPoints) || hitPoints === 0) {
            return (
                <>
                    <p style={{ fontFamily: "VT323", fontSize: "30px" }}>Please select/input a value for all fields.</p>
                </>
            )
        }
        else {
            return (
                <>
                    <div className="pixelButton add"><p onClick={handleAddClick}>submit</p></div>
                </>
            )
        }
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
                                </div>
                                <div className="option" id="characterImage Vampire" onClick={handleSelect}>
                                    <span id="characterImage Vampire">Vampire</span>
                                </div>
                            </> : ""
                            }
                        </div>
                        <div className="selected" onClick={() => {
                            imageSelect.current.classList.toggle("active")
                            setCharacterImageSelected(!characterImageSelected)
                        }}>
                            {characterImage || "----"}
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
                            {cardBorder || "----"}
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
                            {cardBackground || "----"}
                        </div>
                    </div>
                </div>
                <div>
                    STATS BACKGROUND<br></br>
                    <div className="selectBox">
                        <div className="optionsContainer" ref={statsBackgroundSelect}>
                            {statsBackgroundSelected ? <>
                                <div className="option" id="statsBackground Gray" onClick={handleSelect}>
                                    <span id="statsBackground Gray">Gray</span>
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
                            {cardStatsBackground || "----"}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    NAME<br></br>
                    <input id="name" onChange={handleSelect} maxLength={13} />
                </div>
                <div>
                    Cost<br></br>
                    <input id="cost" type="number" max={9} onChange={handleSelect} />
                </div>
                <div>
                    damage<br></br>
                    <input id="damage" type="number" max={9} onChange={handleSelect} />
                </div>
                <div>
                    hit points<br></br>
                    <input id="hitPoints" type="number" max={9} onChange={handleSelect} />
                </div>
                <div style={{width: "384px"}}>
                    {submitButtonVisible()}
                </div>
            </div>
            <div className="card createCard" style={{ backgroundImage: cardBackground ? `url(/img/${`${cardBackground}Card.png`}` : ' url(/img/basecardbackground.png)' }}>
                <div className="cardHeroImage" style={{ backgroundImage: cardBorder ? `url(/img/${cardBorder}CardBorder.png` : "url(/img/baseCardBorder.png)" }}>
                    <img src="/img/circleGray.png" className="circle"></img>
                    <span className="cost">{cost || 0}</span>
                    {characterImage ? <img className="characterImage" src={`/img/${characterImage}.png`}></img> : ""}
                </div>
                <h2>{name || "Name"}</h2>
                <div className="statsContainer" style={{ backgroundImage: cardStatsBackground ? `url(/img/statsBackground${cardStatsBackground}.png` : "" }} >
                    <div className="stats">
                        <img src="/img/cardDmg.png"></img>{damage || 0}
                    </div>
                    <div className="stats">
                        <img src="/img/cardHp.png"></img>{hitPoints || 0}
                    </div>
                </div>
            </div>
        </div>
    )
}