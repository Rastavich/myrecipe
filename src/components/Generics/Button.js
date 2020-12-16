import { Btn } from "./Button.elements";

export const Button = (props) => {
  return <Btn {...props}>{props.children}</Btn>;
};

export default Button;
