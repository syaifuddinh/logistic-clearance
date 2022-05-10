import styled from "styled-components/macro";

export const Container = styled.div`
    padding-top: 2rem;
    width: 100%;
    background: #f4f4ff;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const Title = styled.div`
    font-style: normal;
    font-weight: bold;
    line-height: 2.125rem;
`;

export const HeaderNav = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:flex-end;
    margin-left: 0rem;
    margin-right: 0.5rem;
`;

export const Language = styled("div")<{ show?: boolean }>`
    background: #ffffff;
    border-radius: 1.2rem;
    cursor: pointer;
    align-content: center;
    justify-content: center;
    align-items: center;
    display: flex;
    border: ${props => (props.show ? "0.125rem solid #5f2eea" : "")};
`;

export const LanguageNav = styled.img`
    margin-left: 1rem;
    margin-right:4mm
`;

export const Notification = styled.div`
    background: #ffffff;
    border-radius: 2rem;
    cursor: pointer;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
`;

export const NotificationIcon = styled.img`
    background: #ffffff;
    padding: 0.3rem;
    border-radius: 50%;
    font-weight: bolder;
`;

export const Profile = styled.div`
    background: #ffffff;
    border-radius: 2rem;
    cursor: pointer;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
`;

export const ProfileIcon = styled.img`
    background: #ffffff;
    padding: 0.3rem;
    border-radius: 50%;
    font-weight: bolder;
`;

export const NavText = styled.p`
    font-size: 1rem;
`;

export const NavItemText = styled.p`
    font-size: 0.85rem;
`;

export const LangOptions = styled.div`
    margin-top: 2mm;
    margin-left: 0.3rem;
    padding-left: 0.5rem;
    position: fixed;
    border-radius: 0.94rem;
    background: #ffffff;
    width: 10.5rem;
    border: 0.125rem solid rgba(189, 189, 189, 0.33);
    outline-color: rgba(189, 189, 189, 0.33);
    z-index: 500;
`;

export const LangItem = styled.span`
    display: block;
    cursor: pointer;
`;
