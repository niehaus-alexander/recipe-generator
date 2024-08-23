import CardList from "@/components/CardList";

const myRecipes = ({ favoriteRecipes, onToggleFavorites }) => {
  return (
    <div className="h-screen w-full flex flex-col items-center">
      <h1 className="text-2xl font-semibold mt-6">Your Favorite Creations:</h1>
      {favoriteRecipes.length > 0 ? (
        <CardList
          recipes={favoriteRecipes}
          onToggleFavorites={onToggleFavorites}
        />
      ) : (
        <h2 className="text-lg m-6">
          ...seems like you don't have any favorites yet. Go to Creator or
          Inspirations to add recipes to your favorites by clicking on the star.
        </h2>
      )}
    </div>
  );
};

export default myRecipes;
