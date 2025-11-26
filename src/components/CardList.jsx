import Card from "./Card";

const CardList = ({
  recipes,
  onDeleteRecipe,
  onToggleFavorites,
  favoriteRecipes,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <ul className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 place-items-stretch">
        {recipes.map((recipe) => {
          return (
            <li key={recipe.id} className="h-full w-full flex">
              <Card
                favoriteRecipes={favoriteRecipes}
                data={recipe}
                onDeleteRecipe={onDeleteRecipe}
                onToggleFavorites={onToggleFavorites}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CardList;
