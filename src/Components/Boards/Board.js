
import React, { useState } from 'react';
import "./Board.css";
import { MoreHorizontal, Plus, Circle } from "react-feather";
import Card from "../Cards/Card.js";
import Dropdown from '../Dropdown/Dropdown.js';
import { CellularSharp, CloseCircle, CheckmarkDoneCircle } from 'react-ionicons'

import medium from "../Assets/medium_signal.png";
import low from "../Assets/low_signal.png";
import no from "../Assets/no_priority.png";
import urg from "../Assets/urgent.png";
import inp from "../Assets/in_progress.png";
import bklg from "../Assets/bklg.png";
import na from "../Assets/na.png";
import av from "../Assets/av.png";
function Board(props) {
  const [showdropdown, setshowdropdown] = useState(false);

  const sortedCards = props.sort(props.board?.cards || []);

  

  const necessaryStatuses = ["Todo", "In progress", "Backlog", "Done", "Cancelled"];

// Function to get the appropriate icon based on the grouping option and priority
  function getBoardIcon(groupingOption, priority, ind,val) 
  {
    if (groupingOption === 'priority') 
    {
      // Based on priority level
      switch (priority) {
        case 0: // No Priority
          return (
            <img src={no} className='med' />
          );
        case 1: // Low
          return (
            <img src={low} className='med' />
          );
        case 2: // Medium
          return (
            <img src={medium} alt="" className='med' />
          );
        case 3: // High
          return (
            <CellularSharp
              color={'#5a5859'}
              title={props.board?.boardname}
              height="25px"
              width="25px"
            />
          );
          break;
        case 4: // Urgent
          return (
            <img src={urg} alt="" className='med' />
          );
        default:
          // Return a default icon 
          return (
            <MoreHorizontal color={'#5a5859'} />
          );
      }
    }

    else if (groupingOption === 'status') {
      switch (ind) {
        case 0: // TO DO
          return (
            <Circle />
          );
        case 1: // In progress
          return (
            <img src={inp} className='med' />
          );
        case 2: // Backlog
          return (
            <img src={bklg} alt="" className='med' />
          );
        case 3: // Done
          return (
            <CheckmarkDoneCircle
              color={'#2e2097'}
              height="25px"
              width="25px"
            />
          );
          break;
        case 4: // Cancelled
          return (
            <CloseCircle
              color={'#5a5859'}
              height="25px"
              width="25px"
            />
          );
        default:
          // Return a default icon 
          return (
            <MoreHorizontal color={'#5a5859'} />
          );
      }

    } 
    else 
    {
      
      if(props.board?.available)
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
  }

  return (
    <div className='board'>
      <div className="board_top">
        <div className="icons">
          {getBoardIcon(props.groupingOption, props.board?.priority, necessaryStatuses.indexOf(props.board?.boardname))}
        </div>

        <p className="board_top_title">{props.board?.boardname} <span className='board_total'>{props.board?.cards.length}</span> </p>

        <div className="board_top_add">
          <Plus />
        </div>
        <div className="board_top_delete" onClick={() => setshowdropdown(true)}>
          <MoreHorizontal />

          {
            showdropdown && (
              <Dropdown onClose={() => setshowdropdown(false)}>
                <div className="board_dropdown">
                  <p>Delete Board</p>
                </div>
              </Dropdown>
            )
          }
        </div>
      </div>

      <div className="board_cards">
        {/* DIRECTLY USING SORTED CARD HERE */}
        {sortedCards.map((item) => (
          <Card key={item.id} card={item} avail={props.board?.available} />
        ))}
      </div>
    </div>
  );
}

export default Board;