import express from "express";
import {
  Result,
  query,
  validationResult,
  body,
  matchedData,
  checkSchema,
} from "express-validator";
import { createUserValidationSchema } from "./utilis/validationSchemas.mjs";

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

//Passing and using the body function to validate request body in the get method
app.get(
  "/api/users",
  query("filter")
    .isString()
    .withMessage("Must be a string")
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be at least 3-10 characters"),
  (request, response) => {
    const result = validationResult(request);
    console.log(result);
    const {
      query: { filter, value },
    } = request;

    if (filter && value)
      return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
      );
    //When filter and value are undefined
    return response.send(mockUsers);
  }
);

//Passing and using the checkSchema function to validate request body in the post method
app.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (request, response) => {
    const result = validationResult(request);
    console.log(result);

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
  }
);

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

//Passing and using the checkSchema function to validate request body in the put method
app.put(
  "/api/users/:id",
  checkSchema(createUserValidationSchema),
  resolveIndexByUserId,
  (request, response) => {
    const result = validationResult(request);
    console.log(result);

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);
    const { findUserIndex } = request;
    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...data };
    return response.sendStatus(200);
  }
);

//Passing and using the checkSchema function to validate request body in the patch method
app.patch(
  "/api/users/:id",
  checkSchema(createUserValidationSchema),
  resolveIndexByUserId,
  (request, response) => {
    const result = validationResult(request);
    console.log(result);

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);

    const { findUserIndex } = request;
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...data };
    return response.sendStatus(200);
  }
);

//Passing and using the middleware function in the delete method
app.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});
