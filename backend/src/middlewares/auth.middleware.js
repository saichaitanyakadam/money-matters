import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookie?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) res.status(401).send("Unauthorized request");
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select("-password");
    if (!user) res.status(401).send("Invalid Access Token");
    req.user = user;
    next();
  } catch (error) {
    throw new Error(error);
  }
};

export { verifyJWT };
