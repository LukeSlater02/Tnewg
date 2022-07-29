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
                setCost(event.target.value)
            }
        }
        if (event.target.id === "name") {
            setName(event.target.value)
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

    const submitButtonVisible = () => {
        while (cardBackground === "" || cardBorder === "" || cardStatsBackground === "" || characterImage === "" || name === "" || cost === "") {
            return (
                <>
                    <p style={{ fontFamily: "VT323", fontSize: "30px" }}>Please select/input a value for all fields.</p>
                </>
            )
        }
        {
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
                                </div></> : ""
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
                    {/* <select id="backgroundSelect" onChange={handleSelect}>
                        <option>----</option>
                        <option value={"/img/grayCard.png"}>Gray</option>
                        <option value={"/img/blueCard.png"}>Blue</option>
                        <option value={"/img/redCard.png"}>Red</option>
                        <option value={"/img/greenCard.png"}>Green</option>
                        <option value={"/img/yellowCard.png"}>Gold</option>
                    </select> */}
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
            </div>
            <div>
                <div>
                    STATS BACKGROUND<br></br>
                    {/* <select id="statsBackgroundSelect" onChange={handleSelect}>
                        <option>----</option>
                        <option value={"/img/statsBackgroundGray.png"}>Gray</option>
                        <option value={"/img/statsBackgroundBrown.png"}>Brown</option>
                        <option value={"/img/statsBackgroundYellow.png"}>Gold</option>
                        <option value={"/img/statsBackgroundShinyYellow.png"}>Shiny Gold</option>
                    </select> */}
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
                <div>
                    NAME<br></br>
                    <input id="name" onChange={handleSelect} maxLength={13} />
                </div>
                <div>
                    Cost<br></br>
                    <input id="cost" type="number" max={9} onChange={handleSelect} />
                </div>
                <div>
                    {submitButtonVisible()}
                </div>
            </div>
            <div className="card createCard" style={{ backgroundImage: `url(/img/${`${`${cardBackground}Card.png`}` || "basecardbackground.png"})` }}>
                <div className="cardHeroImage" style={{ backgroundImage: `url(/img/${`${cardBorder}CardBorder.png` || "baseCardBorder.png"})` }}>
                    <img src="/img/circleGray.png" className="circle"></img>
                    <span className="cost">{cost}</span>
                    <img className="characterImage" src={`/img/${characterImage}.png`}></img>
                </div>
                <h2>{name || "Name"}</h2>
                <div className="statsContainer" style={{ backgroundImage: `url(/img/statsBackground${cardStatsBackground}.png)` }} >
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