import React, { useState } from 'react';
import './Navbar.css'; 

const Navbar = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); 

  return (
    <nav className="navbar">
      <div className="toggle-display">
        <button onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
          <img src="/assets/Display.svg" alt="Display Icon" className="icon" />
          Display
          <img src="/assets/down.svg" alt="Dropdown Icon" className="icon" />
        </button>

        {isDropdownVisible && (
          <div className="dropdown-menu">
            <div className="dropdown-section">
              <label className="grouping-label">Group By:</label>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div className="dropdown-section">
              <label className="sorting-label">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="title">Title</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

