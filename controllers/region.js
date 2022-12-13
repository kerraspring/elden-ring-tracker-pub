const mongoose = require("mongoose");
const dungeon = require("../models/Dungeon");
const boss = require("../models/Boss");
const User = require("../models/User");

module.exports = {

    getDungeonsAndBosses: async (req, res) => {
        try {
            const dungeons = await dungeon.find( { region: req.params.region } );
            const bosses = await boss.find( { region: req.params.region } );
            res.render('region', { dungeons: dungeons, bosses: bosses });

            // get array of user's completed items 
            if (req.user && req.user._id) {
              const user = await User.findById(req.user._id);
              const completed = user.completedItems
              // console.log(completed)
            // res.json({ completed });
            }

        } catch (err) {
            console.log(err);
        }
    },

    markComplete: async (req, res) => {
      console.log(req.body)
        try {
          if (req.user && req.user._id) {
            const user = await User.findById(req.user._id);
            user.completedItems.push(req.body.itemComplete);
            await user.save();
            console.log('Marked Complete');
          } else {
            // Handle the case where the req.user object is undefined or does not have an id property
            console.log('Cannot mark item complete because user is not logged in or user id is missing');
          }
        } catch (err) {
          console.log(err);
        }
      },
      getCompleted: async (req,res)=>{
        try{
          if (req.user && req.user._id) {
            const user = await User.findById(req.user._id);
            const completed = user.completedItems
            // console.log(completed)
            res.json({ completed });
          }
        }catch(err){
            console.log(err)
        }
    },
    }
