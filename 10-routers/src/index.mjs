import express from "express";
import routes from "./routes/index.mjs";

const app = express();

app.use(express.json());
app.use(routes); //Registering routes to express

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

app.get("/", (request, response) => {
  response.status(201).send({ msg: "hello, welcome" });
});
