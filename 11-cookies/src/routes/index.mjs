//This file serves as a bearer file for all our routes for easy exporting
import { Router } from "express";
import userRouter from "./users.mjs"; //importing userRouter
import productsRouter from "./products.mjs"; //importing productsRouter

const router = Router();

router.use(userRouter); //registering userRouter
router.use(productsRouter); //registering productsRouter

export default router;
