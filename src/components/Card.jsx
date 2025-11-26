import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { useLanguage } from "@/lib/languageContext";
import { getCopy } from "@/lib/copy";

const Card = ({ data, onDeleteRecipe, onToggleFavorites, favoriteRecipes }) => {
  const [deleteMode, setDeleteMode] = useState(false);
  const router = useRouter();
  const { language } = useLanguage();
  const t = getCopy(language);

  const isFavorite = favoriteRecipes.some((recipe) => recipe.id === data.id);
  return (
    <div className="group relative h-full w-full max-w-sm sm:max-w-md rounded-2xl border border-base-300/70 bg-base-100/90 p-6 shadow-lg shadow-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="uppercase tracking-[0.1em] text-xs text-neutral/60 mb-1">
              {router.pathname === "/creator" && data.ownRecipe
                ? t.card.yourCreation
                : t.card.chefsPick}
            </p>
            <h2 className="text-2xl font-bold leading-tight text-neutral">
              {data.name}
            </h2>
          </div>
          <button
            onClick={() => onToggleFavorites(data)}
            className={`h-11 w-11 grid place-items-center rounded-full border transition-all duration-200 ${
              isFavorite
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-base-300 bg-base-100 text-neutral/60 hover:border-primary/40 hover:text-primary"
            }`}
            aria-label="Toggle favorite"
            aria-pressed={isFavorite}
          >
            <FontAwesomeIcon icon={faStar} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="badge badge-outline border-primary/50 bg-primary/10 text-primary font-semibold">
            {data.cuisine}
          </span>
          {router.pathname !== "/inspiration" && data.timeInMinutes && (
            <span className="badge badge-outline border-amber-400/60 bg-amber-100/60 text-amber-900 font-semibold">
              {data.isFetched ? "?" : `${data.timeInMinutes} min`}
            </span>
          )}
          {router.pathname !== "/inspiration" && data.difficulty && (
            <span className="badge badge-outline border-neutral/20 bg-neutral/5 text-neutral font-semibold capitalize">
              {data.isFetched ? "?" : data.difficulty}
            </span>
          )}
        </div>

        <p className="text-sm text-neutral/80 max-h-12 overflow-hidden">
          {data.preparation || t.card.fallback}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          {!deleteMode ? (
            <Link
              href={`/recipes/${data.id}`}
              className="btn btn-sm sm:btn-md btn-primary text-primary-content shadow-md shadow-primary/20"
            >
              {t.card.viewDetails}
            </Link>
          ) : (
            <button
              onClick={() => onDeleteRecipe(data.id)}
              className="btn btn-sm sm:btn-md btn-error text-error-content"
            >
              {t.card.confirmDelete}
            </button>
          )}

          {router.pathname === "/creator" && data.ownRecipe && (
            <button
              onClick={() => setDeleteMode(!deleteMode)}
              className={`btn btn-ghost btn-sm sm:btn-md text-sm font-semibold ${
                deleteMode ? "text-neutral" : "text-error"
              }`}
            >
              {deleteMode ? t.card.cancel : t.card.delete}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
