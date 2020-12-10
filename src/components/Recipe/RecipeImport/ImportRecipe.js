import React from "react";
import { useForm } from "react-hook-form";
import { importRecipe } from "../../../services/recipes/RecipeImportService";
import RecipeImportPreview from "./RecipeImportPreview";
import { Button } from "../../Generics/Button";
// import "../../../assets/styles/importForms.scss";

const ImportRecipe = () => {
  const { register, handleSubmit } = useForm();
  var recipeData = null;
  var showPreview = false;

  const onRecipeSubmit = (data, e) => {
    let url = data.url;
    let showPreview = true;

    // const getRecipe().then((response) => {});

    importRecipe(url)
      .then((response) => {
        // if (response.status === 200) {
        let recipeData = response;
        // }
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
          <Button id="button" type="submit">
            Import
          </Button>
        </form>
      </div>

      <div>
        {showPreview == true && (
          <RecipeImportPreview previewData={recipeData} />
        )}
      </div>
    </>
  );
};

export default ImportRecipe;
