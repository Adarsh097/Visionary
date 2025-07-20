import express from "express";
import { signin, signup, logout, onboard } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/signin",signin);
router.post("/signup",signup);
router.post("/logout",logout);

router.post("/onboarding",protectRoute,onboard);

export default router;