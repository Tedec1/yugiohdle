import React from "react";
import "./Guess.css";
const Guess = ({ cardOfTheDay, monster, ...props }) => {
    console.log(monster);

    return (
        <div className="guess">
            <div className="name">{monster.name}</div>
            <div className="atk">{monster?.atk || "?"}</div>
            <div className="def">{monster?.def || "?"}</div>
            <div className="attr">{monster?.attribute || "?"}</div>
            <div className="lvl">{monster?.level || "?"}</div>
            {/* <div className="card-sets">{monster.card-sets}</div> */}
        </div>
    );
};

export default Guess;
