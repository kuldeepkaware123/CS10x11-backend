//import
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//use case
const app = express();
app.use(express.json());
app.use(cors());

//database connection
mongoose.connect("mongodb://localhost:27017/cs10");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String
});

const Product = mongoose.model("Product", ProductSchema);

//-----------------------------------------------------

//app.post -> create the product
app.post("/product", async (req, res) => {
  const newproduct = new Product(req.body);
  await newproduct.save();
  res.send("New Product added!");
})

//app.get -> show the product
app.get("/product", async (req, res) => {
  const data = await Product.find();
  res.send(data);
});

// app.delete

app.delete("/product/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send("product deleted!");
})

// app.put

app.put("/product/:id", async(req,res)=>{
      await Product.findByIdAndUpdate(req.params.id, req.body);
  res.send("product updated!");
})

app.listen(5000, () => {
  console.log("Sever is running");
});
