import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import './Form.scss';
import Task from '../task/Task';

function Loader() {
  return (
    <div className="loader">
      <div className="loading"><h4>loading..</h4></div>
    </div>
  );
}

function Form() {
  const {
    currentAccount, addTask, enteredTask, tasks, handleChange, connectAccount, isLoading,
  } = useContext(TaskContext);

  const submitTask = (e) => {
    e.preventDefault();
    if (!enteredTask) return;
    addTask();
  };

  const shortenAddress = (address) => `${address.slice(0, 5)}xxx${address.slice(address.length - 4)}`;
  let addBtn;
  if (currentAccount) {
    addBtn = <button type="submit">Add Task</button>;
  }
  return (
    <>
      <h1>Task Manager</h1>
      <h4 className="account">{shortenAddress(currentAccount)}</h4>
      <div className="form-container">
        <form onSubmit={submitTask}>
          <input type="text" onChange={handleChange} value={enteredTask} placeholder="Enter a task" />
          {isLoading ? <Loader /> : addBtn}
          {!currentAccount && <button type="button" onClick={connectAccount}>Connect Wallet</button>}
        </form>

        <div className="task-container">
          {tasks.reverse().map((task) => (
            <Task key={task.id} id={task.id} title={task.title} finished={task.finished} />
          ))}
        </div>

      </div>
    </>
  );
}

export default Form;
