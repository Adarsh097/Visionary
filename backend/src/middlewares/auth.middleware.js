import jwt from "jsonwebtoken";
import User from "../models/User.js";

//! To check whether the user is authorized or not
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
        success: false,
      });
    }

    const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token",
        success: false,
      });
    }

    const userId = decoded.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in protectRoute middleware`, error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
