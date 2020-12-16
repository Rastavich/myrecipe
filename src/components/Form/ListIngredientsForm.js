import React from "react";
import Button from "../Generics/Button";

const ListIngredientsForm = ({ register }) => {
  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);

  const addField = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeField = (index) => () => {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  const clearField = () => {
    setIndexes([]);
    setCounter(0);
  };

  return (
    <div>
      <h3>Add Ingredients</h3>

      {indexes.map((index) => {
        const fieldName = `ingredients[${index}]`;
        return (
          <fieldset name={fieldName} key={fieldName}>
            <label>
              Ingredients Description:
              <input
                type="text"
                name={`${fieldName}.ingredients`}
                ref={register}
              />
            </label>
            <Button type="button" onClick={removeField(index)}>
              Remove
            </Button>
          </fieldset>
        );
      })}

      <Button type="button" onClick={addField}>
        Add Ingredients
      </Button>
      <Button type="button" onClick={clearField}>
        Clear Ingredients
      </Button>
    </div>
  );
};

export default ListIngredientsForm;
