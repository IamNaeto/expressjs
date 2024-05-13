import express from "express"

const app = express();

const PORT = process.env.PORT || 3000;

//.listen method allows to listen to a port for incoming request. This is actually what starts the express server on a specific port and then we can begin receiving incoming http request

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})

// Running npm run start:dev will start our application using nodemon in a watch mood. Navigating to localhost:3000 in our browser will get and display the output.