import React from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/i18n";

import { Title, RowX, Column, Item, ItemTitle } from "../../../styles/Wizard";
import {
  Container,
  Icon,
  Circle,
  Number,
  Rectangle
} from "../../../styles/WizardTop";

export default function Top() {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{"These are steps to complete order"}</Title>
      <RowX>
        <Column>
          <Icon src={require("../../../assets/icons/iwizard1.svg")} />
          <Item>
            <Rectangle show={false} />
            <Circle active={true}>
              <Number active={true}>1</Number>
            </Circle>
            <Rectangle show={true} />
          </Item>
          <ItemTitle>{"Delegate"}</ItemTitle>
        </Column>
        <Column>
          <Icon src={require("../../../assets/icons/iwizard2.svg")} />
          <Item>
            <Rectangle show={true} />
            <Circle active={false}>
              <Number active={false}>2</Number>
            </Circle>
            <Rectangle show={true} />
          </Item>
          <ItemTitle>{"Confirmation FF/PPJK"}</ItemTitle>
        </Column>
        <Column>
          <Icon src={require("../../../assets/icons/iwizard3.svg")} />
          <Item>
            <Rectangle show={true} />
            <Circle active={false}>
              <Number active={false}>3</Number>
            </Circle>
            <Rectangle show={true} />
          </Item>
          <ItemTitle>{"Confirmation from Shipping   Line"}</ItemTitle>
        </Column>
        <Column>
          <Icon src={require("../../../assets/icons/iwizard4.svg")} />
          <Item>
            <Rectangle show={true} />
            <Circle active={false}>
              <Number active={false}>4</Number>
            </Circle>
            <Rectangle show={true} />
          </Item>
          <ItemTitle>{"Performa Invoice"}</ItemTitle>
        </Column>
        <Column>
          <Icon src={require("../../../assets/icons/iwizard5.svg")} />
          <Item>
            <Rectangle show={true} />
            <Circle active={false}>
              <Number active={false}>5</Number>
            </Circle>
            <Rectangle show={false} />
          </Item>
          <ItemTitle>{"Confirm Payment"}</ItemTitle>
        </Column>
      </RowX>
    </Container>
  );
}
