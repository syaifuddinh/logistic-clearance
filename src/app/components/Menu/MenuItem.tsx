/* eslint-disable no-console */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "../../../endpoints/Menu";
import {
  MenuRow,
  Span,
  Icon,
  Title,
  Arrow
} from "../../../styles/Menu";

interface IProps {
  key?: any;
  title?: string;
  icon?: any;
  hasChild?: boolean;
  child?: boolean;
  url: string;
  onClick?: any;
  show?: boolean;
}

type MyState = {
  activeMenu?: any;
  masterMenu?: any;
};

export default class MenuItem extends Component<MyState> {
  state: MyState = {
    activeMenu: "",
    masterMenu: []
  };

  componentDidMount() {
    Menu.getAll("co").then(data => {
      console.log(data.data.menus);
      this.setState({ masterMenu: data.data.menus });
    });
  }

  MenuLink = (props: IProps) => (
    <aside>
      <MenuRow active={this.state.activeMenu === props.url} child={props.child}>
        <Span
          className="iconify"
          active={this.state.activeMenu === props.url}
          data-inline="false"
        >
          <Icon src={props.icon} />
        </Span>
        <Link to={props.url}>
          <Title
            active={this.state.activeMenu === props.url}
            className="text-capitalize"
          >
            {props.title}
          </Title>
        </Link>
        <Arrow
          src={require("../../../assets/icons/caret-up.svg")}
          show={props.hasChild}
        ></Arrow>
      </MenuRow>
    </aside>
  );

  // YourMenu = () => {
  //   return this.state.masterMenu.length > 0
  //     ? this.state.masterMenu.forEach(item => {
  //         <this.MenuLink url={this.state.activeMenu} />;
  //       })
  //     : null;
  // };

  render() {
    return <div></div>;
  }
}
