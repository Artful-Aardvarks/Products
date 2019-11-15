const mongoose = require("mongoose");
const Product = require("../database/index.js");

//aggregate to get styles
const getStyles = id => {
  console.log("id", id);
  return Product.aggregate([
    {
      $match: {
        id: id
      }
    },
    {
      $project: { product_id: "$id" }
    },
    {
      $lookup: {
        from: "styles",
        let: { product_id: "$product_id" },
        pipeline: [{ $match: { $expr: { $eq: ["$id", "$$product_id"] } } }],
        as: "productStyles"
      }
    }
  ]).then(docs => {
    console.log("docs", docs);
    return docs;
  });
};

//aggregate to get skus
const getSkus = id => {
  return Product.aggregate([
    {
      $match: {
        id: id
      }
    },
    {
      $project: { product_id: "$id" }
    },
    {
      $lookup: {
        from: "skus",
        let: { product_id: "$product_id" },
        pipeline: [{ $match: { $expr: { $eq: ["$id", "$$product_id"] } } }],
        as: "productSkus"
      }
    }
  ]).then(docs => {
    console.log("docs", docs);
    return docs;
  });
};

//aggregate to get photos by product id
const getPhotos = id => {
  return Product.aggregate([
    {
      $match: {
        id: id
      }
    },
    {
      $project: { product_id: "$id" }
    },
    {
      $lookup: {
        from: "photos",
        let: { product_id: "$product_id" },
        pipeline: [{ $match: { $expr: { $eq: ["$id", "$$product_id"] } } }],
        as: "productPhotos"
      }
    }
  ]).then(docs => {
    console.log("docs", docs);
    return docs;
  });
};

module.exports.getStyles = getStyles;
module.exports.getSkus = getSkus;
module.exports.getPhotos = getPhotos;
