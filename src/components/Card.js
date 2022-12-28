import React, { useEffect } from "react";
/**
 * 
 * @param {Card} object requires atk: Number, def: Number, card_images: [Strings] 
 * @returns 
 */
const Card = ({ atk, def, card_images, ...props }) => {
    useEffect(() => {
        console.log(props);
    }, []);
    return (
        <div className="card">
            {/* {props
                .entries()
                .filter((e) => typeof e === "string" || typeof e === "number")
                .map((e, i) => (
                    <div key={i}>{e}</div>
                ))} */}
            <div className="atk-def">ATK/DEF {atk + " / " + def}</div>
            {/* <div className="desc">{desc}</div> */}
            <img src={card_images[0]?.image_url} />
        </div>
    );
};

export default Card;
