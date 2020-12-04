import React from "react";
import { useForm } from "react-hook-form";
import { importRecipe } from "../../services/RecipeImportService";

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
        // console.log(error);
      })
      .finally(() => {});
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onRecipeSubmit)}>
        <input
          name="url"
          placeholder="Url"
          type="text"
          ref={register({ required: true })}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default ImportRecipe;
