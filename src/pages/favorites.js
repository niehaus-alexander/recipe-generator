import CardList from "@/components/CardList";
import Link from "next/link";
import { useLanguage } from "@/lib/languageContext";
import { getCopy } from "@/lib/copy";

export default function FavoritesPage({ favoriteRecipes, onToggleFavorites }) {
  const { language } = useLanguage();
  const t = getCopy(language);

  return (
    <div className="min-h-screen w-full bg-base-100">
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 text-center sm:text-left">
        <p className="text-sm font-semibold text-primary mb-2">
          {t.favorites.eyebrow}
        </p>
        <h1 className="text-4xl font-bold text-neutral">
          {t.favorites.title}
        </h1>
        <p className="text-neutral/70 mt-2 max-w-2xl">
          {t.favorites.body}
        </p>
      </header>
      {favoriteRecipes.length > 0 ? (
        <CardList
          recipes={favoriteRecipes}
          onToggleFavorites={onToggleFavorites}
          favoriteRecipes={favoriteRecipes}
        />
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center glass-surface rounded-2xl border border-base-300/60">
          <h2 className="text-2xl font-semibold text-neutral mb-3">
            {t.favorites.emptyTitle}
          </h2>
          <p className="text-neutral/70 mb-6">
            {t.favorites.emptyBody}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/inspiration"
              className="btn btn-primary text-primary-content shadow-md shadow-primary/30"
            >
              {t.favorites.explore}
            </Link>
            <Link
              href="/creator"
              className="btn btn-ghost border border-base-300/70 hover:border-primary/60"
            >
              {t.favorites.create}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
