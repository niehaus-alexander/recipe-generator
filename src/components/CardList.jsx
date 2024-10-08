import Card from "./Card";

const CardList = ({
  recipes,
  onDeleteRecipe,
  onToggleFavorites,
  favoriteRecipes,
}) => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <ul className="flex justify-center flex-row items-center mt-5 flex-wrap">
        {recipes.map((recipe) => {
          return (
            <li key={recipe.id}>
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
