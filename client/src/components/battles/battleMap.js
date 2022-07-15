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
                        <img src="img/circleGray.png" className="circle"></img>
                        <span className="cost">6</span>
                        <img src="img/wizardCard2.png"></img>
                    </div>
                    <h2>The Arcanist</h2>
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
                </div>

                <div className="card">
                    <div className="cardHeroImage">
                    <img src="img/circleGray.png" className="circle"></img>
                        <span className="cost">3</span>
                        <img src="img/skeletonCard.png"></img>
                    </div>
                    <h2>Skeleton</h2>
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
                </div>
            </div>
        </div>
    )
}