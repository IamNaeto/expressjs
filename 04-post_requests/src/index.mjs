import express from "express"

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 3000;

const mockUsers = [
        {
            id: 1,
            userName: "naeto",
            displayName: "Charles Naeto"
        },
        {
            id: 2,
            userName: "zena",
            displayName: "Warrior Princess"
        },
        {
            id: 3,
            userName: "avatar",
            displayName: "Last Airbender"
        },
        {
            id: 4,
            userName: "jane",
            displayName: "Jane Francis"
        },
        {
            id: 5,
            userName: "jason",
            displayName: "Jason Jay"
        },
        {
            id: 6,
            userName: "henry",
            displayName: "Henry Harry"
        },
        {
            id: 7,
            userName: "marilyn",
            displayName: "Marilyn May"
        }
    ]

app.get("/", (request, response) => {
    response.status(201).send({"msg": "hello, welcome"})
});

app.get("/api/users", (request, response) => {
    console.log(request.query)
    const {
        query: { filter, value },
    } = request;

    if(filter && value) 
        return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
    );
    //When filter and value are undefined
    return response.send(mockUsers)
})

//Using the post method to send a new user to the server
app.post("/api/users", (request, response) => {
    const { body } = request
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
    mockUsers.push(newUser)
    return response.status(201).send(newUser)
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


//localhost:3000
//localhost:3000/api/users
//localhost:3000/api/products?key=value&key2=value2