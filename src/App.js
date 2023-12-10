import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Board from "./Components/Boards/Board";
import axios from 'axios';
import { Sliders } from "react-feather";

function App() {
  const fetchUrl = "https://api.quicksell.co/v1/internal/frontend-assignment";
  const [data, setData] = useState({ tickets: [], users: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const [groupOption, setGroupOption] = useState(() => 
  {
    return sessionStorage.getItem('groupOption') || 'status';
  });
  const [sortOption, setSortOption] = useState(() => 
  {
    return sessionStorage.getItem('sortOption') || 'priority';
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(fetchUrl);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

    //  event listener to close dropdown when clicking outside
    window.addEventListener("click", handleClickOutside);

    // Cleanup the event listener 
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [fetchUrl]);

  useEffect(() => 
  {
    sessionStorage.setItem('groupOption', groupOption);
    sessionStorage.setItem('sortOption', sortOption);
  }, [groupOption, sortOption]);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };
  const { tickets, users } = data;


  //PRIORITY WISE
  function groupByPriority(tickets,users) {
    const boardsByPriority = {};
    const priorityNames = ["No Priority", "Low", "Medium", "High", "Urgent"];
    const priorityNum=[0,1,2,3,4];
    tickets.forEach((item) => {
      const priority = item.priority || 0;
      const user = users.find((u) => u.id === item.userId);
      if (!boardsByPriority[priority]) {
        boardsByPriority[priority] = {
          id: Date.now() + Math.random() * 2,
          priority: priority,
          available: user.available,
          boardname: priorityNames[priority],
          cards: [],
        };
      }

      boardsByPriority[priority].cards.push({
        id: item.id,
        title: item.title,
        tag: item.tag || [],
        userId: item.userId,
        status: item.status.toLowerCase(),
        priority: priority,
      });
    });

    priorityNum.forEach((priority) => {
      if (!boardsByPriority[priority]) {
        boardsByPriority[priority] = {
          id: Date.now() + Math.random() * 2,
          priority: priority,
          available: null,
          boardname: priorityNames[priority],
          cards: [],
        };
      }
    });

    return Object.values(boardsByPriority);
  }

 // STATUS WISE
  function groupByStatus(tickets,users) {
    const boardsByStatus = {};

    tickets.forEach((item) => {
      const status = item.status;
      const user = users.find((u) => u.id === item.userId);
      if (!boardsByStatus[status]) {
        boardsByStatus[status] = {
          id: Date.now() + Math.random() * 2,
          available: user.available,
          boardname: status,
          cards: [],
        };
      }

      boardsByStatus[status].cards.push({
        id: item.id,
        title: item.title,
        tag: item.tag || [],
        userId: item.userId,
        status: item.status,
        priority: item.priority,
      });
    });

    const necessaryStatuses = ["Todo", "In progress", "Backlog", "Done", "Cancelled"];
    necessaryStatuses.forEach((status) => {
      if (!boardsByStatus[status]) {
        boardsByStatus[status] = {
          id: Date.now() + Math.random() * 2,
          available: null,
          boardname: status,
          cards: [],
        };
      }
    });
    
    return Object.values(boardsByStatus);
  }

  //USER WISE
  function groupByUser (tickets, users)  {
    const boardsByUser = {};

    tickets.forEach((item) => {
      const userId = item.userId;

      // Finding the user information
      const user = users.find((u) => u.id === userId);

      // If the user is found, creating a board for that user
      if (user) {
        const userName = user.name;
        
        if (!boardsByUser[userName]) {
          boardsByUser[userName] = {
            id: Date.now() + Math.random() * 2,
            boardname: userName,
            available:user.available,
            cards: [],
          };
        }

        boardsByUser[userName].cards.push({
          id: item.id,
          title: item.title,
          tag: item.tag || [],
          userId: userId,
          status: item.status,
          priority: item.priority,
        });
      }
    });

    return Object.values(boardsByUser);
  };
  
  function groupData ()  {
    switch (groupOption) {
      case 'status':
        return groupByStatus(tickets,users);
      case 'priority':
        return groupByPriority(tickets,users);
      case 'user':
        return groupByUser(tickets, users);
      default:
        return [];
    }
  };

  
  function sortCards(cards)
  {
    //USING SORTING function

    return cards.sort(
      (a,b)=>{
        if(sortOption==='priority')
        {
          return b.priority-a.priority;//DESCENDING ORDER
        }
        else if(sortOption==='title')
        {
          return a.title.localeCompare(b.title) //ASCENDING ORDER
        }
        else
        {
          return 0;//NO SORTING
        }
      }
    )
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const boards=groupData();


   return (
    <div className="App">
      <div className="navbar">
      <Sliders className='sld'/>
        <div className="ddn" onClick={toggleDropdown} ref={dropdownRef}>
          <input
            type="text"
            className='nav_dd'
            placeholder='Display'
            readOnly
          />
          {showDropdown && (
            <div className="ddn_opt" onClick={(e) => e.stopPropagation()}>
              <div className='ddn_opt_1'>
                <label className='opt'>Grouping</label>
                <select className="grouping" value={groupOption} onChange={(e) => setGroupOption(e.target.value)}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className='ddn_opt_1'>
                <label className='opt'>Ordering</label>
                <select className="ord" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="app_outer">
        <div className="app_boards">
          {boards.map((item) => (
            <Board key={item.id} board={item} sort={sortCards} groupingOption={groupOption}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
