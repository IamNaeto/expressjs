import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  console.log(request.headers.cookie);
  console.log(request.cookies);
  console.log(request.signedCookies.hello);
  if (request.signedCookies.hello && request.signedCookies.hello === "world")
    return response.send([
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

  return response
    .status(403)
    .send({ msg: "Sorry, You need the correct cookie" });
});

export default router;
