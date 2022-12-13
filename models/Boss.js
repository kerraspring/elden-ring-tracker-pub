
const mongoose = require('mongoose');


const bossSchema = new mongoose.Schema({

    region:{
        type: String,
        required: true,
    },

    name:{
        type: String,
        required: true,
    },

    location:{
        type: String,
        required: true,
    },

    night:{
        type: Boolean,
        required: true
    }
},
{collection: 'bosses'}
);

// module.exports = mongoose.model("boss", bossSchema);
const model = mongoose.model("boss", bossSchema);
model._bossSchema = bossSchema;
module.exports = model;