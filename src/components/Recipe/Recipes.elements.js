import styled from "styled-components";

export const CardWrapper = styled.div`
  width: 270px;
  flex-direction: row;
  border: 1px;
  border-color: black;
  border-style: solid;
  border-radius: 5px;
  height: 300px;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 200px;
  }
`;

export const CardTitle = styled.h1``;

export const CardDescription = styled.p``;

export const Column = styled.div`
  display: inline-flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  width: fit-content;
  padding: 2px;
`;

export const CardImage = styled.img`
  max-width: -webkit-fill-available;
`;

export const Row = styled.div``;
