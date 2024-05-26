import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utilis/constants.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  //Registering and enabling session to express
  session({
    secret: "charles the dev",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

app.get("/", (request, response) => {
  console.log(request.session);
  console.log(request.session.id);
  request.session.visited = true; //modifying session data object
  response.cookie("hello", "world", { maxAge: 30000, signed: true });
  response.status(201).send({ msg: "Hello, welcome" });
});

//Creating a fake authentication system
app.post("/api/auth", (request, response) => {
  const {
    body: { userName, password },
  } = request;

  const findUser = mockUsers.find((user) => user.userName === userName);
  if (!findUser || findUser.password !== password)
    return response.status(401).send({ msg: "BAD CREDENTIALS" });

  request.session.user = findUser; //Attaching dynamic property of user to request.session and assigning finderuser to it
  return response.status(200).send(findUser);
});

app.get("/api/auth/status", (request, response) => {
  request.sessionStore.get(request.session.id, (err, session) => {
    console.log(session);
  });
  return request.session.user
    ? response
        .status(200)
        .send({ msg: "Authenticated", user: request.session.user })
    : response.status(401).send({ msg: "Not Authenticated" });
});

app.post("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
  const { body: item } = request;
  const { cart } = request.session;
  if (cart) {
    cart.push(item);
  } else {
    request.session.cart = [item];
  }
  return response.status(201).send(item);
});

app.get("/api/cart", (request, response) => {
  if (!request.session.user) return response.status(401);
  return response.send(request.session.cart ?? []);
});
