import React, { useContext } from 'react';
import './Task.scss';
import { TaskContext } from '../../context/TaskContext';

function Task({ id, title, finished }) {
  const { toggleTask, editTaskTitle } = useContext(TaskContext);

  const handleChecked = () => {
    toggleTask(id);
  };
  const handleEdit = () => {
    // eslint-disable-next-line no-alert
    const updatedTitle = window.prompt('Update this task title', title);
    editTaskTitle(id, updatedTitle);
  };

  return (
    <div className="task">
      <h3 className={`${finished ? 'finished' : ''}`}>{title}</h3>
      {!finished && <button type="button" onClick={handleEdit}>edit</button>}
      <input type="checkbox" checked={finished} onChange={handleChecked} />
    </div>
  );
}

export default Task;
