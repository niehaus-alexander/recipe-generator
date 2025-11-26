import CardList from "@/components/CardList";
import RecipeForm from "@/components/RecipeForm";
import { useLanguage } from "@/lib/languageContext";
import { getCopy } from "@/lib/copy";

export default function CreatorPage({
  onSubmit,
  onDeleteRecipe,
  createdRecipes,
  onToggleFavorites,
  favoriteRecipes,
}) {
  const { language } = useLanguage();
  const t = getCopy(language);

  return (
    <div className="w-full bg-base-100">
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <p className="text-sm font-semibold text-primary mb-2">
          {t.creator.eyebrow}
        </p>
        <h1 className="text-4xl font-bold text-neutral">{t.creator.title}</h1>
        <p className="text-neutral/70 mt-2 max-w-2xl">
          {t.creator.body}
        </p>
      </header>
      <RecipeForm onSubmit={onSubmit} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold text-neutral">
            {t.creator.yourRecipes}
          </h2>
          <p className="text-sm text-neutral/60">
            {createdRecipes.length} {t.creator.saved}
          </p>
        </div>
      </div>
      <CardList
        favoriteRecipes={favoriteRecipes}
        recipes={createdRecipes}
        onDeleteRecipe={onDeleteRecipe}
        onToggleFavorites={onToggleFavorites}
      />
    </div>
  );
}
