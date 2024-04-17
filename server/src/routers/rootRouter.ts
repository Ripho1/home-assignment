import express from "express";
import usersRouter from "./usersRouter";
import postsRouter from "./postsRouter";

// Route prefix is "/api"
const router = express.Router();

router.use("/users", usersRouter);
router.use("/posts", postsRouter);

export default router;