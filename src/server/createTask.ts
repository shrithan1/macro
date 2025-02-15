import { helloWorldServiceManager } from "../../AVS/portfolioavs/operator/createNewTasks";

export async function createTask(taskData: string) {
  try {
    // Send transaction
    const tx = await helloWorldServiceManager.createNewTask(taskData);
    const receipt = await tx.wait();

    return {
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      taskData: JSON.parse(taskData)
    };
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
} 