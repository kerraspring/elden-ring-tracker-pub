
const mongoose = require('mongoose');


const questSchema = new mongoose.Schema({

    name:{
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

module.exports = mongoose.model("quest", questSchema);