import React from "react";

const Card = ({ name, desc, id, level, card_images, ...props }) => {
    return (
        <div className="card">
            {/* <div>{id},</div> */}
            {/* <div className='title'>{name}</div>
      <div className='level'>{level}</div>
      <div className='desc'>{desc}</div> */}
            <img src={card_images[0].image_url_small} />
        </div>
    );
};

export default Card;
