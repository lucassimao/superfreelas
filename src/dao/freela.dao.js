const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const Freela = new Schema({
  author: ObjectId,
  body: String,
  dateCreated: {type:Date,default: Date.now},
  country: String,
  state: String,
  city: String,
  title: String,
  description: String,
  priceRangeStart: {type:Number,min:0},
  priceRangeEnd: {type:Number,min:0},
  currency: String
});

module.exports = mongoose.model('Freela', Freela);

