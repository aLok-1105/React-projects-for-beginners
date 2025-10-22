import React, { useState } from "react";
import "./App.css";

export default function RecipeSearch() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // 🔍 Search recipes by ingredient
  const searchRecipes = async (e) => {
    e.preventDefault();
    if (!ingredient.trim()) return;

    setLoading(true);
    setError(null);
    setRecipes([]);
    setSelectedRecipe(null);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await res.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError("No recipes found for that ingredient.");
      }
    } catch (err) {
      setError("Error fetching recipes.");
    } finally {
      setLoading(false);
    }
  };

  // 📖 Get full recipe details when user clicks
  const viewRecipeDetails = async (id) => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();
      setSelectedRecipe(data.meals[0]);
    } catch (err) {
      alert("Error loading recipe details.");
    }
  };

  // ❌ Close modal
  const closeModal = () => setSelectedRecipe(null);

  return (
    <div className="container">
      <h1>🍳 Recipe Finder</h1>

      <form onSubmit={searchRecipes}>
        <input
          type="text"
          placeholder="Enter an ingredient (e.g. chicken)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {recipes.map((meal) => (
          <div
            className="card"
            key={meal.idMeal}
            onClick={() => viewRecipeDetails(meal.idMeal)}
          >
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h4>{meal.strMeal}</h4>
          </div>
        ))}
      </div>

      {/* 🍲 Recipe Details Modal */}
      {selectedRecipe && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()} // prevent overlay close when clicking inside
          >
            <button className="close-btn" onClick={closeModal}>
              ✖
            </button>
            <h2>{selectedRecipe.strMeal}</h2>
            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
            />
            <h3>Ingredients:</h3>
            <ul>
              {Array.from({ length: 20 }, (_, i) => i + 1)
                .map((i) => ({
                  ingredient: selectedRecipe[`strIngredient${i}`],
                  measure: selectedRecipe[`strMeasure${i}`],
                }))
                .filter((item) => item.ingredient && item.ingredient.trim())
                .map((item, idx) => (
                  <li key={idx}>
                    {item.ingredient} — {item.measure}
                  </li>
                ))}
            </ul>

            <h3>Instructions:</h3>
            <p>{selectedRecipe.strInstructions}</p>
          </div>
        </div>
      )}
    </div>
  );
}
