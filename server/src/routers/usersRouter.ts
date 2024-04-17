import express, { Request, Response } from "express";
import { getUsers } from "../providers/usersProvider";

// Route prefix is "/api/users"
const router = express.Router();

router.get("/", (req: Request, res: Response): void => {
  try {
    const users = getUsers();

    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(503).send({ message: "Error, please try again later" });
  }
});

export default router;