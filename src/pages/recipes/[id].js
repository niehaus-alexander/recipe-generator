import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function RecipeDetailsPage({ createdRecipes, onUpdateRecipe }) {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  console.log(recipe);

  function mapMealDBToRecipe(mealData) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = mealData[`strIngredient${i}`];
      const measure = mealData[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
      }
    }

    return {
      name: mealData.strMeal,
      preparation: mealData.strInstructions,
      cuisine: mealData.strArea,
      ingredients: ingredients.join(", "),
    };
  }

  const { data, error } = useSWR(
    id ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : null
  );

  useEffect(() => {
    if (id) {
      const foundRecipe = createdRecipes.find((recipe) => recipe.id === id);
      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else if (data && data.meals && data.meals.length > 0) {
        const mealData = data.meals[0];
        const mappedRecipe = mapMealDBToRecipe(mealData);
        setRecipe(mappedRecipe);
      }
    }
  }, [id, data, createdRecipes]);

  if (error) return <div>Error loading recipe.</div>;
  if (!recipe)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  if (!id) return <div>Error: Recipe ID not found</div>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setEditFormData({
      name: recipe.name,
      cuisine: recipe.cuisine,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation,
      timeInMinutes: recipe.timeInMinutes,
      difficulty: recipe.difficulty,
      portions: recipe.portions,
    });
  };

  const handleSave = () => {
    const updatedRecipe = {
      ...recipe,
      ...editFormData,
    };
    onUpdateRecipe(updatedRecipe);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl p-6 m-6">
        {isEditing ? (
          <>
            <h2 className="card-title text-center text-3xl font-bold mb-4">
              <input
                className="input input-bordered w-full"
                name="name"
                value={editFormData.name}
                onChange={handleInputChange}
              />
            </h2>
            <div className="divider"></div>
            <p className="text-lg mb-2">
              <span className="font-semibold">Cuisine:</span>{" "}
              <input
                className="input input-bordered w-full"
                name="cuisine"
                value={editFormData.cuisine}
                onChange={handleInputChange}
              />
            </p>

            {recipe.ownRecipe && (
              <>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Duration:</span>{" "}
                  <input
                    className="input input-bordered w-full"
                    name="timeInMinutes"
                    value={editFormData.timeInMinutes}
                    onChange={handleInputChange}
                  />
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Difficulty:</span>{" "}
                  <input
                    className="input input-bordered w-full"
                    name="difficulty"
                    value={editFormData.difficulty}
                    onChange={handleInputChange}
                  />
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Portions:</span>{" "}
                  <input
                    className="input input-bordered w-full"
                    name="portions"
                    value={editFormData.portions}
                    onChange={handleInputChange}
                  />
                </p>
              </>
            )}
            <p className="text-lg mb-2">
              <span className="font-semibold">Ingredients:</span>{" "}
              <textarea
                className="textarea textarea-bordered w-full"
                name="ingredients"
                value={editFormData.ingredients}
                onChange={handleInputChange}
              />
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Preparation:</span>{" "}
              <textarea
                className="textarea textarea-bordered w-full"
                name="preparation"
                value={editFormData.preparation}
                onChange={handleInputChange}
              />
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="card-title text-center text-3xl font-bold mb-4">
              {recipe.name}
            </h2>
            <div className="divider"></div>
            <p className="text-lg mb-2">
              <span className="font-semibold">Cuisine:</span> {recipe.cuisine}
            </p>
            {recipe.ownRecipe && (
              <>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Duration:</span>{" "}
                  {recipe.timeInMinutes} minutes
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Difficulty:</span>{" "}
                  {recipe.difficulty}
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Portions:</span>{" "}
                  {recipe.portions}
                </p>
              </>
            )}
            <p className="text-lg mb-2">
              <span className="font-semibold">Ingredients:</span>{" "}
              {recipe.ingredients}
            </p>
            <p className="text-lg mb-4">
              <span className="font-semibold">Preparation:</span>{" "}
              {recipe.preparation}
            </p>
            {recipe.ownRecipe && (
              <div className="flex justify-end">
                <button className="btn btn-primary " onClick={toggleEditMode}>
                  Edit Recipe
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
