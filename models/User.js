const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },

    completedItems:{
        type: Array,
        required: false,
    },
},
{collection: 'users'}
);

userSchema.plugin(passportLocalMongoose);
const model = mongoose.model("user", userSchema);
model._userSchema = userSchema;
module.exports = model;
