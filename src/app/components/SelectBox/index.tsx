import React, { Component } from "react";
import {
  ShippingOptions,
  ShippingItem
} from "../../../styles/Wizard";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/i18n";
import { InputLabel } from "../Label/Input/Loadable";

// Select 2
import Select from "react-select";

type IProps = {
    items?: any;
    onSelectedChange?: any;
    error?: boolean;
    placeholderByTranslation?: boolean;
    value?: any;
    variant?: string;
    translation?: string;
    placeholder?: string;
    className?: string;
    labelSlug?: string;
    showAsterisk?: boolean;
};

class SelectBox extends Component<IProps> {
    state = {
        items: this.props.items || [],
        showItems: false,
        selectedItem: ""
    };

  dropDown = () => {
    this.setState({ showItems: !this.state.showItems });
  };

  getClassName = () => {
    let r = "default";
    if (this.props.variant) {
      r = this.props.variant;
    }

    r = "gologs-select-" + r;

    r += " " + (this.props.className ? this.props.className : "")
    
    return r;
  };

  selectItem = item => {
    this.setState({
      selectedItem: item,
      showItems: false
    });
  };

  ShippingLineOptions = () =>
    this.state.showItems ? (
      <ShippingOptions>
        {this.props.items.map(item => (
          <ShippingItem
            key={item.shippingLineCode}
            onClick={() => this.props.onSelectedChange(item)}
          >
            {item.shippingLineName}
          </ShippingItem>
        ))}
      </ShippingOptions>
    ) : null;

  getContent = props => {
    const { t } = useTranslation();

    const getPlaceholder = () => {
        let r:string = ""
        if (props.placeholderByTranslation === true) {
            r = (
            t(translations.entities.general.select) +
            " " +
            t(translations.entities.general[props.translation])
            );
        } else {
            r =  props.placeholder;
        }
        return r;
    };

    return (
        <Select
            options={props.items}
            placeholder={getPlaceholder()}
            value={props.value}
            onChange={props.onSelectedChange}
        />
    );
  };

    render() {
        return (
            <>
                { this.props.labelSlug && <InputLabel translationSlug={this.props.labelSlug} showAsterisk={this.props.showAsterisk ? true : false} /> }
                <span className={this.getClassName()}>
                <this.getContent
                    items={this.props.items}
                    placeholderByTranslation={this.props.placeholderByTranslation}
                    translation={this.props.translation}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onSelectedChange={this.props.onSelectedChange}
                />
                </span>
            </>
        );
    }
}

export default SelectBox;
