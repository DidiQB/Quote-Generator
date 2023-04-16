// const database = require("./database");
import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { json } from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import { Quote } from "./models/quoteModels";
import Gallery from "../frontend/src/components/Gallery";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(`mongodb+srv://coderaiders5:${process.env.MA_PASSWORD}@coderaiders.9tgceeu.mongodb.net/Quote-Generator?retryWrites=true&w=majority`)
  .then(() => console.log('Connected!'));

app.use(cors());
app.use(json());

app.get('/', (req, res) => {
  res.send('Hello Node API')
})

console.log("Gallery in server",Gallery())

app.post('/quote', async (req, res) => {
  // console.log(req.body);
  // res.send(req.body)
  try {
    const title = "I am the title"
    res.status(201).json(title); // Return the saved quote as response
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})
// app.delete
// app.put


app.use("*", (req, res) => {
    res.status(400).json({
      message: "Trying to find easter eggs? There are only 3 end points!",
    });
  });
  
  app.listen(PORT, () =>
    console.log(`Listening on PORT:${PORT}`)
  );