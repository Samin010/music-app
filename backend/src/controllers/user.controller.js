import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const curretUserId = req.auth.userId;
    const user = await User.find({ clerkId: { $ne: curretUserId } });
    res.status(200).json(200);
  } catch (error) {
    next(error);
  }
};
