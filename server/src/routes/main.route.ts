import { Hono } from "hono";
import { Session } from "hono-sessions";
import { prisma } from "../lib/client";
import { log } from "console";
import { transactionSchema } from "../lib/schema";
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
          createdAt: "desc",
        },
      });
      return c.json({ allTransactions });
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
      const categories = await prisma.transaction.groupBy({
        by: ["category"],
        _count: true,
        _sum: {
          amount: true,
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
      // log(transactionData.date);

      const session = c.get("session");
      const authCookie: any = session.get("auth-cookie");
      // log(authCookie);

      const transaction = await prisma.transaction.create({
        data: {
          transactionType: transactionData.transactionType,
          amount: transactionData.amount,
          category: transactionData.category,
          description: transactionData.description,
          createdAt: transactionData.date,
          userId: authCookie,
        },
      });

      return c.json({
        msg: "success",
        id: transaction.id,
        type: transaction.transactionType,
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
        return c.text("transaction already deleted");
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
  });

export default mainRoute;
