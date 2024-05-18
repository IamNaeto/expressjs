import express, { request, response } from "express";

const app = express();

app.use(express.json());

//Assigning middleware to a variable and calling the next function
const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};

/**
//Enabling middleware globally
app.use(loggingMiddleware);

//Passing middleware in the app.use() method
app.use(loggingMiddleware, (request, response, next) => {
  console.log("Finished Logging....");
  next();
});
**/

//Declaring and making our findUserIndex logic reuseable using middleware
const resolveIndexByUserId = (request, response, next) => {
  const {
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  request.findUserIndex = findUserIndex;
  next();
};

const PORT = process.env.PORT || 3000;

const mockUsers = [
  {
    id: 1,
    userName: "naeto",
    displayName: "Charles Naeto",
  },
  {
    id: 2,
    userName: "zena",
    displayName: "Warrior Princess",
  },
  {
    id: 3,
    userName: "avatar",
    displayName: "Last Airbender",
  },
  {
    id: 4,
    userName: "jane",
    displayName: "Jane Francis",
  },
  {
    id: 5,
    userName: "jason",
    displayName: "Jason Jay",
  },
  {
    id: 6,
    userName: "henry",
    displayName: "Henry Harry",
  },
  {
    id: 7,
    userName: "marilyn",
    displayName: "Marilyn May",
  },
];

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

app.get(
  "/",
  (request, response, next) => {
    console.log("Base URL1");
    next();
  } /*Enabling the middleware and calling the next function for this specific endpoint */,
  (request, response, next) => {
    console.log("Base URL2");
    next();
  } /*Enabling the middleware and calling the next function for this specific endpoint */,
  (request, response, next) => {
    console.log("Base URL3");
    next();
  } /*Enabling the middleware and calling the next function for this specific endpoint */,
  (request, response) => {
    response.status(201).send({ msg: "hello, welcome" });
  }
);

app.get("/api/users", (request, response) => {
  console.log(request.query);
  const {
    query: { filter, value },
  } = request;

  if (filter && value)
    return response.send(
      mockUsers.filter((user) => user[filter].includes(value))
    );
  //When filter and value are undefined
  return response.send(mockUsers);
});

//Using the post method to send a new user to the server
app.post("/api/users", (request, response) => {
  const { body } = request;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return response.status(201).send(newUser);
});

//Passing and using the middleware function in the get method
app.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  // const parsedId = parseInt(request.params.id);
  // console.log(parsedId);
  // if (isNaN(parsedId))
  //   return response.status(400).send({ msg: "Bad request. Invalid ID" });

  // const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

app.get("/api/products", (request, response) => {
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

//Passing and using the middleware function in the put method
app.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

//Passing and using the middleware function in the patch method
app.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

//Passing and using the middleware function in the delete method
app.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});
