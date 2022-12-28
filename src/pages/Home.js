import React, { useContext, useEffect, useState } from "react";
import { Card, Guess } from "../components";
import { callApi, getNumberOfDays, shuffle } from "../util";
import logo from  '../util/yu-gi-oh-logo.jpg'
import "./Home.css";
// import * as obj from "../util/lineUp.json";
const obj = require("../util/lineUp.json")
import { Autocomplete, Button, TextField } from "@mui/material";
export const cardOfTheDayContext = React.createContext({});
const { cardTypes, lineUp } = obj;
const Home = (props) => {
    const [cardOfDay, setCardOfDay] = useState({});
    const [input, setInput] = useState("");
    const [options, setOptions] = useState([]);
    const [monsterList, setMonsterList] = useState([])
    const [guesses, setGuesses] = useState([])
    const [gameOver,setGameOver] = useState(false)
    const getAllMonsters = async () => {
    
        try {
            const data = await callApi({
                type: cardTypes.join(","),
            });

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
        if(input === cardOfDay[0].name){
            alert("YOU WON!")
            console.log("you won");
            setGameOver(true)
        }
        
    }
    return (
        <div {...props} id="home">
            <img className="title" src={logo} alt={"yu-gi-oh"}></img>
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
                
                    }}
                />
                <Button 
                onClick={handleSubmit}
                disabled={gameOver}
                >Submit</Button>
    
                <cardOfTheDayContext.Provider value={cardOfDay}>
                    <div className="guess-container">
                        <Guess
                            isTitle={true}
                            monster={{
                                name: "NAME",
                                atk: "ATK",
                                def: "DEF",
                                attribute: "ATTR",
                                level: "LVL",
                            }}
                        />
                        {/* <Guess
                            monster={
                                cardOfDay[0]
                                    ? cardOfDay[0]
                                    : { name: "loading" }
                            }
                        /> */}
                        {
                        guesses && guesses.length ? guesses.map( (g,i) => <Guess key={i} monster={g}/>) : <div style={{textAlign:"center"}}> Guesses go here </div> 
                        }
                    </div>
                </cardOfTheDayContext.Provider>
            </div>
            <div className="footer">
                a side project by Jasper Mesenbrink
            </div>
        </div>
    );
};

export default Home;
