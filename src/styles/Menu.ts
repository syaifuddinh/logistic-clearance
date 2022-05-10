import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  position: absolute;
  width: 18.5rem;
  height: 3.75rem;
  left: 0rem;
  top: 6.25rem;
`;

export const MenuRow = styled("div")<{
  active?: boolean;
  child?: boolean;
  show?: boolean;
  onClick?: any;
}>`
  background: ${props => (props.active ? "#F1F1FF" : "transparent")};
  padding-left: ${props => (props.child ? "5rem" : "3rem")};
  display: flex;
  width: ${props => (props.child ? "17rem" : "17rem")};
  height: 3.75rem;
  margin-left: 0.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0rem;
  border-radius: 1.25rem;
`;

export const Span = styled("span")<{ active?: boolean }>`
  display: flex;
  font-size: 1rem;
  margin-right: 1rem;
`;

export const Icon = styled.img`
  height: 1.5rem;
  padding-right: 0.5rem;
`;

export const Title = styled("h1")<{ active?: boolean }>`
  font-weight: ${props => (props.active ? "bold" : "normal")};
  color: ${props => (props.active ? "#7456FD" : "#222151")};
  font-size: 1rem;
`;

export const Arrow = styled("img")<{ show?: boolean }>`
  display: ${props => (props.show ? "flex" : "none")};
  justify-content: flex-end;
  align-items: right;
  width: auto;
  padding-left: 7.5rem;
`;
