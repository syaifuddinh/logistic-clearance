import styled from "styled-components/macro";

export const Message = styled("div")<{ error?: boolean }>`
    margin-top: 1rem;
    width: 100%;
    height: 2.375rem;
    background-color: ${props => (props.error ? "#ED2E7E" : "#00BA88")};
    text-align: center;
    vertical-align: middle;
    color: #ffffff;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

export const MessageTitle = styled.h4`
    padding-top: 0.5em;
    color: "#ffffff";
    font-size: 1rem;
`;

export const Label = styled.p`
    color: #222151;
    font-size: 18px;
    align-items: center;
    justify-content: center;
`;

export const Input = styled.input`
    background: #eff0f7;
    border-radius: 14px;
    width: 80%;
    height: 60%;
    border: none;
    font-size: 16px;
    color: #a0a3bd;
    font-family: "Raleway";
    justify-content: center;
    margin-right: 1em;
    outline: none;
    padding-left: 1.5rem;
    ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #a0a3bd;
        opacity: 1; /* Firefox */
    }
`;

export const InputLong = styled.input`
    background: #eff0f7;
    border-radius: 14px;
    width: 85%;
    height: 60%;
    border: none;
    font-size: 16px;
    color: #a0a3bd;
    font-family: "Raleway";
    justify-content: center;
    margin-right: 1em;
    padding-left: 1.5rem;
    outline: none;
    ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #a0a3bd;
        opacity: 1; /* Firefox */
    }
`;

export const Form = styled.form`
    margin-left: 5%;
`;

export const Row = styled.div`
    margin-top: 0.1em;
    padding-bottom: 1em;
    display: flex;
`;

export const Col2 = styled.div`
    width: 20%;
`;

export const Col3 = styled.div`
    width: 40%;
`;

export const Col6 = styled.div`
    width: 47%;
`;

export const Col9 = styled.div`
    width: 60%;
`;

export const Col12 = styled.div`
    width: 80%;
`;
