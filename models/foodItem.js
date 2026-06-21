const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true,"Please enter food item name"],
        trim : true,
        maxLength:[100,"FoodItem name cannot be more than 100 chars"]
    },
    price:{
        type: Number,
        required:[true,"Please enter price"],
        maxLength:[5,"Item price cannot be more than 5 char"],
        default:0.0
    },
    description:{
        type: String,
        required:[true,"Please enter description"]
    },
    ratings:{
        type: Number,
        default: 0
    },
    images:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    menu:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Menu"
    },
    stock:{
        type:Number,
        required:[true,"Please enter quantity of items"],
        maxLength:[5,"FoodItems stock cannot be more than 5 char"],
        default:0
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant"
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt:{
        type:Date,
        defualt:Date.now()
    }
})

module.exports = mongoose.model("FoodItem", foodSchema)