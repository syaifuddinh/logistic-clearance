import styled from "styled-components/macro";

export const Container = styled.div`
  width: auto;
  margin-left: 17rem;
  padding-left: 3rem;
  padding-top: 9rem;
`;

export const TabHeader = styled("div")<{ active?: boolean; onClick?: any }>`
    height: 4rem;
    width: 15rem;
    background: ${props => (props.active ? "#FFFFFF" : "none")};
    border-radius: 1.25rem 1.25rem 0rem 0rem;
    text-align: center;
    vertical-align: middle;
    padding-top: 1.2rem;
    cursor: pointer;
    color: ${props => (props.active ? "#7456fd" : "#6E7191")};
    font-size: 16px;
    font-weight: 600;
    font-family: "Poppins";
`;

export const TabContent = styled.div`
    margin-bottom:5mm;
    width: auto;
`;

export const TabItem = styled("div")<{ active?: boolean }>`
  display: ${props => (props.active ? "block" : "none")};
  padding-top: 7mm;
  padding-bottom: 7mm;
  padding-left: 2rem;
`;

export const Search = styled("input")<{ error?: boolean }>`
  border-radius: 0.75rem;
  width: 100%;
  height: 3.5rem;
  font-size: 1rem;
  align-items: center;
  outline: none;
  padding-left: 1.5rem;
  font-family: "Poppins";
  font-weight: 400;
  font-size: 1.2rem;
  padding-left: 3.5rem;
  /* border: none; */
  background: "#EFF0F7;";
`;

export const Icon = styled.img`
  position: absolute;
  float: right;
  height: 1.5rem;
  margin-left: 1rem;
  margin-top: 1rem;
  z-index: 10;
`;

export const RowItem = styled.div`
  height: 10rem;
  width: 80rem;
  background: "#FBFBFF";
  border-radius: 1.25rem;
`;
