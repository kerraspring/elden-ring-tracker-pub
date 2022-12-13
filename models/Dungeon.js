
const mongoose = require('mongoose');


const dungeonSchema = new mongoose.Schema({

    region:{
        type: String,
        required: true,
    },

    boss:{
        type: String,
        required: true,
    },

    keys:{
        type: String,
        required: true,
    },

    name:{
        type: String,
        required: true,
    },

    type:{
        type: String,
        required: true,
    }
},
{collection: 'dungeons'}
);

// module.exports = mongoose.model("dungeon", dungeonSchema);
const model = mongoose.model("dungeon", dungeonSchema);
model._dungeonSchema = dungeonSchema;
module.exports = model;