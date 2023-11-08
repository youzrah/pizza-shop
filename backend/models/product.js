const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter pizza name'],
        trim: true,
        maxLength: [100, 'Pizza name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter the price'],
        maxLength: [5, 'The Price cannot exceed 5 digits'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter pizza description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this pizza'],
        enum: {
            values: [
                'Neapolitan Pizza',
                'Neapolitan Pizza',
                'New York-Style Pizza',
                'Chicago-Style Pizza',
                'Sicilian Pizza',
                'Margherita Pizza',
                'Pepperoni Pizza',
                'Hawaiian Pizza',
                'Vegetarian Pizza',
                'Meat Lovers Pizza',
                'BBQ Chicken Pizza',
                'White Pizza',
                'Seafood Pizza',
            ],
            message: 'Please select correct category for pizza'
        }
    },
    stock: {
        type: Number,
        required: [true, 'Please enter stock'],
        maxLength: [5, 'Piza stock cannot exceed 5 digits'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            // user: {
            //     type: mongoose.Schema.ObjectId,
            //     ref: 'User',
            //     required: true
            // },
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
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);