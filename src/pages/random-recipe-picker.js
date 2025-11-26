import { useState } from "react";
import Card from "@/components/Card";
import useSWR from "swr";
import { useLanguage } from "@/lib/languageContext";
import { getCopy } from "@/lib/copy";

export default function RandomRecipePickerPage({
  favoriteRecipes,
  onToggleFavorites,
}) {
  const [randomFavoritesRecipe, setRandomFavoritesRecipe] = useState(null);
  const { language } = useLanguage();
  const t = getCopy(language);

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `https://www.themealdb.com/api/json/v1/1/random.php`,
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  const randomFetchedRecipe =
    data && data.meals && data.meals.length > 0
      ? {
          name: data.meals[0].strMeal,
          id: data.meals[0].idMeal,
          cuisine: data.meals[0].strArea,
          ingredients: data.meals[0].strIngredient1
            ? Object.keys(data.meals[0])
                .filter((key) => key.startsWith("strIngredient"))
                .map((key) => data.meals[0][key])
                .filter(Boolean)
                .join(", ")
            : "",
          preparation: data.meals[0].strInstructions,
          isFetched: true,
        }
      : null;

  function handleFetchRandomRecipe() {
    mutate();
    console.log(randomFetchedRecipe);
  }

  function handlePickRandomFavoritesRecipe() {
    if (favoriteRecipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * favoriteRecipes.length);
      setRandomFavoritesRecipe(favoriteRecipes[randomIndex]);
    }
  }

  return (
    <div className="w-full min-h-screen bg-base-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        <header className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">
            {t.randomizer.eyebrow}
          </p>
          <h1 className="text-4xl font-bold text-neutral">
            {t.randomizer.title}
          </h1>
          <p className="text-neutral/70">
            {t.randomizer.body}
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-surface border border-base-300/60 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-neutral">
                {t.randomizer.favoritesTitle}
              </h2>
              <span className="badge badge-outline border-primary/60 bg-primary/10 text-primary">
                {favoriteRecipes.length} {t.randomizer.favoritesBadge}
              </span>
            </div>
            <p className="text-neutral/70 mb-4">
              {t.randomizer.favoritesCopy}
            </p>

            {favoriteRecipes.length === 0 ? (
              <p className="text-neutral/60">{t.randomizer.noFavorites}</p>
            ) : (
              <>
                <button
                  onClick={handlePickRandomFavoritesRecipe}
                  className="btn btn-primary text-primary-content shadow-md shadow-primary/30 mb-6"
                >
                  {t.randomizer.pickFavorite}
                </button>
                {randomFavoritesRecipe && (
                  <Card
                    onToggleFavorites={onToggleFavorites}
                    data={randomFavoritesRecipe}
                    favoriteRecipes={favoriteRecipes}
                  />
                )}
              </>
            )}
          </div>

          <div className="glass-surface border border-base-300/60 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-neutral">
                {t.randomizer.mealdbTitle}
              </h2>
              <a
                href="https://www.themealdb.com/api.php"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Source
              </a>
            </div>
            <p className="text-neutral/70 mb-4">
              {t.randomizer.mealdbCopy}
            </p>
            <button
              onClick={handleFetchRandomRecipe}
              className="btn btn-primary text-primary-content shadow-md shadow-primary/30 mb-6"
            >
              {t.randomizer.pickMealdb}
            </button>
            {isLoading && (
              <div className="flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            )}
            {error && (
              <p className="text-error font-semibold">{t.randomizer.error}</p>
            )}
            {randomFetchedRecipe && (
              <Card
                onToggleFavorites={onToggleFavorites}
                data={randomFetchedRecipe}
                favoriteRecipes={favoriteRecipes}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
