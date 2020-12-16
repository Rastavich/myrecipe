import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { importRecipe } from "../../../services/recipes/RecipeImportService";
import { Button } from "../../Generics/Button";
import CreateRecipe from "../CreateRecipe/CreateRecipe";

const ImportRecipe = () => {
  const { register, handleSubmit } = useForm();
  const [recipeData, setRecipeData] = useState(null);

  const onRecipeSubmit = (data, e) => {
    let url = data.url;

    importRecipe(url)
      .then((response) => {
        setRecipeData(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  return (
    <>
      <div>
        <form className="form-group" onSubmit={handleSubmit(onRecipeSubmit)}>
          <input
            className="form-field"
            name="url"
            placeholder="Url"
            type="text"
            ref={register({ required: true })}
          />
          <Button type="submit">Import</Button>
          <Button>Manual Create</Button>
        </form>
      </div>

      {recipeData != null && <CreateRecipe recipe={recipeData} />}
    </>
  );
};

export default ImportRecipe;
