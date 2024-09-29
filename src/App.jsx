import React, { useState, useEffect } from 'react';
import TaskCard from './components/TaskCard';
import './App.css';
import Navbar from './components/Navbar';
import axios from 'axios';

const App = () => {
  
  const [groupingOption, setGroupingOption] = useState(
    localStorage.getItem('groupingOption') || 'status'
  );
  const [sortOption, setSortOption] = useState(
    localStorage.getItem('sortOption') || 'title'
  );
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState({});

  //API CALL
  useEffect(() => {
    axios
      .get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => {
        const data = response.data;
        setTickets(data.tickets);

        // Create a mapping of user IDs to names
        const userMap = {};
        data.users.forEach((user) => {
          userMap[user.id] = user.name;
        });
        setUsers(userMap);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // for persistent storage upon reload : 
  useEffect(() => {
    localStorage.setItem('groupingOption', groupingOption);
  }, [groupingOption]);

  useEffect(() => {
    localStorage.setItem('sortOption', sortOption);
  }, [sortOption]);

  //sorting logic :

  const getSortedTickets = () => {
    const sortedTickets = [...tickets];
    if (sortOption === 'priority') {
      // by priority in descending order
      sortedTickets.sort((a, b) => b.priority - a.priority);
    } else if (sortOption === 'title') {
      // by title in ascending order
      sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sortedTickets;
  };

  //grouping logic :
  const getGroupedTickets = () => {
    const groupedTickets = {};
    const sortedTickets = getSortedTickets();

    sortedTickets.forEach((ticket) => {
      let groupKey;

     
      if (groupingOption === 'status') {
        groupKey = ticket.status;
      } else if (groupingOption === 'user') {
        groupKey = users[ticket.userId] || ticket.userId;
      } else if (groupingOption === 'priority') {
        groupKey = `Priority ${ticket.priority}`;
      }

     
      if (!groupedTickets[groupKey]) {
        groupedTickets[groupKey] = [];
      }
      groupedTickets[groupKey].push(ticket);
    });

    return groupedTickets;
  };

  // function to render the board :

  const  f = () => {
    const groupedTickets = getGroupedTickets();

    return (
      <div className="kanban-board">
        {Object.keys(groupedTickets).map((group) => (
          <div key={group} className="kanban-column">
            <div className="column-header">
              <div className='column-header-text'>
              <div className='column-header-pp' style={{ display: 'flex', alignItems: 'center', }}>
  {groupingOption === 'user' && (
    <img 
      src={'src/assets/person.png'} 
      alt="User Avatar" 
      className="avatar" 
      style={{ width: '30px', height: '30px', borderRadius: '50%', marginTop: '10px' }} 
    />
  )}
 
</div>

                <h2 className='column-header-name'>{group}</h2>
                <h2 className='column-header-count'>{groupedTickets[group].length}</h2> {/* Display the count */}
              </div>
             

              <div className="column-header-icons">
                <img src="src/assets/add.svg" alt="Add Icon" />
                <img src="src/assets/3 dot menu.svg" alt="Menu Icon" />
              </div>
            </div>
            <div className="kanban-cards">
              {groupedTickets[group].map((ticket) => (
                <TaskCard
                  key={ticket.id}
                  id={ticket.id}
                  title={ticket.title}
                  tag={ticket.tag} 
                  priority={ticket.priority}
                  status={ticket.status}
                  userImage={'src/assets/person.png'} 
                  showUserImage={groupingOption !== 'user'} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };



  return (
    
    <div className="app">
   
      <Navbar
        groupingOption={groupingOption}
        setGroupingOption={setGroupingOption}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

 
      {f()} 
    </div>
  );
};

export default App;
