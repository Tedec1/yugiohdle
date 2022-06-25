import React, { useEffect, useState } from "react";
import { Card } from "../components";
import { callApi, getNumberOfDays, shuffle } from "../util";

import "./Home.css";
// import lineUp from "../util/lineUp.json";
import * as obj from "../util/lineUp.json";
import { Autocomplete, TextField } from "@mui/material";

const { cardTypes, lineUp } = obj;
const Home = (props) => {
    const [monsters, setMonsters] = useState([]);
    const [cardOfDay, setCardOfDay] = useState({});
    const [input, setInput] = useState("");
    const [options, setOptions] = useState([]);
    // const onSearch = () => {
    //     return monsters.filter((m) => m?.name.startsWith(input));
    // };

    const populateMonsters = async (options) => {
        try {
            // setInput(vaildCardType(input) ? input : "normal monster");
            // console.log(input);
            const data = await callApi({
                type: !input.length ? cardTypes.join(",") : input,
            });
            setMonsters(data);
            // console.log("28");
            // console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    const setAutofillOptions = async () => {
        setOptions(
            monsters.reduce((acc, cur) => {
                acc.push(cur?.name);
                return acc;
            }, [])
        );
        // console.log(options);
    };
    const getAllMonsters = async () => {
        // console.log(
        //     cardTypes.slice(0, Math.round(cardTypes.length / 2)).join(",")
        // );

        // setInput(shuffle(cardTypes).join(","));

        await populateMonsters();

        await setAutofillOptions();
    };

    const setMonstersToList = () => {
        setMonsters(lineUp.slice(0, Math.round(lineUp.length / 4)));
    };

    const handleInput = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };
    useEffect(() => {
        const setUpMonsters = async () => {
            await getAllMonsters();
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
                <Autocomplete
                    disablePortal
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Monster" />
                    )}
                />
                {/* <input onChange={handleInput}></input> */}
                {cardOfDay && cardOfDay.length ? (
                    <Card {...cardOfDay[0]} />
                ) : null}
            </div>
        </div>
    );
};

export default Home;
