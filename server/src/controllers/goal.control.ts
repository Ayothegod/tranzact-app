import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/client.js";
import { ErrorEventEnum } from "../utils/constants.js";

// DONE: create category
const createGoal = asyncHandler(async (req: Request, res: Response) => {
  const { name, targetAmount, deadline, description, currentAmount } = req.body;

  const goal = await prisma.goal.create({
    data: {
      userId: req.user?.id as string,
      name,
      targetAmount,
      description: description ? description : "",
      deadline: new Date(deadline),
      currentAmount: currentAmount ? currentAmount : 0,
    },
  });

  if (!goal) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.CREATE_GOAL_ERROR,
          "Goal creation failed."
        )
      );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, goal, "Goal created successfully!"));
});

// DONE: create category
const getGoal = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const goal = await prisma.goal.findUnique({
    where: {
      id,
      userId: req.user?.id,
    },
  });

  if (!goal) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.GET_GOAL_ERROR,
          "This goal was not found!"
        )
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, goal, "Goal fetched successfully!"));
});

// DONE:
const getAllGoals = asyncHandler(async (req: Request, res: Response) => {
  const { name, targetAmount, deadline, description, currentAmount } = req.body;

  const goals = await prisma.goal.findMany({
    where: {
      userId: req.user?.id,
    },
  });

  if (!goals) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, ErrorEventEnum.GET_GOAL_ERROR, "No goals found.")
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, goals, "Goals created successfully!"));
});

// DONE: create category
const updateGoal = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { currentAmount, description, targetAmount } = req.body;

  const goal = await prisma.goal.findUnique({
    where: { id, userId: req.user?.id },
  });

  if (!goal) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.RESOURCE_NOT_FOUND,
          "This goal is not found."
        )
      );
  }

  const updatedGoal = await prisma.goal.update({
    where: {
      id,
      userId: req.user?.id,
    },
    data: {
      description: description ? description : "",
      currentAmount: currentAmount ? currentAmount : goal.currentAmount,
      targetAmount: targetAmount ? targetAmount : goal.targetAmount,
    },
  });

  if (!updatedGoal) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.UPDATE_GOAL_ERROR,
          "Unable to update goal."
        )
      );
  }

  console.log(updatedGoal.currentAmount, updatedGoal.targetAmount);

  if (updatedGoal.currentAmount >= updatedGoal.targetAmount) {
    const isCompleted = await prisma.goal.update({
      where: {
        id,
        userId: req.user?.id,
      },
      data: {
        isCompleted: true,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, isCompleted, "Goal target has been met!!!"));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, updatedGoal, "Goal updated successfully!"));
});

// DONE:
const deleteGoal = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const goal = await prisma.goal.findUnique({
    where: {
      id,
      userId: req.user?.id,
    },
  });

  if (!goal) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.RESOURCE_NOT_FOUND,
          "This goal was not found!"
        )
      );
  }

  const deletedGoal = await prisma.goal.delete({
    where: { id, userId: req.user?.id },
  });

  if (!deletedGoal) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.DELETE_GOAL_ERROR,
          "This goal is already deleted!"
        )
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedGoal, "Goal deleted successfully!"));
});

export { createGoal, getAllGoals, getGoal, updateGoal, deleteGoal };
