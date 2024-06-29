import { Hono } from "hono";
import { Session } from "hono-sessions";
import { prisma } from "../lib/client";
import { log } from "console";
import { categorySchema, transactionSchema } from "../lib/schema";
import { z } from "zod";
import { authMiddleware } from "../lib/middleware";

const app = new Hono<{
  Variables: {
    session: Session;
    session_key_rotation: boolean;
  };
}>();

const mainRoute = app
  .get("/all-transactions", authMiddleware, async (c) => {
    const take = c.req.query("n");
    try {
      const allTransactions = await prisma.transaction.findMany({
        take: take ? JSON.parse(take || "") : 10,
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          category: true,
        },
      });
      return c.json(allTransactions);
    } catch (error) {
      log(error);
      return c.json({ msg: "try again later" });
    }
  })
  .get("/total-balance", authMiddleware, async (c) => {
    return c.json({});
  })
  .get("/total-income", authMiddleware, async (c) => {
    try {
      const totalIncome = await prisma.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          transactionType: "INCOME",
        },
      });

      return c.json({ total: totalIncome._sum });
    } catch (error) {
      log(error);
      return c.json({});
    }
  })
  .get("/all-category", authMiddleware, async (c) => {
    const take = c.req.query("n");
    try {
      // for now get all categories, but later it should be by type /transaction-category/:type
      // by: ["category", "transactionType"],
      // where:{
      //   transactionType: "EXPENSE"
      // },
      const categories = await prisma.category.findMany({
        include: {
          _count: true,
        },
      });
      return c.json({ categories });
    } catch (error) {
      log(error);
      return c.json({ msg: "try again later" });
    }
  })
  .get("/total-expense", authMiddleware, async (c) => {
    try {
      const totalIncome = await prisma.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          transactionType: "EXPENSE",
        },
      });

      return c.json({ total: totalIncome._sum });
    } catch (error) {
      log(error);
      return c.json({ msg: "try again later" });
    }
  })
  .post("/create-transaction", authMiddleware, authMiddleware, async (c) => {
    try {
      const data = await c.req.json();
      const transactionData = transactionSchema.parse(data);
      log(transactionData);

      const session = c.get("session");
      const authCookie: any = session.get("auth-cookie");
      // log(authCookie);

      // TODO: check if category already exists
      const checkCategory = await prisma.category.findUnique({
        where: {
          name: transactionData.category,
        },
      });
      if (checkCategory) {
        const transaction = await prisma.transaction.create({
          data: {
            transactionType: transactionData.transactionType,
            amount: transactionData.amount,
            categoryId: checkCategory.id,
            description: transactionData.description,
            createdAt: transactionData.date,
            userId: authCookie,
          },
        });

        return c.json({
          msg: "success - available",
          id: transaction.id,
          type: transaction.transactionType,
          category: checkCategory.name,
        });
      }

      // TODO: else, create category
      const category = await prisma.category.create({
        data: {
          userId: authCookie,
          name: transactionData.category,
        },
      });

      const transaction = await prisma.transaction.create({
        data: {
          transactionType: transactionData.transactionType,
          amount: transactionData.amount,
          categoryId: category.id,
          description: transactionData.description,
          createdAt: transactionData.date,
          userId: authCookie,
        },
      });

      return c.json({
        msg: "success - no",
        id: transaction.id,
        type: transaction.transactionType,
        category: category.name,
      });
    } catch (e) {
      const data = await c.req.json();
      log(data);
      log(e);

      if (e instanceof z.ZodError) {
        e.errors.map((error) => {
          log(error.message);
          //   TODO: how to catch errors from catch from the frontend
          //   throw new Error(error.message);
        });
        return c.json({ error: "wrong credentials" });
      }
      return c.json({ error: "try again later" });
    }
  })
  .delete("/delete-transaction/:id", authMiddleware, async (c) => {
    try {
      const id = c.req.param("id");
      const transaction = await prisma.transaction.findUnique({
        where: { id },
      });
      if (!transaction) {
        return c.json({ error: "transaction already deleted" });
      }

      const deletedTransaction = await prisma.transaction.delete({
        where: { id },
      });
      return c.json(
        {
          msg: "transaction deleted successfully",
          type: deletedTransaction.transactionType,
          id: deletedTransaction.id,
        },
        200
      );
    } catch (error) {
      log(error);
      return c.json({ msg: "try again later" });
    }
  })
  .post("/create-category", authMiddleware, async (c) => {
    try {
      const data = await c.req.json();
      const transactionData = categorySchema.safeParse(data);
      if (transactionData.error) {
        return c.json({ error: "category is not defined" });
      }

      const session = c.get("session");
      const authCookie: any = session.get("auth-cookie");
      // log(authCookie);

      const checkCategory = await prisma.category.findUnique({
        where: {
          name: transactionData.data.name,
        },
      });
      if (checkCategory) {
        return c.json({
          error: "category already exists, proceed to create transaction",
        });
      }

      const category = await prisma.category.create({
        data: {
          userId: authCookie,
          name: transactionData.data.name,
        },
      });
      return c.json({
        total: "category created successfully",
        category: category.name,
      });
    } catch (error) {
      log(error);
      return c.json({});
    }
  });

export default mainRoute;
