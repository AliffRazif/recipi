const express = require('express');
const { findById } = require('../models/recipe_schema');
const router = express.Router();

const recipeItem = require('../models/recipe_schema');

router.get('/', async (req,res) => {
  console.log(req.session.currentUser)
   try{
     res.json(await recipeItem.find({}))
   } catch {
     res.status(400).json(error)
   }
})


router.post('/', async (req,res) => {
  try{
    res.json(await recipeItem.create(req.body))
  }catch (error) {
    res.status(400).json(error)
  }
})


router.get('/:id',  async(req,res) => {
  try{
    res.json(await recipeItem.findById(req.params.id))
  }catch(error) {
    res.status(400).json(error)
  }
})



router.put('/:id', async (req,res) => {
  try{
    res.json(await recipeItem.findByIdAndUpdate(req.params.id, req.body, {new:true}))
  }catch(error){
    res.status(400).json(error)
  }
})

router.delete('/:id', async(req,res) => {
  try{
    res.json(await recipeItem.findByIdAndRemove(req.params.id)
    )
  }catch(error){
    res.status(400).json(error)
  }
})




module.exports = router;