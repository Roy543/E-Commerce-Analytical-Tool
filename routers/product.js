const e = require('express');
const express = require('express');
const { count } = require('../model/product');
var cors = require('cors');

const productDetails = require('../model/product')
const app = express();

app.use(function (req, res, next) {

  

  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

 
  res.setHeader('Access-Control-Allow-Credentials', true);


  
  next();
});
app.options('*', cors())

const router = new express.Router()

//Best Selling Product
router.post('/bSellPro', async(req, res) => {
    const reqBody = req.body;
    
    try{
        const products =await productDetails.
        find(    
            { "Site": {"$in": reqBody.sites ? reqBody.sites : ["Amazon", "ebay", "flipkart"] }}).
        sort({ Sold_Quantity : -1}).limit(50);
        res.status(200).send({
            items: products,
            total_items: products.length
        })
    }
    catch{
        console.log("Something went wrong");
        res.status(400).send("Something went wrong")
    }
})


//Best Rated Product
router.post('/bRatedPro', async(req, res) => {
    const reqBody = req.body;
    
    try{
        const products =await productDetails.
        find(    
            { "Site": {"$in": reqBody.sites ? reqBody.sites : ["Amazon", "ebay", "flipkart"] },
             "Category": {"$in": reqBody.category ? reqBody.category : ["Hair Care", "Juices", "Baking", "Oral Care", "Chocolates", "Household", "Creams", "Paper & Disposables", "Masalas", "Body Wash", "Atta & Flours","Ready To Cook", "Cleaners", "Ketchups & Spreads", "Pooja Needs", "Repellants & Fresheners","Biscuits", "Soft Drinks", "Tea", "Noodles & Pasta", "Jams & Honey"] }}).
        sort({ Rating : -1}).limit(50);
        res.status(200).send({
            items: products,
            total_items: products.length
        })
    }
    catch{
        console.log("Something went wrong");
        res.status(400).send("Something went wrong")
    }
})

//Most Discounted Product
router.post('/mDisPro', async(req, res) => {
    const reqBody = req.body;
    
    try{
        const products =await productDetails.
        find(    
            { "Site": {"$in": reqBody.sites ? reqBody.sites : ["Amazon", "ebay", "flipkart"] },
             "Category": {"$in": reqBody.category ? reqBody.category : ["Hair Care", "Juices", "Baking", "Oral Care", "Chocolates", "Household", "Creams", "Paper & Disposables", "Masalas", "Body Wash", "Atta & Flours","Ready To Cook", "Cleaners", "Ketchups & Spreads", "Pooja Needs", "Repellants & Fresheners","Biscuits", "Soft Drinks", "Tea", "Noodles & Pasta", "Jams & Honey"] }}).
        sort({ Dis_Percentage : -1}).limit(50);
        res.status(200).send({
            items: products,
            total_items: products.length
        })
    }
    catch{
        console.log("Something went wrong");
        res.status(400).send("Something went wrong")
    }
})

//Items per category

router.post('/totalitemsCat', async(req, res) => {
    const reqBody = req.body;
    
    try{
        const itemsCat =await productDetails.aggregate([
            {
              $group: {
                _id: {
                  cat: "$Category",
               
                },
                total: {
                  "$sum": 1
                }
              }
            }

          ]).sort({total: -1})
       
        res.status(200).send({
            items: itemsCat
        })
    }
    catch{
        console.log("Something went wrong");
        res.status(400).send("Something went wrong")
    }
})

//Total Available Category

router.post('/totalCat', async(req, res) => {
    const reqBody = req.body;
    
    try{
        const totalCat =await productDetails.aggregate([
            {
              $group: {
                _id: {
                  cat: "$Category",
                },
                total: {
                  "$sum": 1
                }
              }
            }

          ])
       
        res.status(200).send({
            total_categories: totalCat.length
        })
    }
    catch{
        console.log("Something went wrong");
        res.status(400).send("Something went wrong")
    }
})

// Total product under particular brand

router.post('/totalProBrand', async(req, res) => {
    const reqBody = req.body;
    
    try{
        const totalSoldItems =await productDetails.aggregate([
                {
                  $group: {
                    _id: {
                      cat: "$Brand",
                    },
                    total: {
                      "$sum": 1
                    }
                  }
                },
                {
                  $group: {
                    _id: "$_id.cat",
                    total_items: {
                      "$sum": 1
                    }
                  }
                }
              ]).sort({ total_items : -1})
       
        res.status(200).send({
            items: totalSoldItems,
            total_item_sold: totalSoldItems.length
        })
    }
    catch{
        console.log("Something went wrong");
        res.status(400).send("Something went wrong")
    }
})

//Most Popular brands

router.post('/mPopBrand', async(req, res) => {
    const reqBody = req.body;
    
    try{
        const totalSoldItems =await productDetails.aggregate([
                {
                  $group: {
                    _id: {
                      brand: "$Brand",
                    //   sold: "$Sold_Quantity"
                    },
                    total_sold_items: {
                      "$sum": "$Sold_Quantity",
                    },
                    total_items:{
                        $sum: 1
                    }
                  }
                },
              ]).sort({ total_sold_items : -1})
       
        res.status(200).send({
            items: totalSoldItems,
            total_item_sold: totalSoldItems.length
        })
    }
    catch{
        console.log("Something went wrong");
        res.status(400).send("Something went wrong")
    }
})


module.exports = router