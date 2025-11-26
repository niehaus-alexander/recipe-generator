import AreaFilter from "@/components/AreaFilter";
import CardList from "@/components/CardList";
import useSWR from "swr";
import useLocalStorageState from "use-local-storage-state";
import { useLanguage } from "@/lib/languageContext";
import { getCopy } from "@/lib/copy";

export default function InspirationPage({
  onToggleFavorites,
  favoriteRecipes,
}) {
  const { language } = useLanguage();
  const t = getCopy(language);

  const [selectedCuisine, setSelectedCuisine] = useLocalStorageState(
    "selectedCuisine",
    { defaultValue: "Italian" }
  );
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCuisine}`
  );

  if (error)
    return (
      <div className="text-center pt-10 text-error flex flex-col items-center gap-4">
        <p>{language === "de" ? "Laden fehlgeschlagen." : "Failed to load."}</p>
        <button
          className="btn btn-sm btn-primary text-primary-content"
          onClick={() => mutate()}
        >
          {language === "de" ? "Erneut laden" : "Retry"}
        </button>
      </div>
    );
  if (isLoading)
    return (
      <div className="w-full min-h-screen bg-base-100">
        <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
          <p className="text-sm font-semibold text-primary mb-2">
            {t.inspiration.eyebrow}
          </p>
          <h1 className="text-4xl font-bold text-neutral">
            {t.inspiration.title}
          </h1>
          <p className="text-neutral/70 mt-2 max-w-2xl">
            {t.inspiration.loadingBody}
          </p>
        </header>
        <AreaFilter
          selectedCuisine={selectedCuisine}
          onCuisineFilter={handleCuisineFilter}
        />
        <div className="flex justify-center items-center mt-16">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );

  const recipeFetchData = data.meals.map((meal) => {
    return {
      name: meal.strMeal,
      id: meal.idMeal,
      cuisine: selectedCuisine,
      ingredients: "",
      preparation: "",
      isFetched: true,
    };
  });

  function handleCuisineFilter(event) {
    setSelectedCuisine(event.target.value);
  }

  return (
    <div className="w-full min-h-screen bg-base-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <p className="text-sm font-semibold text-primary mb-2">
          {t.inspiration.eyebrow}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <h1 className="text-4xl font-bold text-neutral">
            {t.inspiration.title}
          </h1>
          <p className="text-neutral/70 max-w-xl">
            {t.inspiration.body}
          </p>
        </div>
      </div>
      <AreaFilter
        selectedCuisine={selectedCuisine}
        onCuisineFilter={handleCuisineFilter}
      />
      <CardList
        favoriteRecipes={favoriteRecipes}
        onToggleFavorites={onToggleFavorites}
        recipes={recipeFetchData}
      />
    </div>
  );
}
