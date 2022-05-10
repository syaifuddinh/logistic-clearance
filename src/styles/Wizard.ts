import styled from "styled-components/macro";
import { createGlobalStyle } from "styled-components";

export const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 1.563rem solid transparent;
  border-right: 1.563rem solid transparent;
  border-bottom: 1.75rem solid #ffffff;
  margin-left: 8%;
`;

export const Title = styled.label`
  display: flex;
  color: rgba(17, 17, 17, 0.5);
  font-size: 1rem;
  padding-top: 0.938rem;
  padding-left: 0.938rem;
`;

export const RowX = styled.div`
  text-align: center;
  align-content: center;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const Column = styled.div`
  flex: 100%;
  text-align: center;
  align-content: center;
  display: flex-box;
`;

export const Item = styled.div`
  padding-top: 1em;
  text-align: center;
  align-content: center;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
`;

export const ItemTitle = styled.p`
  color: #222151;
  align-items: center;
  justify-content: center;
`;

export const FormX = styled.form`
  margin-left: 4%;
`;

export const Label = styled.p`
  color: #222151;
  font-size: 1.125rem;
  align-items: center;
  justify-content: center;
`;

export const Group = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 1rem 0;
`;

export const Icon = styled.img`
    position: absolute;
    float: right;
    height: 2rem;
    margin-left: 1rem;
    margin-top: 1rem;
    z-index: 1;
`;

export const Input = styled("input")<{ error?: boolean }>`
  background: ${props => (props.error ? "#fff3f8" : "#ffff")};
  border-radius: 0.75rem;
  width: 100%;
  height: 4rem;
  border: ${props => (props.error ? "2px solid #ed2e7e" : "2px solid #0a0a0a")};
  font-size: 1rem;
  color: #0a0a0a;
  align-items: center;
  outline: none;
  padding-left: 1.1rem;
  font-family: "Raleway";
`;

export const MessageInput = styled("p")<{ show?: boolean }>`
  display: ${props => (props.show ? "" : "none")};
  color: #c30052;
  font-size: 0.875rem;
`;

export const Dropdown = styled("div")<{ error?: boolean; value?: string }>`
  /* margin-top: 0.2rem; */
  background: ${props => (props.error ? "#fff3f8" : "#ffff")};
  border-radius: 0.75rem;
  border: ${props => (props.error ? "2px solid #ed2e7e" : "2px solid #0a0a0a")};
  width: 23.875rem;
  height: 4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #0a0a0a;
`;

export const DropdownText = styled.div`
  margin-left: 1.5rem;
  color: #0a0a0a;
  font-size: 1rem;
  width: 80%;
`;

export const DropdownExpand = styled.img`
  /* margin-left: 11rem; */
  width: 0.8rem;
`;

export const Button = styled("button")<{ show?: boolean; clicked?: boolean }>`
  width: 15rem;
  height: 4rem;
  font-family: "Raleway";
  text-align: center;
  border: none;
  border-radius: 2.5rem;
  /* background-color: #5f2eea; #af96f4 */
  /* background-color: #af96f4; */
  background-color: ${props => (props.clicked ? "#5f2eea" : "#af96f4")};
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 3rem;
  outline: none;
  display: ${props => (props.show ? "" : "none")};
`;

export const ButtonX = styled("button")<{ show?: boolean; clicked?: boolean }>`
  width: 15rem;
  height: 4rem;
  font-family: "Raleway";
  text-align: center;
  border: none;
  border-radius: 2.5rem;
  /* background-color: #5f2eea; #af96f4 */
  /* background-color: #af96f4; */
  background-color: ${props => (props.clicked ? "#5f2eea" : "#af96f4")};
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 3rem;
  outline: none;
  display: ${props => (props.show ? "" : "none")};
`;

export const Space = styled.div`
  width: 15rem;
  height: 4rem;
  font-family: "Raleway";
  text-align: center;
  border: none;
  border-radius: 2.5rem;
  background-color: #ffffff;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 3rem;
  outline: none;
`;
export const ButtonO = styled("button")<{ show?: boolean }>`
  background: none;
  border: 0.063rem solid #ad93f3;
  border-radius: 1.25rem;
  box-sizing: border-box;
  color: #ad93f3;
  cursor: pointer;
  font-size: 1rem;
  width: 15rem;
  height: 4rem;
  line-height: 1.7rem;
  position: relative;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  outline: none;
  font-family: "Raleway";
  display: ${props => (props.show ? "" : "none")};
  margin-right: 0.5rem;
`;

export const Footer = styled.div`
  margin-top: 2rem;
  float: right;
  padding-bottom: 2rem;
  margin-right: 1.5rem;
`;

export const ShippingOptions = styled.div`
  margin-top: 0.5rem;
  margin-left: -0.2rem;
  padding-left: 0.5rem;
  position: absolute;
  border-radius: 0.94rem;
  background: #ffffff;
  width: 25rem;
  height: 5.25rem;
  border: 0.125rem solid rgba(189, 189, 189, 0.33);
  outline-color: rgba(189, 189, 189, 0.33);
  overflow-y: auto;
`;

export const ShippingItem = styled("div")<{ key?: string }>`
  color: black;
  display: block;
  cursor: pointer;
`;

export const DatePickerWrapperStyles = createGlobalStyle<{ error?: boolean }>`
    div .react-datepicker-wrapper {
        width:85%;
    }

    .react-datepicker-container {
        background: ${props => (props.error ? "#fff3f8" : "#ffff")};
        border-radius: 0.75rem;
        border: ${props =>
            props.error ? "2px solid #ed2e7e" : "2px solid #0a0a0a"};
        outline: none;
    }
      
    .react-datepicker__input-container input {
        border: none;
        outline: none;
        width: 23.875rem;
        height: 4rem;
        font-size: 1rem;
        color: #0a0a0a;
        font-family: "Raleway";
        z-index:-100;
        background: transparent;
    }
`;

export const ReactDropzoneStyles = createGlobalStyle`
    .dropzone {
        text-align: center;
        padding: 20px;
        border: 3px dashed #0a0a0a;
        background-color: #fafafa;
        color: #0a0a0a;
        width: 100%;
    }
`;

export const TitleView = styled.div`
  font-size: 1rem;
  color: #666669;
  z-index: -1;
`;

export const TextView = styled.div`
  font-size: 1rem;
  color: #0a0a0a;
  z-index: -1;
`;

export const TextLarge = styled.div`
  font-size: 1.2rem;
  color: #0a0a0a;
  z-index: -1;
`;

export const HorizontalSparator = styled.div`
  background-color: "#7456FD";
  height: 0.375rem;
  width: 12.7rem;
  z-index: -1;
`;
