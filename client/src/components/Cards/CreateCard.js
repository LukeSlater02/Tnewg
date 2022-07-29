import React, { useRef, useState } from "react";
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
        // switch (event.target.id) {
        //     case "cost":
        //         if (parseInt(event.target.value) > 9) {
        //             setCost(9)
        //         }
        //         else {
        //             setCost(event.target.value)
        //         }
        //         break;
        //     case "backgroundSelect":
        //         setCardBackground(event.target.value)
        //         break;
        //     case "borderSelect":
        //         setCardBorder(event.target.value)
        //         break;
        //     case "statsBackgroundSelect":
        //         setCardStatsBackground(event.target.value)
        //         break;
        //     case "name":
        //         setName(event.target.value)
        //         break;
        //     case "characterImage":
        //         event.stopPropagation()
        //         console.log("hello");
        //         setCharacterImage(event.target.value)
        //         break;
        // }
        if (event.target.id.includes("characterImage")) {
            let imgUrl = event.target.id.split(" ")[1]
            event.stopPropagation()
            setCharacterImage(imgUrl)
        }
        if (event.target.id.includes("characterImage")) {
            let imgUrl = event.target.id.split(" ")[1]
            event.stopPropagation()
            setCharacterImage(imgUrl)
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
        if (cardBackground === "" || cardBorder === "" || cardStatsBackground === "" || characterImage === "" || name === "" || cost === 0) {
            return (
                <>
                    <p>Please select/input a value for all fields.</p>
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
                    {/* <select id="characterImage" onChange={handleSelect}>
                        <option>----</option>
                        <option value={"/img/warlock.png"}>Warlock</option>
                        <option value={"/img/wizard.png"}>Wizard</option>
                        <option value={"/img/paladin.png"}>Paladin</option>
                        <option value={"/img/druid.png"}>Druid</option>
                        <option value={"/img/Vampire.png"}>Vampire</option>
                        <option value={"/img/Rogue.png"}>Rogue</option>
                        <option value={"/img/Lich.png"}>Lich</option>
                        <option value={"/img/Mimic.png"}>Mimic</option>
                        <option value={"/img/Spectre.png"}>Spectre</option>
                        <option value={"/img/Orc.png"}>Orc</option>

                    </select> */}

                </div>
                <div>
                    BORDER <br></br>
                    {/* <select id="borderSelect" onChange={handleSelect}>
                        <option>----</option>
                        <option value={"/img/yellowCardBorder.png"}>Gold</option>
                        <option value={"/img/silverCardBorder.png"}>Silver</option>
                        <option value={"/img/brownCardBorder.png"}>Brown</option>
                    </select> */}
                    <div className="selectBox">
                        <div className="optionsContainer" ref={borderSelect}>
                            {borderColorSelected ? <>
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
                                <div className="option" id="characterImage Warlock" onClick={handleSelect}>
                                    <span id="characterImage Warlock">Warlock</span>
                                </div>
                                <div className="option" id="characterImage Warlock" onClick={handleSelect}>
                                    <span id="characterImage Warlock">Warlock</span>
                                </div>
                                <div className="option" id="characterImage Warlock" onClick={handleSelect}>
                                    <span id="characterImage Warlock">Warlock</span>
                                </div>
                                <div className="option" id="characterImage Warlock" onClick={handleSelect}>
                                    <span id="characterImage Warlock">Warlock</span>
                                </div></> : ""
                            }
                        </div>
                        <div className="selected" onClick={() => {
                            backgroundSelect.current.classList.toggle("active")
                            setBackgroundSelected(!backgroundSelected)
                        }}>
                            {characterImage || "----"}
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
                                <div className="option" id="characterImage Warlock" onClick={handleSelect}>
                                    <span id="characterImage Warlock">Warlock</span>
                                </div>
                                <div className="option" id="characterImage Warlock" onClick={handleSelect}>
                                    <span id="characterImage Warlock">Warlock</span>
                                </div>
                                <div className="option" id="characterImage Warlock" onClick={handleSelect}>
                                    <span id="characterImage Warlock">Warlock</span>
                                </div>
                                <div className="option" id="characterImage Warlock" onClick={handleSelect}>
                                    <span id="characterImage Warlock">Warlock</span>
                                </div></> : ""
                            }
                        </div>
                        <div className="selected" onClick={() => {
                            statsBackgroundSelect.current.classList.toggle("active")
                            setStatsBackgroundSelected(!statsBackgroundSelected)
                        }}>
                            {characterImage || "----"}
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
            <div className="card createCard" style={{ backgroundImage: `url(${cardBackground})` }}>
                <div className="cardHeroImage" style={{ backgroundImage: `url(${cardBorder})` }}>
                    <img src="/img/circleGray.png" className="circle"></img>
                    <span className="cost">{cost}</span>
                    <img className="characterImage" src={`/img/${characterImage}.png`}></img>
                </div>
                <h2>{name}</h2>
                <div className="statsContainer" style={{ backgroundImage: `url(${cardStatsBackground})` }} >
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