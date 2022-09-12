const foodController = require("../controllers/food.controller");

module.exports = (app) => {
    app.post("/api/food", foodController.createNewRecipe);
    app.get("/api/food", foodController.getAllRecipes);
    app.get("/api/food/:id", foodController.getOneRecipe);
    app.put("/api/food/:id", foodController.updateRecipe);
    app.delete("/api/food/:id", foodController.deleteExsistingRecipe);
};