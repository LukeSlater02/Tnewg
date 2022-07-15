import React, { useState } from "react";
import { Sprite, Boundry } from '../introMap/classes.js'
import './battleMap.scss'

export const BattleMap = () => {
    const [cursor, setCursor] = useState('url(img/cardTarget.png), auto')


    const changeCursor = () => {
        setCursor(prevState => {
            if (prevState === 'url(img/cardTarget.png), auto') {
                return 'pointer';
            }
            return 'url(img/cardTarget.png), auto';
        });
    }

    return (
        <div className="battle-background" style={{ cursor: cursor }}>
            <div className="playerHand">

                <div className="card">
                    <div className="cardHeroImage">
                        <img src="img/wizardCard.png"></img>
                    </div>
                    <div className="statsContainer">
                        <div className="stats">
                            <img src="img/cardDmg.png"></img> 
                        </div>
                        <div className="stats">
                            <img src="img/cardArmor.png"></img> 
                        </div>
                        <div className="stats">
                            <img src="img/cardHp.png"></img> 
                        </div>
                    </div>
                    <h2>Dark Mage</h2>
                </div>

                <div className="card">
                    <div className="cardHeroImage">
                        <img src="img/pose1.png"></img>
                    </div>
                    <div className="statsContainer">
                        <div className="stats">
                            <img src="img/cardDmg.png"></img>
                        </div>
                        <div className="stats">
                            <img src="img/cardArmor.png"></img>
                        </div>
                        <div className="stats">
                            <img src="img/cardHp.png"></img>
                        </div>
                    </div>
                    <h2>Valiant Knight</h2>
                </div>
            </div>
        </div>
    )
}