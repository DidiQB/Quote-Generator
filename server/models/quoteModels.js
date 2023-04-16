import mongoose from "mongoose";

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

  export const Quote = mongoose.model('Quote', quoteSchema )