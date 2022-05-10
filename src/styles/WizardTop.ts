import styled from "styled-components/macro";

export const Container = styled.div`
    height: 16.2rem;
    width: 80rem;
    background: #ffffff;
    border-radius: 1.25rem;
`;

export const Icon = styled.img`
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    cursor: pointer;
    width: 5rem;
    height: 5rem;
`;

export const Circle = styled("div")<{ active?: boolean; show?: boolean }>`
    background: ${props => (props.active ? "#7456FD" : "#EFF0F6")};
    margin-left: ${props => (props.show ? "40%" : "")};
    border-radius: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
    align-content: center;
    display: flex;
`;

export const Number = styled("div")<{ active?: boolean }>`
    color: ${props => (props.active ? "#FFFFFF" : "#3F3F3F")};
    font-size: 0.81rem;
`;

export const Rectangle = styled("div")<{
           show?: boolean;
           actived?: boolean;
           width?: number;
       }>`
           background-color: ${props =>
               props.show
                   ? props.actived
                       ? "#7456FD"
                       : "#EFF0F6"
                   : "transparent"};
           height: 0.375rem;
       `;
