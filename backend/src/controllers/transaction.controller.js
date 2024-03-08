import mongoose from "mongoose";
import { Transaction } from "../models/transaction.model.js";

const createTransaction = async (req, res) => {
  const { transactionName, transactionType, category, amount } = req.body;
  if (
    [transactionName, transactionType, category, amount].some(
      (field) => field === ""
    )
  )
    res.status(400).send("All fields are required");

  try {
    const transaction = await Transaction.create({
      transactionName,
      transactionType,
      amount,
      category,
      userId: req.user._id,
    });

    res.status(201).send({
      message: "Transaction Added Successfully",
    });
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

const getTransactions = async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const transactions = await Transaction.aggregate([
    {
      $match: {
        userId: req.user._id,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $limit: Number(limit),
    },
    {
      $skip: Number(offset),
    },
  ]);
  res.send(transactions);
};

const getAmount = async (req, res) => {
  const amount = await Transaction.aggregate([
    {
      $match: {
        userId: req.user._id,
      },
    },
    {
      $group: {
        _id: "$transactionType",
        value: {
          $sum: "$amount",
        },
      },
    },
  ]);
  res.send(amount);
};

const updateTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const { amount, category, transactionType, transactionName } = req.body;
  const transaction = await Transaction.updateOne(
    { _id: transactionId },
    {
      $set: {
        transactionName,
        transactionType,
        amount,
        category,
        userId: req.user._id,
      },
    }
  );
  res.status(200).send("Transaction Updated Successfully");
};

const deleteTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const transaction = await Transaction.deleteOne({ _id: transactionId });
  res.send("Transaction Deleted Successfully").status(200);
};

const getWeeklyTransactions = async (req, res) => {
  const data = await Transaction.aggregate([
    {
      $match: {
        userId: req.user._id,
        createdAt: {
          $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        totalCredit: {
          $sum: {
            $cond: [{ $eq: ["$transactionType", "credit"] }, "$amount", 0],
          },
        },
        totalDebit: {
          $sum: {
            $cond: [{ $eq: ["$transactionType", "debit"] }, "$amount", 0],
          },
        },
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
  ]);
  res.send(data).status(200);
};

export {
  createTransaction,
  getTransactions,
  getAmount,
  updateTransaction,
  deleteTransaction,
  getWeeklyTransactions,
};
