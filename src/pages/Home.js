import React, { useEffect, useState } from 'react'
import { Card } from '../components'
import { callApi } from '../util/api'
import './Home.css'
import lineUp from '../util/lineUp.json'
const Home = (props) => {
    const [monsters,setMonsters] = useState([])
    const [cardOfDay, setCardOfDay] = useState(null);
    const [input, setInput] = useState("")
    const populateMonsters = async () => {
        try {
            const data = await callApi({
                type:(input || "Normal Monster")
            })
            setMonsters(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
    const handleInput = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }
    useEffect(()=>{
        const offset = new Date("March 28, 2022 12:17:00")
        const current = new Date()
        const index = (current.getSeconds() - offset.getSeconds()) % lineUp.length || 4
        // console.log(index);
        // setCardOfDay(monsters[index])
    })
  return (
    <div {...props} id="home">
        <div id='form-container'>
            <div>enter a card type</div>
            <input onChange={handleInput}>
            </input>
            <button onClick={() => populateMonsters()}>
                submit
            </button>
        </div>
            {
                cardOfDay && <Card key={cardOfDay?.id} {...cardOfDay}/>
            }
        <div id='container'>
            {
                monsters && monsters.map((c) => <Card key={c?.id} {...c}/>)
            }
        </div>
    </div>
  )
}

export default Home