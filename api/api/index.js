import express from "express";
import animalsRoutes from "./routers/animals.routes.js"


const app = express();


app.use(animalsRoutes)

app.listen(4000);
console.log("server runnig in port 4000");


