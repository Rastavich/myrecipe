import React from "react";

const ListStepsForm = ({ register }) => {
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
      <h3>Add Steps</h3>

      {indexes.map((index) => {
        const fieldName = `steps[${index}]`;
        return (
          <fieldset name={fieldName} key={fieldName}>
            <label>
              Steps Description:
              <input type="text" name={`${fieldName}.steps`} ref={register} />
            </label>
            <button type="button" onClick={removeField(index)}>
              Remove
            </button>
          </fieldset>
        );
      })}

      <button type="button" onClick={addField}>
        Add Steps
      </button>
      <button type="button" onClick={clearField}>
        Clear Steps
      </button>
    </div>
  );
};

export default ListStepsForm;
