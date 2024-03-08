import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    transactionName: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
