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
            backgroundColor: `/img/${cardBackground}Card.png`,
            borderColor: `/img/${cardBorder}CardBorder.png`,
            statsBackgroundColor: `/img/statsBackground${cardStatsBackground}.png`,
            image: `/img/${characterImage}.png`,
        }
        addCard(card).then(() => navigate("/cards/list"))
    }

    const submitButtonVisible = () => {
        while (cardBackground === "" || cardBorder === "" || cardStatsBackground === "" || characterImage === "" || name === "Name" || name === "" || cost === "" || cost === 0) {
            return (
                <>
                    <p style={{ fontFamily: "VT323", fontSize: "30px" }}>Please select/input a value for all fields.</p>
                </>
            )
        }

        return (
            <>
                <div className="pixelButton add"><p onClick={handleAddClick}>submit</p></div>
            </>
        )
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
                                <div className="option" value={"swordsman"} id="characterImage Swordsman" onClick={handleSelect}>
                                    <span value={"swordsman"} id="characterImage Swordsman">Swordsman</span>
                                </div>
                                <div className="option" value={"seraphine"} id="characterImage Seraphine" onClick={handleSelect}>
                                    <span value={"seraphine"} id="characterImage Seraphine">Seraphine</span>
                                </div>
                                <div className="option" value={"minotaur"} id="characterImage Minotaur" onClick={handleSelect}>
                                    <span value={"minotaur"} id="characterImage Minotaur">Minotaur</span>
                                </div>
                                <div className="option" value={"devil"} id="characterImage Devil" onClick={handleSelect}>
                                    <span value={"devil"} id="characterImage Devil">Devil</span>
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
                                <div className="option" value={"Gold"} id="borderColor Gold" onClick={handleSelect}>
                                    <span value={"Gold"} id="borderColor Gold">Gold</span>
                                </div>
                                <div className="option" value={"Brown"} id="borderColor Brown" onClick={handleSelect}>
                                    <span value={"Brown"} id="borderColor Brown">Brown</span>
                                </div>
                                <div className="option" value={"Silver"} id="borderColor Silver" onClick={handleSelect}>
                                    <span value={"Silver"} id="borderColor Silver">Silver</span>
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
                                <div className="option" value={"Gray"} id="backgroundColor Gray" onClick={handleSelect}>
                                    <span value={"Gray"} id="backgroundColor Gray">Gray</span>
                                </div>
                                <div className="option" value={"Blue"} id="backgroundColor Blue" onClick={handleSelect}>
                                    <span value={"Blue"} id="backgroundColor Blue">Blue</span>
                                </div>
                                <div className="option" value={"Red"} id="backgroundColor Red" onClick={handleSelect}>
                                    <span value={"Red"} id="backgroundColor Red">Red</span>
                                </div>
                                <div className="option" value={"Green"} id="backgroundColor Green" onClick={handleSelect}>
                                    <span value={"Green"} id="backgroundColor Green">Green</span>
                                </div>
                                <div className="option" value={"Gold"} id="backgroundColor Gold" onClick={handleSelect}>
                                    <span value={"Gold"} id="backgroundColor Gold">Gold</span>
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
                                <div className="option" value={"Gray"} id="statsBackground Gray" onClick={handleSelect}>
                                    <span value={"Gray"} id="statsBackground Gray" onClick={handleSelect}>Gray</span>
                                </div>
                                <div className="option" value={"Brown"} id="statsBackground Brown" onClick={handleSelect}>
                                    <span value={"Brown"} id="statsBackground Brown">Brown</span>
                                </div>
                                <div className="option" value={"Gold"} id="statsBackground Gold" onClick={handleSelect}>
                                    <span value={"Gold"} id="statsBackground Gold">Gold</span>
                                </div>
                                <div className="option" value={"Shiny Gold"} id="statsBackground Shiny Gold" onClick={handleSelect}>
                                    <span value={"Shiny Gold"} id="statsBackground Shiny Gold">Shiny Gold</span>
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
                    <input id="name" onChange={handleSelect} value={card.name} maxLength={13} />
                </div>
                <div>
                    Cost<br></br>
                    <input id="cost" type="number" max={9} value={card.cost} onChange={handleSelect} />
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