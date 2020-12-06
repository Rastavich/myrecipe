import React from "react";
import { useForm } from "react-hook-form";
import { importRecipe } from "../../../services/recipes/RecipeImportService";
import RecipeImportPreview from "./RecipeImportPreview";
// import "../../../assets/styles/importForms.scss";

const ImportRecipe = () => {
  const { register, handleSubmit, errors } = useForm();

  const onRecipeSubmit = (data, e) => {
    let url = data.url;

    importRecipe(url)
      .then((response) => {
        // console.log(response);
        alert("Recipe Created");
        e.target.reset();
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
          <span>https://</span>
          <input
            className="form-field"
            name="url"
            placeholder="Url"
            type="text"
            ref={register({ required: true })}
          />
          <button id="button" type="submit">
            Import
          </button>
        </form>
      </div>

      <div>
        <RecipeImportPreview />
      </div>
    </>
  );
};

export default ImportRecipe;
