import React from "react";
import styled from "styled-components/macro";
import { P } from "./P";
import { Helmet } from "react-helmet-async";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>404 {t(translations.notFound.title)}</title>
                <meta name="description" content="Page not found" />
            </Helmet>
            <Wrapper>
                <Title>
                    4
                    <span role="img" aria-label="Crying Face">
                    😢
                    </span>
                    4
                </Title>
                <P>{t(translations.notFound.content)}</P>
            </Wrapper>
        </>
        );
    }
    
    const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 320px;
    `;
    
    const Title = styled.div`
    margin-top: -8vh;
    font-weight: bold;
    color: black;
    font-size: 3.375rem;
    
    span {
        font-size: 3.125rem;
    }
    `;
