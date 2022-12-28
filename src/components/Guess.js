import React, { useContext, useEffect, useState } from "react";
import { cardOfTheDayContext } from "../pages/Home";
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import "./Guess.css";
import { red, yellow } from "@mui/material/colors";
const Guess = ({ isTitle, monster, ...props }) => {
    // console.log(monster);
    let cardOfDay = useContext(cardOfTheDayContext);
    const [color, setColor] = useState("white")
    
    useEffect(()=>{
        const setUp = () =>{
            if(isTitle){
                return;
            }
            // if(cardOfDay[0]?.name === monster?.name)
            // {
            //     setColor("#7affa7")
            // }


            
        }
        setUp()
    },[])
    return (
        <div className="guess" style={{backgroundColor: color}}>
            <div className="guesschild name">
                {monster?.name}
            </div>
            <div className="guesschild atk">
                {monster?.atk}
                {
                    !isTitle && ( 
                    monster?.atk === cardOfDay[0]?.atk ? <CheckIcon color="success" /> :
                    monster?.atk >= cardOfDay[0]?.atk ? <KeyboardArrowDownIcon sx={{ color: yellow[600] }}/> :
                    monster?.atk <= cardOfDay[0]?.atk ? <KeyboardArrowUpIcon sx={{ color: yellow[600] }}/> :
                    <CloseIcon sx={{ color: red[600] }}/>)
                }
            </div>
            <div className="guesschild def">
                {monster?.def}
                {
                    !isTitle && ( 
                    monster?.def === cardOfDay[0]?.def ? <CheckIcon color="success" /> :
                    monster?.def >= cardOfDay[0]?.def ? <KeyboardArrowDownIcon sx={{ color: yellow[600] }}/> :
                    monster?.def <= cardOfDay[0]?.def ? <KeyboardArrowUpIcon sx={{ color: yellow[600] }}/> :
                    <CloseIcon sx={{ color: red[600] }}/>)
                }
            </div>
            <div className="guesschild attr">{monster?.attribute || "?"}
            {
                !isTitle && (
                    monster?.attribute === cardOfDay[0]?.attribute ?  <CheckIcon color="success" /> :
                    <CloseIcon sx={{ color: red[600] }}/>
                )
            }
            </div>
            <div className="guesschild lvl">{monster?.level || "?"}
            {
                    !isTitle && ( 
                    monster?.level === cardOfDay[0]?.level ? <CheckIcon color="success" /> :
                    monster?.level >= cardOfDay[0]?.level ? <KeyboardArrowDownIcon sx={{ color: yellow[600] }}/> :
                    monster?.level <= cardOfDay[0]?.level ? <KeyboardArrowUpIcon sx={{ color: yellow[600] }}/> :
                    <CloseIcon sx={{ color: red[600] }}/>)
                }
            </div>
        </div>
    );
};

export default Guess;
