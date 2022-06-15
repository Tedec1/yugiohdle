import React, { useEffect, useState } from "react";
import { Card } from "../components";
import { callApi } from "../util/api";

import "./Home.css";
// import lineUp from "../util/lineUp.json";
import * as obj from "../util/lineUp.json";

const START_DATE = "6/10/2022";
const { cardTypes, lineUp } = obj;
const Home = (props) => {
    const [monsters, setMonsters] = useState([]);
    const [cardOfDay, setCardOfDay] = useState({});
    const [input, setInput] = useState("");

    const onSearch = () => {
        return monsters.filter((m) => m?.name.startsWith(input));
    };

    function getNumberOfDays() {
        const date1 = new Date(START_DATE);
        const date2 = new Date();

        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;

        // Calculating the time difference between two dates
        const diffInTime = date2.getTime() - date1.getTime();

        // Calculating the no. of days between two dates
        const diffInDays = Math.floor(diffInTime / oneDay);
        console.log(diffInDays);
        return diffInDays;
    }

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
    useEffect(() => {
        const setUpMonsters = async () => {
            const index = getNumberOfDays() % lineUp.length;
            setCardOfDay(await callApi({ id: lineUp[index] }));
            console.log("cardOfDay :>> ", cardOfDay);
        };
        setUpMonsters();
    }, []);
    return (
        <div {...props} id="home">
            <div id="form-container">
                <div>Enter a Guess</div>
                <input onChange={handleInput}></input>
                {cardOfDay && cardOfDay.length ? (
                    <Card {...cardOfDay[0]} />
                ) : null}
            </div>
        </div>
    );
};

export default Home;
