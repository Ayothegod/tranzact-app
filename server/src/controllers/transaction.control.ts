import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/client.js";
import { ErrorEventEnum } from "../utils/constants.js";

// DONE: create category
const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { categoryName } = req.body;

  const category = await prisma.category.create({
    data: {
      userId: req.user?.id as string,
      name: categoryName,
    },
  });

  if (!category) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.CREATE_CATEGORY_ERROR,
          "Unable to create a new category."
        )
      );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully!"));
});

// DONE: all categories
const allCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    where: {
      userId: req.user?.id,
    },
    include: {
      _count: true,
    },
  });

  if (!categories) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.RESOURCE_NOT_FOUND,
          "No categories found."
        )
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully!"));
});

// DONE:
const createTransaction = asyncHandler(async (req: Request, res: Response) => {
  const { type, amount, description, categoryName } = req.body;

  let setCategoryId: string | null | undefined;

  const checkCategory = await prisma.category.findUnique({
    where: {
      name: categoryName,
      userId: req.user?.id,
    },
  });

  setCategoryId = checkCategory?.id;

  if (!checkCategory) {
    const category = await prisma.category.create({
      data: {
        userId: req.user?.id as string,
        name: categoryName,
      },
    });
    setCategoryId = category?.id;

    if (!category) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            ErrorEventEnum.CREATE_CATEGORY_ERROR,
            "Unable to create a new category for this transaction."
          )
        );
    }
  }

  const transaction = await prisma.transaction.create({
    data: {
      type,
      amount,
      categoryId: setCategoryId as string,
      description: description,
      userId: req.user?.id as string,
      status: "complete",
    },
  });

  if (!transaction) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.CREATE_TRANSACTION_ERROR,
          "Unable to create a new transaction."
        )
      );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, transaction, "Transaction created successfully!")
    );
});

// DONE:
const allTransactions = asyncHandler(async (req: Request, res: Response) => {
  const take = req.query.take;

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: req.user?.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      category: true,
    },
    take: take ? Number(take) : 25,
  });

  if (!transactions) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.RESOURCE_NOT_FOUND,
          "No transactions found."
        )
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, transactions, "Transactions fetched successfully!")
    );
});

// DONE:
const getTransaction = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
      userId: req.user?.id,
    },
  });

  if (!transaction) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.GET_TRANSACTION_ERROR,
          "This transaction was not found!"
        )
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, transaction, "Transaction fetched successfully!")
    );
});

// DONE:
const updateTransaction = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { amount, description, status } = req.body;
  console.log(req.body);

  const transaction = await prisma.transaction.findUnique({
    where: { id, userId: req.user?.id },
  });

  if (!transaction) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.RESOURCE_NOT_FOUND,
          "This transaction is not found."
        )
      );
  }

  const updatedTransaction = await prisma.transaction.update({
    where: { id },
    data: {
      status: status ? status : transaction.status,
      amount: amount ? amount : transaction.amount,
      description: description ? description : transaction.description,
    },
  });

  if (!updatedTransaction) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.UPDATE_TRANSACTION_ERROR,
          "Unable to update transaction."
        )
      );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        updatedTransaction,
        "Transaction updated successfully!"
      )
    );
});

// DONE:
const deleteTransaction = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
      userId: req.user?.id,
    },
  });

  if (!transaction) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.RESOURCE_NOT_FOUND,
          "This transaction was not found!"
        )
      );
  }

  const deletedTransaction = await prisma.transaction.delete({
    where: { id, userId: req.user?.id },
  });

  if (!deletedTransaction) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.DELETE_TRANSACTION_ERROR,
          "This transaction is already deleted!"
        )
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        deletedTransaction,
        "Transaction deleted successfully!"
      )
    );
});

// DONE:
const totalExpense = asyncHandler(async (req: Request, res: Response) => {
  const allExpense = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      type: "expense",
      userId: req.user?.id,
    },
  });

  if (!allExpense) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.RESOURCE_NOT_FOUND,
          "Unable to get total expense!"
        )
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, allExpense, "Total expense fetched successfully!")
    );
});

// DONE:
const totalIncome = asyncHandler(async (req: Request, res: Response) => {
  const allIncome = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      type: "income",
      userId: req.user?.id,
    },
  });

  if (!allIncome) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.RESOURCE_NOT_FOUND,
          "Unable to get total income!"
        )
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, allIncome, "Total income fetched successfully!")
    );
});

// DONE:
const totalBalance = asyncHandler(async (req: Request, res: Response) => {
  const result = await prisma.transaction.groupBy({
    by: ["type"],
    where: { userId: req.user?.id },
    _sum: { amount: true },
    _max: {
      amount: true,
      createdAt: true,
    },
  });

  const categories = await prisma.category.groupBy({
    where: { userId: req.user?.id },
    by: ["name"],
    _count: { name: true },
  });

  if (!result) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          ErrorEventEnum.RESOURCE_NOT_FOUND,
          "Unable to get balance!"
        )
      );
  }

  const income = Number(
    result.find((r) => r.type === "income")?._sum.amount || 0
  );
  const expense = Number(
    result.find((r) => r.type === "expense")?._sum.amount || 0
  );

  const incomeMax = Number(
    result.find((r) => r.type === "income")?._max.amount || 0
  );
  const expenseMax = Number(
    result.find((r) => r.type === "expense")?._max.amount || 0
  );

  const incomeMaxDate = result.find((r) => r.type === "income")?._max.createdAt;

  const expenseMaxDate = result.find((r) => r.type === "expense")?._max
    .createdAt;

  const balance = Number(income) - Number(expense);
  // console.log(categories);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        income,
        expense,
        balance,
        incomeMax,
        expenseMax,
        incomeMaxDate,
        expenseMaxDate,
        categories,
      },
      "Balance fetched successfully!"
    )
  );
});

export {
  createTransaction,
  createCategory,
  allCategories,
  allTransactions,
  updateTransaction,
  deleteTransaction,
  getTransaction,
  totalExpense,
  totalIncome,
  totalBalance,
};
