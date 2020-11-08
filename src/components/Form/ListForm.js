import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

const ListForm = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);

  const [steps, setSteps] = React.useState({});

  //   useEffect((e) => {
  //     setSteps({ steps: e.target.value });
  //   }, []);

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
    <div class="row">
      <h1>Add {props.fieldName}</h1>

      {indexes.map((index) => {
        const fieldName = `{props.fieldName}[${index}]`;
        return (
          <fieldset name={fieldName} key={fieldName}>
            <label>
              {props.fieldName} Step Description:
              <input
                type="number"
                name={`${fieldName}.{props.fieldVal1}`}
                ref={register}
                style={{ display: "none" }}
                value={index + 1}
                readOnly
              />
              <input
                type="text"
                name={`${fieldName}.{props.fieldVal2}`}
                ref={register}
              />
            </label>
            <button type="button" onClick={removeField(index)}>
              Remove
            </button>
          </fieldset>
        );
      })}

      <button type="button" onClick={addField}>
        Add {props.fieldName}
      </button>
      <button type="button" onClick={clearField}>
        Clear {props.fieldName}
      </button>
    </div>
  );
};

export default ListForm;
