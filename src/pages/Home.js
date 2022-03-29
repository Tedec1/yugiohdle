import React, { useEffect, useState } from "react";
import { Card } from "../components";
import { callApi } from "../util/api";
import "./Home.css";
// import lineUp from "../util/lineUp.json";
import * as obj from "../util/lineUp.json";
const { cardTypes, lineUp } = obj;
const Home = (props) => {
    const [monsters, setMonsters] = useState([]);
    const [cardOfDay, setCardOfDay] = useState(null);
    const [input, setInput] = useState("");

    const vaildCardType = (val) => {
        return cardTypes.reduce((acc, n) => {
            if (n === val) acc = true;
            return acc;
        }, false);
    };

    const populateMonsters = async () => {
        try {
            // setInput(vaildCardType(input) ? input : "normal monster");
            const data = await callApi({
                type: input,
            });
            setMonsters(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    const getAllMonsters = async () => {
        console.log(
            cardTypes.slice(0, Math.round(cardTypes.length / 2)).join(",")
        );
        // const arrOfM = [];

        setInput(shuffle(cardTypes).join(","));

        populateMonsters();

        // setMonsters(arrOfM);
    };

    const setMonstersToList = () => {
        setMonsters(lineUp.slice(0, Math.round(lineUp.length / 4)));
    };

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    const handleInput = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };
    // useEffect(() => {
    // const offset = new Date("March 28, 2022 12:17:00");
    // const current = new Date();
    // const index =
    //     (current.getSeconds() - offset.getSeconds()) % lineUp.length || 4;
    // console.log(index);
    // setCardOfDay(monsters[index])
    // });
    return (
        <div {...props} id="home">
            <div id="form-container">
                <div>enter a card type</div>
                <input onChange={handleInput}></input>
                <button onClick={() => populateMonsters()}>submit</button>
                <button onClick={() => setMonstersToList()}>
                    set monsters to shuffled list
                </button>

                <button onClick={() => getAllMonsters()}>getAllMonsters</button>
                <button onClick={() => shuffleMonsters()}>
                    shuffle dem monsters
                </button>
            </div>
            {cardOfDay && <Card key={cardOfDay?.id} {...cardOfDay} />}
            <div id="container">
                {monsters &&
                    monsters.map((c, i) =>
                        c.id ? <Card key={i} {...c} /> : <Card key={i} id={c} />
                    )}
            </div>
        </div>
    );
};

export default Home;
