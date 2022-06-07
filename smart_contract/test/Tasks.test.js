const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("deploy", () => {
  let owner, Contract, contract;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();

    Contract = await ethers.getContractFactory("Tasks");
    contract = await Contract.deploy();
  });

  describe('success - adding task', () => {
    let createTask, task1, task2, getTasks, edit ;
    beforeEach(async()=>{
      createTask = await contract.createTask("Hello, world");
      createTask = await contract.createTask("Hi, there");

   
      completed = await contract.toggleTask(2);
      edit = await contract.editTask(1, 'Hello, friend');

      task1 = await contract.tasks(0);
      task2 = await contract.tasks(1);

      getTasks = await contract.getTasks();
      count  = await contract.getTasksCount();
    })
    
    it("tracks creation", async () => {
      console.log(`Owner : ${owner.address}`);
      expect(await contract.taskCount()).to.equal(2);
      expect(createTask).to.emit('AddedTask');
    });
    it('tracks task completion', async () =>{
      expect(task1.finished).to.eq(false);
      expect(task2.finished).to.eq(true);
      expect(completed).to.emit('TaskCompleted');
    })
    it('should get created tasks title', async () =>{
      expect(getTasks[0].title).to.equal('Hello, friend');
      expect(getTasks[1].title).to.equal('Hi, there');
    })
    it('tracks task count', async()=>{
      expect((await contract.getTasksCount())).to.equal('2');
    });
    })

});
