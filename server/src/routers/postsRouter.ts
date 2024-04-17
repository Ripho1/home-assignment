import express, { Request, Response } from "express";
import { createPost, deletePost, getPosts, likePost, updatePost } from "../providers/postsProvider";

// Route prefix is "/api/posts"
const router = express.Router();

router.get("/", (req: Request, res: Response): void => {
  try {
    const posts = getPosts();

    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(503).send({ message: "Error, please try again later" });
  }
});


router.post("/", (req: Request, res: Response): void => {
  try {
    const imageUrl: string | undefined = req.body.imageUrl;
    const content: string = req.body.content;
    const userId: number = req.body.userId;
    const date: string = req.body.date;

    const newPost = createPost(content, date, userId, imageUrl);

    res.send(newPost);
  } catch (error) {
    console.log(error);
    res.status(503).send({ message: "Error, please try again later" });
  }
});

router.delete("/", (req: Request, res: Response): void => {
  try {
    const id: number = req.body.id;

    const result = deletePost(id);

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(503).send({ message: "Error, please try again later" });
  }
});

router.put("/", (req: Request, res: Response): void => {
  try {
    const id: number = req.body.id;
    const imageUrl: string | undefined = req.body.imageUrl;
    const content: string = req.body.content;

    const result = updatePost(id, content, imageUrl);

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(503).send({ message: "Error, please try again later" });
  }
});

router.put("/likes", (req: Request, res: Response): void => {
  try {
    const id: number = req.body.id;
    const userId: number | undefined = req.body.userId;

    const result = likePost(id, userId);

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(503).send({ message: "Error, please try again later" });
  }
});

export default router;