import { recipes, Recipe } from './data.ts';

function OneRecipe({recipe}: {recipe: Recipe}) {
  return (
    <>
      <h2>{recipe.name}</h2>
      <ul>
        {recipe.ingredients.map(ingredient =>
          <li key={ingredient}>{ingredient}</li>
        )}
      </ul>
    </>
  )
}

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map( recipe =>
        <OneRecipe recipe={recipe} />
      )}
    </div>
  );
}
