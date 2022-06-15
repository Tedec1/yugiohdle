import React from "react";

const Card = ({ name, desc, id, level, card_images, atk, def, ...props }) => {
    return (
        <div className="card">
            <div>{id}</div>
            <div className="title">{name}</div>
            <div className="level">{level}</div>
            <div className="atk-def">{atk + " / " + def}</div>
            {/* <div className="desc">{desc}</div> */}
            <img src={card_images[0]?.image_url} />
        </div>
    );
};

export default Card;
