//"SPDX-License-Identifier: UNLICENSED"

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Tasks {
    uint256 public taskCount;
    address owner;

    struct Task {
        uint256 id;
        string title;
        bool finished;
    }
    Task[] public tasks;

    event AddedTask(uint256 id, string title, bool finished);
    event TaskEdited(uint256 id, string title);
    event TaskCompleted(uint256 id, bool finished);

    constructor(){
        owner = msg.sender;
    }

    function createTask(string memory _title) public {
        require(owner == msg.sender);
        taskCount++;
        tasks.push(Task(taskCount, _title, false));
        emit AddedTask(taskCount, _title, false);
    }

    function editTask(uint256 _id, string memory _title) public {
        require(owner == msg.sender);
        for (uint256 i = 0; i <= tasks.length - 1; i++) {
            if (tasks[i].id == _id) {
                tasks[i].title = _title;
                break;
            }
            emit TaskEdited(_id, _title);
        }
    }

    function toggleTask(uint256 _id) public {
        for (uint256 i = 0; i <= tasks.length - 1; i++) {
            if (tasks[i].id == _id) {
                tasks[i].finished = !tasks[i].finished;
                break;
            }
            emit TaskCompleted(_id, tasks[i].finished);
        }
    }

    function getTasks() external view returns (Task[] memory) {
        return tasks;
    }

    function getTasksCount() external view returns (uint256) {
        return taskCount;
    }
}
