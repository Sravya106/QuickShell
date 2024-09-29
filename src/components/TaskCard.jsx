import React from 'react';
import './TaskCard.css';  

const priorityIcons = {
  4: '/assets/SVG - Urgent Priority grey.svg',  // Urgent
  3: '/assets/Img - High Priority.svg',    // High
  2: '/assets/Img - Medium Priority.svg',  // Medium
  1: '/assets/Img - Low Priority.svg',     // Low
  0: '/assets/No-priority.svg',    // No priority
};

const statusIcons = {
  "Backlog" : '/assets/Backlog.svg',
  "In progress" : '/assets/in-progress.svg',
  "Todo" : '/assets/To-do.svg',
  "Cancelled" : '/assets/Cancelled.svg',
  "Done" : '/assets/Done.svg'
}
const TaskCard = ({ id, title, tag, priority, userImage, status, showUserImage }) => {
  return (
    <div className="task-card">
      {/* Task Header */}

      <div className="task-header">

        <span className="task-id roboto-regular">{id}</span>

       {
        showUserImage && <img src={userImage} alt="User Avatar" className="avatar" style={{ width: '40px', borderRadius: '50%' }} />
       } 
        
      
      </div>

      {/* Task MIdlle */}
      <div className="task-middle">
        <img src={statusIcons[status]} alt="status" />
        <h3 roboto-regular>{title}</h3>
      </div>

      <div className="task-footer">
       
        <span className="priority-icon">
          <img src={priorityIcons[priority]} alt="Priority Icon" style={{ width: '20px', height: '20px' }} />
        </span>

        <div className='task-tag-parent'>


        
        <span className="task-tag roboto-regular">{tag}</span>
      </div>

      </div>

    </div>
  );
};

export default TaskCard;
