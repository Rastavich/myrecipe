import { Btn } from "./Button.elements";

export const Button = (props) => {
  return <Btn onClick={props.onClick}>{props.name}</Btn>;
};

//{props.data.recipe_name}

export default Button;
