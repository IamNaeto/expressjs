import express, { response } from "express"

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
        {
            id: 1,
            userName: "Naeto",
            displayName: "Charles Naeto"
        },
        {
            id: 2,
            userName: "Zena",
            displayName: "Warrior Princess"
        },
        {
            id: 3,
            userName: "Avatar",
            displayName: "Last Airbender"
        },
        {
            id: 4,
            userName: "Jane",
            displayName: "Jane Francis"
        }
    ]

app.get("/", (request, response) => {
    response.status(201).send({"msg": "hello, welcome"})
});

app.get("/api/users", (request, response) => {
    response.send(mockUsers)
})

app.get("/api/users/:id", (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id)
    console.log(parsedId)
    if(isNaN(parsedId)) return response.status(400).send({"msg": "Bad request. Invalid ID"});

    const findUser = mockUsers.find((user) => user.id === parsedId);
    if(!findUser) return response.sendStatus(404);
    return response.send(findUser)
})

app.get("/api/products", (request, response) => {
    response.send([
        {
            id: 123,
            name: "Chicken Breast",
            price: 12.99
        },
        {
            id: 124,
            name: "Chicken Laps",
            price: 15.99
        },
        {
            id: 125,
            name: "Chicken Wings",
            price: 20.99
        }
    ])
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})
