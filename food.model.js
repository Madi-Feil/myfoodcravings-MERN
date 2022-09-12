const mongoose = require("mongoose");

const RecipeSchema = {
    recipeName: {
        type: String,
        required: [true, "Recipe name is required"],
        minLength: [3, "Recipe name must be at least 3 characters long"],
    },
    duration: {
        type: String, 
        required: [true, "Duration time is required"],
        minLength: [3, "duration must be at least 3 characters long"],
    },
    ingrediants: {
        type: String,
        required: [true, "Ingrediants are required"],
        minLength: [3, "Ingrediants must be at least 3 characters long"],
    },
    chefName: {
        type: String,
        required: [true, "Chef's name is required"],
    },
    chefNote: {
        type: String,
        required: [false],
    },
    instructions: {
        type: String,
        required: [true, "Instructions are required"],
        minLength: [3, "Instructions must be at least 3 characters long"],
    },
};

module.exports = mongoose.model("Recipe", RecipeSchema);