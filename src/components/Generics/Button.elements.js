import styled from "styled-components";

export const Btn = styled.button`
  padding: 5px;
  margin: 2px;
  background: ${(props) => props.backgroundColor || "#648DE5"};
  color: ${(props) => props.backgroundColor || "#fff"};
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
`;
