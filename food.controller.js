const Recipe = require("../models/food.model");

const createNewRecipe = (req, res) => {
    Recipe.create(req.body)
    .then((newRecipe) => {
        res.json({ newRecipe });
    })
    .catch((err) => {
        res.status(400).json({ err });
    });
};

const getAllRecipes = (req, res) => {
    Recipe.find()
    .then((allRecipes) => {
        res.json(allRecipes);
    })
    .catch((err) => {
        res.status(400).json({ err });
    });
};

const getOneRecipe = (req, res) => {
    Recipe.findOne({ _id: req.params.id })
    .then((queriedRecipe) => {
        res.json(queriedRecipe);
    })
    .catch((err) => {
        res.status(400).json({ err });
    });
};

const updateRecipe = (req, res) => {
    Recipe.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true, 
    })
    .then((updatedRecipe) => {
        res.json({ updatedRecipe });
    })
    .catch((err) => {
        res.status(400).json({ err });
    });
};

const deleteExsistingRecipe = (req, res) => {
    Recipe.deleteOne({ _id: req.params.id })
    .then((deletedRecipe) => {
        res.json({ deletedRecipe });
    })
    .catch((err) => {
        res.status(400).json({ err });
    });
};

module.exports = {
    createNewRecipe,
    getAllRecipes,
    getOneRecipe,
    updateRecipe,
    deleteExsistingRecipe,
};