import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useLanguage } from "@/lib/languageContext";
import { getCopy } from "@/lib/copy";

export default function RecipeDetailsPage({ createdRecipes, onUpdateRecipe }) {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const { language } = useLanguage();
  const t = getCopy(language);

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

  if (error)
    return (
      <div className="text-center pt-10 text-error">
        {language === "de"
          ? "Fehler beim Laden des Rezepts."
          : "Error loading recipe."}
      </div>
    );
  if (!recipe)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  if (!id)
    return (
      <div className="text-center pt-10 text-error">
        {language === "de"
          ? "Fehler: Rezept-ID nicht gefunden."
          : "Error: Recipe ID not found"}
      </div>
    );

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
    <div className="min-h-screen bg-base-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="glass-surface border border-base-300/70 rounded-2xl shadow-xl p-6 sm:p-8">
          {isEditing ? (
            <>
              <div className="flex items-center justify-between gap-4 mb-4">
                <input
                  className="input input-bordered w-full text-3xl font-bold"
                  name="name"
                  value={editFormData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <input
                  className="input input-bordered w-full sm:w-auto"
                  name="cuisine"
                  value={editFormData.cuisine}
                  onChange={handleInputChange}
                  placeholder={t.form.cuisine}
                />
                {recipe.ownRecipe && (
                  <>
                    <input
                      className="input input-bordered w-full sm:w-auto"
                      name="timeInMinutes"
                      value={editFormData.timeInMinutes}
                      onChange={handleInputChange}
                      placeholder={t.form.duration}
                    />
                    <input
                      className="input input-bordered w-full sm:w-auto"
                      name="difficulty"
                      value={editFormData.difficulty}
                      onChange={handleInputChange}
                      placeholder={t.form.difficulty}
                    />
                    <input
                      className="input input-bordered w-full sm:w-auto"
                      name="portions"
                      value={editFormData.portions}
                      onChange={handleInputChange}
                      placeholder={t.form.portions}
                    />
                  </>
                )}
              </div>

              <div className="space-y-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-neutral font-semibold">
                      {t.recipeDetail.ingredients}
                    </span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    name="ingredients"
                    value={editFormData.ingredients}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-neutral font-semibold">
                      {t.recipeDetail.preparation}
                    </span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    name="preparation"
                    value={editFormData.preparation}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </label>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button className="btn btn-ghost" onClick={handleCancel}>
                  {t.recipeDetail.cancel}
                </button>
                <button
                  className="btn btn-primary text-primary-content"
                  onClick={handleSave}
                >
                  {t.recipeDetail.save}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <p className="uppercase text-xs tracking-[0.2em] text-primary mb-1">
                    {recipe.ownRecipe
                      ? t.recipeDetail.yourCreation
                      : t.recipeDetail.fetched}
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-bold text-neutral">
                    {recipe.name}
                  </h1>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-outline border-primary/60 bg-primary/10 text-primary">
                    {recipe.cuisine}
                  </span>
                  {recipe.ownRecipe && recipe.timeInMinutes && (
                    <span className="badge badge-outline border-amber-400/60 bg-amber-100/60 text-amber-900">
                      {recipe.timeInMinutes} min
                    </span>
                  )}
                  {recipe.ownRecipe && recipe.difficulty && (
                    <span className="badge badge-outline border-neutral/30 bg-neutral/5 capitalize">
                      {recipe.difficulty}
                    </span>
                  )}
                  {recipe.ownRecipe && recipe.portions && (
                    <span className="badge badge-outline border-primary/40 bg-primary/5">
                      {recipe.portions} {t.form.portions.toLowerCase()}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4 text-neutral/90">
                <div>
                  <p className="text-sm font-semibold text-neutral mb-1">
                    {t.recipeDetail.ingredients}
                  </p>
                  <p className="leading-relaxed whitespace-pre-line">
                    {recipe.ingredients}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral mb-1">
                    {t.recipeDetail.preparation}
                  </p>
                  <p className="leading-relaxed whitespace-pre-line">
                    {recipe.preparation}
                  </p>
                </div>
              </div>
              {recipe.ownRecipe && (
                <div className="flex justify-end mt-6">
                  <button
                    className="btn btn-primary text-primary-content"
                    onClick={toggleEditMode}
                  >
                    {t.recipeDetail.edit}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
