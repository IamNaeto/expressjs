import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  response.send([
    {
      id: 123,
      name: "Chicken Breast",
      price: 12.99,
    },
    {
      id: 124,
      name: "Chicken Laps",
      price: 15.99,
    },
    {
      id: 125,
      name: "Chicken Wings",
      price: 20.99,
    },
  ]);
});

export default router;
