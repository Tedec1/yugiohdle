import React, { useContext, useEffect, useState } from "react";
import { Card, Guess } from "../components";
import { callApi, getNumberOfDays, shuffle } from "../util";

import "./Home.css";
import * as obj from "../util/lineUp.json";
import { Autocomplete, Button, TextField } from "@mui/material";
export const cardOfTheDayContext = React.createContext({});
const { cardTypes, lineUp } = obj;
const Home = (props) => {
    const [cardOfDay, setCardOfDay] = useState({});
    const [input, setInput] = useState("");
    const [options, setOptions] = useState([]);
    const [monsterList, setMonsterList] = useState([])
    const [guesses, setGuesses] = useState([])
    const getAllMonsters = async () => {
        // console.log(cardTypes);
        try {
            const data = await callApi({
                type: cardTypes.join(","),
            });
            // console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
    /**
     * calls the api to get all monsters and add them to the autocomplete.
     */
    useEffect(() => {
        const setUpMonsters = async () => {
            console.log("useEffect is being run");
            const monsterList = await getAllMonsters();
            setMonsterList(monsterList)
            const names = monsterList.reduce((acc, cur) => {
                acc.push(cur?.name);
                return acc;
            }, []);
            setOptions(names);
            const index = getNumberOfDays() % lineUp.length;
            setCardOfDay(await callApi({ id: lineUp[index] }));
            console.log("cardOfDay :>> ", cardOfDay[0]);
        };
        setUpMonsters();
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault()
        if(input === "null") return;
        if(monsterList.length < 1) return;
        if(guesses.filter(g=>g.name === input).length > 0) return;
        console.log(monsterList);
        const Guess = monsterList.filter((m)=>m.name === input)[0]
        
        setGuesses(guesses.concat(Guess))
    }
    return (
        <div {...props} id="home">
            <div id="form-container">
                <div>Enter a Guess</div>
                <Autocomplete
                    disablePortal
                    loading={options.length < 1}
                    loadingText="Loading"
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Monster" />
                    )}
                    onChange={(e,v)=>{
                        setInput(v)
                        // console.log(v)
                    }}
                />
                <Button 
                onClick={handleSubmit}
                >Submit</Button>
    
                <cardOfTheDayContext.Provider value={cardOfDay}>
                    <div className="guess-container">
                        <Guess
                            monster={{
                                name: "NAME",
                                atk: "ATK",
                                def: "DEF",
                                attribute: "ATTR",
                                level: "LVL",
                                // card_sets: [{ set_name: "SETS" }],
                            }}
                        />
                        <Guess
                            monster={
                                cardOfDay[0]
                                    ? cardOfDay[0]
                                    : { name: "loading" }
                            }
                        />
                        {
                        guesses && guesses.length && guesses.map( (g,i) => <Guess key={i} monster={g}/>)
                        }
                    </div>
                </cardOfTheDayContext.Provider>
                {/* {cardOfDay && cardOfDay.length ? (
                    <Card {...cardOfDay[0]} />
                ) : null} */}
            </div>
        </div>
    );
};

export default Home;
