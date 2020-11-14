import styled from "styled-components";

export const CardWrapper = styled.div`
  width: 250px;
  flex-direction: row;
  border: 1px;
  height: 250px;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 200px;
  }
`;

export const CardContent = styled.div`
  background: ${(props) => props.backgroundColor || "#E8E5DA"};
`;

export const CardTitle = styled.h1`
  font-size: 18px;
  color: #000;
  text-align: left;
  padding-left: 1em;
  display: ${(props) => props.inline || ""};
`;

export const CardDescription = styled.p`
  font-size: 14px;
  display: ${(props) => props.inline || ""};
  padding-left: 1em;
`;

export const Column = styled.div`
  display: inline-flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  width: fit-content;
  border-radius: 5px;
  background: ${(props) => props.backgroundColor || "#E8E5DA"};
  margin: 0.5em;
  color: #000;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
`;

export const CardImage = styled.img`
  width: inherit;
  border-radius: 5px 5px 0 0;
`;

export const Row = styled.div``;
