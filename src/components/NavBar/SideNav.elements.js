import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Layout = styled.nav`
  width: 10em;
  background: ${(props) => props.backgroundColor || "#E8E5DA"};
`;

export const Ul = styled.ul`
  list-style: none;
  position: relative;
  display: block;
  padding: inherit;
  color: #fff;
  border-bottom: 1px solid $color-d;
  width: 100%;
`;

export const FlexGrid = styled.div`
  display: flex;
  margin: 20px 20px 20px 20px;
  padding: 15px;
  border: 1px solid #ddd;
  background: #fff;
  height: fit-content;
  width: fit-content;
`;

export const MenuItem = styled.a`
  color: ${(props) => props.backgroundColor || "#304C89"};
  &:hover {
    color: ${(props) => props.hoverColor || "#9EB7E5"};
  }
  text-align: center;
  line-height: 42px;
`;

export const Li = styled.li`
  text-align: center;
  width: 100%;
  margin-top: 10px;
  height: 3em;
  background-color: ${(props) => props.hoverColor || "#9EB7E5"};
`;
