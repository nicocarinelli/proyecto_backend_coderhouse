import mongoose from 'mongoose'

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    role: String,
    cart: {
        type: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "carts"
            }
        }],
        unique: true
    },
    tickets: {
        type: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "tickets"
            }
        }],
        default: []
    }
})

userSchema.pre('find', function() {this.populate('cart.id')})
userSchema.pre('findOne', function() {this.populate('cart.id')})
userSchema.pre('findById', function() {this.populate('cart.id')})

userSchema.pre('find', function() {this.populate('tickets.id')})
userSchema.pre('findOne', function() {this.populate('tickets.id')})
userSchema.pre('findById', function() {this.populate('tickets.id')})

const UserModel = mongoose.model(userCollection, userSchema)

export default UserModel