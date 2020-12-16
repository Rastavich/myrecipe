import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Layout = styled.aside`
  display: block;
  opacity: 1;
  top: 0;
  width: 100px;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 100vh;
  --bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--bg-opacity));
  box-shadow: 0 3px 12px rgba(40, 51, 65, 0.1), 0 0 1px rgba(40, 51, 65, 0.2);
  font-weight: 100;
  z-index: 20;
  overflow-y: auto;
  -webkit-transition-property: all;
  transition-property: all;
  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  background: ${(props) => props.backgroundColor || "#E8E5DA"};
  @media (max-width: 768px) {
    width: 5em;
  }
`;

export const Ul = styled.ul`
  list-style: none;
  color: #fff;
  border-bottom: 1px solid $color-d;
  padding-inline-start: 0;
  margin-block-start: 0;
`;

export const FlexGrid = styled.div`
  display: inline-grid;
  margin: 2em 2em 2em 8em;
  @media (max-width: 768px) {
    margin: 1em 2em 1em 6em;
  }
  padding: 15px;
  border: 1px solid #ddd;
  background: #fff;
  height: fit-content;
  width: 100%;
`;

export const MenuItem = styled.p`
  color: ${(props) => props.backgroundColor || "#304C89"};
  &:hover {
    color: ${(props) => props.hoverColor || "#fff"};
  }
  text-align: center;
  font-size: 14px;
  text-decoration: none;
`;

export const Li = styled.li`
  text-align: center;
  padding: 1em;
  background-color: ${(props) => props.hoverColor || "#9EB7E5"};
`;
