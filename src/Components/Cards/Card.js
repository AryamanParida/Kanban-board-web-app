
import React, { useState } from 'react';
import "./Card.css";
import { MoreHorizontal } from "react-feather";
import Tag from "../Tags/Tag";
import Dropdown from '../Dropdown/Dropdown';
import na from "../Assets/na.png";
import av from "../Assets/av.png";
function Card(props) 
{
  const [showdropdown, setshowdropdown] = useState(false);

  function getcard_icon()
  {
    if(props.avail)
      {
        return(
          <img src={av} alt="" className='med' />
        );
      }
      else
      {
        return(
          <img src={na} alt="" className='med' />
        );
      }
  }
  return (
    
    <div className='card'>
      <div className="card_top">
        <div className="card_id">

          {props.card?.id}
        </div>

        <div className="ic">
          {getcard_icon()}
        </div>
          
        
      </div>

      <div className="card_mid">
        <div className="card_title">
          {props.card?.title}
        </div>
      </div>

      <div className="card_footer">
        <div className="card_tag">
        
          {props.card?.tag.map((tag, index) => (
            <Tag key={index} text={tag} className="tg" />
          ))}
        </div>

        <div className="card_top_delete" onClick={() => setshowdropdown(true)}>
          <MoreHorizontal className="more-icon" />

          {showdropdown && (
            <Dropdown onClose={() => setshowdropdown(false)}>
              <div className="card_dropdown">
                <p>Delete Card</p>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
    
  );
  
}

export default Card;