const mongoose = require("mongoose");
mongoose.connect("mongodb://ip-172-31-26-214.us-west-2.compute.internal/sdc2", {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Successfully connected to DB!");
});

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: { feature: String, value: String },
  related: [{ current_product_id: Number, related_product_id: Number }]
});

const Product = mongoose.model("Product", productSchema);

// const testProduct = new Product({
//   id: 000,
//   name: 'test',
//   slogan: 'test',
//   description: 'test',
//   category: 'test',
//   default_price: 'test',
//   features: { feature: 'test', value: 'test' },
//   styles: { style_id: 111, name: 'test', original_price: 'test', sale_price: 'test', photos: [{ thumbnail_url: 'test', url: 'test' }], skus: { XS: 1, S: 1, M: 1, L: 1, XL: 1 } },
// });

// testProduct.save(function (err, testProduct) {
//   if (err) {
//     console.log("err saving testproduct into db", err);
//   } else {
//     console.log("successfully saved test prod to create db");
//   }
// });

module.exports.db = db;
module.exports.Product = Product;
module.exports = mongoose.model("Product", productSchema);
