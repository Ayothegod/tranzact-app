import { Hono } from "hono";
import { Session } from "hono-sessions";
import { prisma } from "../lib/client";
import { log } from "console";
import { transactionSchema } from "../lib/schema";
import { z } from "zod";

const app = new Hono<{
  Variables: {
    session: Session;
    session_key_rotation: boolean;
  };
}>();

const mainRoute = app
  .get("/all-transactions", async (c) => {
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
  .get("/total-balance", async (c) => {
    return c.json({});
  })
  .get("/total-income", async (c) => {
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
  .get("/all-category", async (c) => {
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
  .get("/total-expense", async (c) => {
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
  .post("/create-transaction", async (c) => {
    try {
      const data = await c.req.json();
      const transactionData = transactionSchema.parse(data);
      // log(transactionData); // TESTID: clxvt6am30000g559ej2pc7ph
      const transaction = await prisma.transaction.create({
        data: {
          transactionType: transactionData.transactionType,
          amount: transactionData.amount,
          category: transactionData.category,
          description: transactionData.description,
          userId: transactionData.userId,
        },
      });

      return c.json({
        msg: "success",
        id: transaction.id,
        type: transaction.transactionType,
      });
    } catch (e) {
      //   log(e);

      if (e instanceof z.ZodError) {
        e.errors.map((error) => {
          log(error.message);
          //   TODO: how to catch errors from catch from the frontend
          //   throw new Error(error.message);
          //   return c.json({ error: error });
        });
      }

      return c.json({ error: "try again later" });
    }
  })
  .delete("/delete-transaction/:id", async (c) => {
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
