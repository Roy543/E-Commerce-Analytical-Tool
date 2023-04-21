const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    Uniq_Id : {
        type: String
    },

    Crawl_Timestamp : {
        type: String
    },

    Category: {
        type: String
    },
    
    Product_Name: {
        type: String
    },
    
    Product_Description: {
        type: String
    },
    
    Brand: {
        type: String
    },
    
    Pack_Size: {
        type: String
    },
    
    Price: {
        type: Number
    },
    
    Discount_Price: {
        type: Number
    },
    
    Dis_Percentage: {
        type: Number
    },
    
    Site: {
        type: String
    },
    
    Rating: Number,
    
    Sold_Quantity: {
        type: Number
    },
    
    Stock_Availibility: {
        type: Boolean
    },
    
    Url: {
        type: String
    }
})

const productDetails = mongoose.model('productDetails', productSchema)

module.exports = productDetails