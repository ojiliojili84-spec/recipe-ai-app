const express = require('express');
const router = express.Router();
const { generateRecipe, getRecipes } = require('../controllers/recipeController');

// POST /generate-recipe — generate a new recipe using AI and save it
router.post('/generate-recipe', generateRecipe);

// GET /recipes — retrieve all saved recipes
router.get('/recipes', getRecipes);

module.exports = router;
