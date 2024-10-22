import React from 'react';
import './Card.css';

const priorityIcons = {
  4: '/assets/SVG - Urgent Priority grey.svg',
  3: '/assets/Img - High Priority.svg',
  2: '/assets/Img - Medium Priority.svg',
  1: '/assets/Img - Low Priority.svg',
  0: '/assets/No-priority.svg',
};

const statusIcons = {
  "Backlog": '/assets/Backlog.svg',
  "InProgress": '/assets/in-progress.svg',
  "Todo": '/assets/To-do.svg',
  "Cancelled": '/assets/Cancelled.svg',
  "Completed": '/assets/Done.svg'
};

const Card = ({ id, title, tag, priority, userImage, status, showUserImage }) => {
  return (
    <div className="task-item">
      <div className="task-item-header">
        <span className="task-item-id">{id}</span>
        {showUserImage && <img src={userImage} alt="User Avatar" className="task-item-avatar" />}
      </div>

      <div className="task-item-body">
        <img src={statusIcons[status]} alt="Status" className="task-item-status-icon" />
        <h3 className="task-item-title">{title}</h3>
      </div>

      <div className="task-item-footer">
        <img src={priorityIcons[priority]} alt="Priority Icon" className="task-item-priority-icon" />
        <span className="task-item-tag">{tag}</span>
      </div>
    </div>
  );
};

export default Card;
