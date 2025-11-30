import express from "express";
import cors from "cors";
import router from "./app/routes";
const app = express();

// middleware*********************************************************
app.use(express.json());
app.use(cors({
    origin: ["**"],
    credentials: true
}))

app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// error handler******************************************************

export default app;