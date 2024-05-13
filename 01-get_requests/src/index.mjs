import express from "express"

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
    response.status(201).send({"msg": "hello, welcome"})
});

app.get("/api/users", (request, response) => {
    response.send([
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
            id: 2,
            userName: "Avatar",
            displayName: "Last Airbender"
        }
    ])
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
