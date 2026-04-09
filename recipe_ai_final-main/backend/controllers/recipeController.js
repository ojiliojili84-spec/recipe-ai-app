const axios = require("axios");
const Recipe = require("../models/Recipe");

// POST /generate-recipe
async function generateRecipe(req, res) {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ message: "Please provide a non-empty ingredients array." });
  }

  const ingredientList = ingredients.join(", ");

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content: `You are a professional chef assistant. Return ONLY valid JSON in this format:
{
  "recipeName": "string",
  "ingredients": ["string"],
  "steps": ["string"]
}`
          },
          {
            role: "user",
            content: `Create a recipe using these ingredients: ${ingredientList}`
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const rawContent = response.data.choices[0].message.content;

    let parsedRecipe;

    try {
      // 🔥 STRONG JSON EXTRACTION (fixes your issue)
      const match = rawContent.match(/\{[\s\S]*\}/);

      if (!match) {
        throw new Error("No JSON found");
      }

      parsedRecipe = JSON.parse(match[0]);

    } catch (err) {
      console.error("Raw AI response:", rawContent);
      return res.status(500).json({ message: "AI returned invalid JSON." });
    }

    const { recipeName, ingredients: recipeIngredients, steps } = parsedRecipe;

    if (
      typeof recipeName !== "string" ||
      !Array.isArray(recipeIngredients) ||
      !Array.isArray(steps)
    ) {
      return res.status(500).json({ message: "Invalid recipe format from AI." });
    }

    const saved = await Recipe.create({
      recipeName,
      ingredients: recipeIngredients,
      steps
    });

    return res.status(201).json({ recipe: saved });

  } catch (error) {
    console.error("Error generating recipe:", error.response?.data || error.message);
    return res.status(500).json({ message: "Failed to generate recipe." });
  }
}

// GET /recipes
async function getRecipes(_req, res) {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    return res.json({ recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return res.status(500).json({ message: "Failed to fetch recipes." });
  }
}

module.exports = { generateRecipe, getRecipes };