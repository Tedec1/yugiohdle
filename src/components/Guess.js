import React, { useContext, useEffect } from "react";
import { cardOfTheDayContext } from "../pages/Home";
import "./Guess.css";
const Guess = ({ monster, ...props }) => {
    // console.log(monster);
    let cardOfDay = useContext(cardOfTheDayContext);
    useEffect(() => {
        console.log(cardOfDay);
    }, [cardOfDay]);
    return (
        <div className="guess">
            <div className="name">{monster.name}</div>
            <div className="atk">{monster?.atk}</div>
            <div className="def">{monster?.def}</div>
            <div className="attr">{monster?.attribute || "?"}</div>
            <div className="lvl">{monster?.level || "?"}</div>
            {/* <div className="card-sets">
                {monster.card_sets &&
                    monster.card_sets.map((set) => (
                        <div className="card-set">{set.set_name}</div>
                    ))}
            </div> */}
        </div>
    );
};

export default Guess;
