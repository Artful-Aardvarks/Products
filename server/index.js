const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const Product = require("../database/index.js");
const Style = require("../database/index.js");
const { getStyles } = require("../models/Product.js");
const { getSkus } = require("../models/Product.js");
const { getPhotos } = require("../models/Product.js");

// const router = require('./routes.js');

app.use(bodyParser.json());

// app.use('/products', router);

//get product list (limited to 100 at a time)
app.get("/products", function(req, res) {
  Product.find()
    .limit(100)
    .then(results => {
      console.time("querygetall");
      res.send(results);
      console.timeEnd("querygetall");
    })
    .catch(err => {
      console.log("err in get request", err);
      res.sendStatus(500);
    });
});

//get a single products information
app.get(`/products/:id`, function(req, res) {
  Product.findOne({ id: req.params.id })
    .then(results => {
      console.time("getProdInfo");
      console.log("hereherehere", results);
      res.status(200).send(results);
      console.timeEnd("getProdInfo");
    })
    .catch(err => {
      console.log("err in get prod info", err);
      res.sendStatus(500);
    });
});

app.get(`/productsStyles/:id`, function(req, res) {
  let id = Number(req.params.id);

  getStyles(id)
    .then(results => {
      console.log("styles here", results);
      res.send(results);
    })
    .catch(err => {
      console.log("err in styles", err);
      res.sendStatus(500);
    });
});

app.get(`/productSkus/:id`, function(req, res) {
  let id = Number(req.params.id);
  getSkus(id)
    .then(results => {
      console.log("skus here", results);
      res.send(results);
    })
    .catch(err => {
      console.log("err in skus", err);
      res.sendStatus(500);
    });
});

app.get(`/productPhotos/:id`, function(req, res) {
  let id = Number(req.params.id);
  getPhotos(id)
    .then(results => {
      console.log("photos here", results);
      res.send(results);
    })
    .catch(err => {
      console.log("err in photos", err);
      res.sendStatus(500);
    });
});

app.get(`/products/:id/related`, function(req, res) {
  Product.find({ id: req.params.id })
    .then(results => {
      console.log("related results here", results.related);
      res.status(200).send(results);
    })
    .catch(err => {
      console.log("err in related products", err);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
