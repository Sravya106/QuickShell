import React, { useState } from 'react';
import './Navbar.css'; 

const Navbar =    ({ groupingOption, setGroupingOption, sortOption, setSortOption }) => {



  const [showDisplayOptions, setShowDisplayOptions] = useState(false); 

  return (
    <div className="navbar">
      <div className="display-button">
  <button onClick={() => setShowDisplayOptions(!showDisplayOptions)}>
    <img src="/assets/Display.svg" alt="Before" className="button-image" />
    Display
    <img src="/assets/down.svg" alt="After" className="button-image" />
  </button>

  {showDisplayOptions && (
    <div className="display-dropdown">
      {/* Grouping Options */}
      <div className="dropdown-group">
        <h4 className='roboto-regular'>Grouping:</h4>
        <select
          value={groupingOption}
          onChange={(e) => {
            setGroupingOption(e.target.value);
          }}
        >
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {/* Ordering Options */}
      <div className="dropdown-group">
        <h4>Ordering:</h4>
        <select
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
          }}
        >
          <option value="title">Title</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  )}
</div>
    </div>
  );
};

export default Navbar;
