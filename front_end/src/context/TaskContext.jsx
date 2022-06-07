import { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAddress, abi } from '../utils/constants';

const { ethereum } = window;

export const TaskContext = createContext();

const getEthereumContract = () => {
  if (!ethereum) return alert('Please install meta mask');
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  return contract;
};

export function TaskContextProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState('');
  const [enteredTask, setEnteredTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState(localStorage.getItem('taskCount'));
  const [isLoading, setIsLoading] = useState(false);

  const fetchTask = async () => {
    try {
      if (ethereum) {
        const contract = getEthereumContract();
        const contractTasks = await contract.getTasks();

        const structuredTask = contractTasks.map((task) => ({
          id: task.id.toNumber(),
          title: task.title,
          finished: task.finished,
        }));

        setTasks(structuredTask);
      } else {
        console.log('no ethereum object found');
      }
    } catch (error) {
      console.log(error);
      throw new Error('No task found');
    }
  };
  const checkForWallet = async () => {
    if (!ethereum) return alert('Please install meta mask');
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    try {
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        fetchTask();
      }
    } catch (error) {
      throw new Error('No ethereum object found');
    }
    return accounts;
  };
  const checkForTasks = async () => {
    if (ethereum) {
      try {
        const contract = getEthereumContract();
        const contractCount = await contract.getTasksCount();
        localStorage.setItem('taskCount', contractCount);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const connectAccount = async () => {
    if (!ethereum) return alert('Please install meta mask');
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

    try {
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log(accounts);
      }
    } catch (error) {
      throw new Error('No ethereum object found');
    }
    return accounts;
  };
  const handleChange = (e) => {
    setEnteredTask(e.target.value);
  };
  const addTask = async () => {
    try {
      if (ethereum) {
        const contract = getEthereumContract();
        const response = await contract.createTask(enteredTask);
        setIsLoading(true);
        await response.wait();
        setIsLoading(false);

        const taskCount = await contract.getTasksCount();
        setCount(taskCount.toNumber());
        window.location.reload();
      } else {
        console.log('no ethereum object found');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editTaskTitle = async (id, updatedTitle) => {
    const contract = getEthereumContract();
    const taskTitle = await contract.editTask(id, updatedTitle);
    await taskTitle.wait();

    window.location.reload();
  };
  const toggleTask = async (id) => {
    try {
      if (ethereum) {
        const contract = getEthereumContract();
        const taskId = id;
        const finish = await contract.toggleTask(taskId);
        await finish.wait();

        window.location.reload();
      } else {
        console.log('No ethereum object found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkForWallet();
    checkForTasks();
  }, [count]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <TaskContext.Provider value={{
      currentAccount,
      addTask,
      enteredTask,
      tasks,
      handleChange,
      connectAccount,
      isLoading,
      toggleTask,
      editTaskTitle,
    }}
    >
      {children}
    </TaskContext.Provider>
  );
}
