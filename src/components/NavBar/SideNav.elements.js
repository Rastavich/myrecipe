import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Layout = styled.nav`
  width: 5%;
  background: ${(props) => props.backgroundColor || "#4A3CBA"};
`;

export const Ul = styled.ul`
  list-style: none;
  position: relative;
  display: block;
  padding: 15px 15px 17px 50px;
  color: #fff;
  border-bottom: 1px solid $color-d;
`;

export const FlexGrid = styled.div`
  display: flex;
  flex: 1;
  margin: 0 20px 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  background: #fff;
`;

export const MenuItem = styled.p`
  color: ${(props) => props.backgroundColor || "#fff"};
  &:hover {
    color: ${(props) => props.hoverColor || "#ACBA3C"};
  }
`;
