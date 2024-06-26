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
      log(e);

      if (e instanceof z.ZodError) {
        e.errors.map((error) => {
          log(error.message);
          //   TODO: how to catch errors from catch from the frontend
          //   throw new Error(error.message);
        });
      }

      return c.json({});
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
