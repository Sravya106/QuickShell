import React, { useState, useEffect } from 'react';
import TaskCard from './components/Card';
import './App.css';
import Navbar from './components/Navbar';
import axios from 'axios';

const App = () => {
  const [groupBy, setGroupBy] = useState(
    localStorage.getItem('groupBy') || 'status'
  );
  const [sortBy, setSortBy] = useState(
    localStorage.getItem('sortBy') || 'title'
  );
  const [tasks, setTasks] = useState([]);
  const [userMapping, setUserMapping] = useState({});

  useEffect(() => {
    axios
      .get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => {
        const data = response.data;
        setTasks(data.tickets);

        const userMap = {};
        data.users.forEach((user) => {
          userMap[user.id] = user.name;
        });
        setUserMapping(userMap);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
  }, [groupBy]);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
  }, [sortBy]);

  const getSortedTasks = () => {
    const sortedTasks = [...tasks];
    if (sortBy === 'priority') {
      sortedTasks.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sortedTasks;
  };

  const getGroupedTasks = () => {
    const groupedTasks = {};
    const sortedTasks = getSortedTasks();

    sortedTasks.forEach((task) => {
      let groupKey;

      if (groupBy === 'status') {
        groupKey = task.status;
      } else if (groupBy === 'user') {
        groupKey = userMapping[task.userId] || task.userId;
      } else if (groupBy === 'priority') {
        groupKey = `Priority ${task.priority}`;
      }

      if (!groupedTasks[groupKey]) {
        groupedTasks[groupKey] = [];
      }
      groupedTasks[groupKey].push(task);
    });

    return groupedTasks;
  };

  const renderBoard = () => {
    const groupedTasks = getGroupedTasks();

    return (
      <div className="board">
        {Object.keys(groupedTasks).map((group) => (
          <div key={group} className="board-column">
            <div className="column-header">
              <div className="column-header-info">
                {groupBy === 'user' && (
                  <div className="user-avatar">
                    <img 
                      src={'/assets/person.jpg'}
                      alt="User Avatar"
                      className="avatar"
                    />
                  </div>
                )}
                <h2 className="column-title">{group}</h2>
                <h2 className="column-count">{groupedTasks[group].length}</h2>
              </div>

              <div className="column-actions">
                <img src="/assets/add.svg" alt="Add Task" className="action-icon" />
                <img src="/assets/3 dot menu.svg" alt="Options" className="action-icon" />
              </div>
            </div>

            <div className="board-cards">
              {groupedTasks[group].map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  tag={task.tag}
                  priority={task.priority}
                  status={task.status}
                  userImage={'/assets/person.jpg'}
                  showUserImage={groupBy !== 'user'}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="app-container">
      <Navbar
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {renderBoard()}
    </div>
  );
};

export default App;
