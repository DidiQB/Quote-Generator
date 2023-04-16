// const database = require("./database");
import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { json } from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import { Quote } from "./quoteModels";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(json());


// Quotes Schema
const quoteSchema = mongoose.Schema ({
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }, 
    id: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
  }});

const Quote = mongoose.model('Quote', quoteSchema )

// Connection to Mongoose

mongoose.connect(`mongodb+srv://coderaiders5:${process.env.MA_PASSWORD}@coderaiders.9tgceeu.mongodb.net/Quote-Generator?retryWrites=true&w=majority`)
  .then(() => console.log('Connected!'));

// Middleware


// Endpoints

app.get('/', (req, res) => {
  res.send('Hello Node API')
})

// Get all quotes from MongoDB
app.get('/quotes', async(req, res) => {
  try {
    const allQuotes = await Quote.find();
    return res.status(200).json(allQuotes);
  } catch (error) {
    res.status(500).json({message: error.mmessage});
  }
})

// // Ge
// app.get('/quote', (req, res) => {
//   res.send('Hello Node API')
// })


app.delete('/quote/:id', async (req, res) => {
  try {
    const quoteId = req.params.id;
    const deleteQuote = await Quote.deleteOne({ _id: quoteId});
    if(deleteQuote.deletedCount === 0 ) {
      return res.status(400).json({message: 'Quote not found'});
    }
    res.status(200).json({message: 'Quote deleted succesfully'});
  } catch (error) {
    res.status(500).json({message: error.mmessage});
  }
 })

app.post('/quote', async (req, res) => {
  // console.log(req.body);
  // res.send(req.body)
  try {
    const savedQuote = await Quote.create(req.body)
    console.log('savedQuote in server', savedQuote);
    // Save the quote data to your backend as needed
    res.status(200).json(savedQuote);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})

// app.put


app.use("*", (req, res) => {
    res.status(400).json({
      message: "Trying to find easter eggs? There are only 3 end points!",
    });
  });
  
  app.listen(PORT, () =>
    console.log(`Listening on PORT:${PORT}`)
  );