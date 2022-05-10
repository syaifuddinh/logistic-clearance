/* eslint-disable no-console */
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { MenuRow, Span, Icon, Title } from "../../../styles/Menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp  } from "@fortawesome/free-solid-svg-icons";

interface Props {
    title?: any;
    active?: boolean;
    icon?: any;
    hasChild?: boolean;
    child?: boolean;
    url: string;
    onClick?: any;
    show?: boolean;
    qty?: number;
    key?: any;
    children?:any;
}

export default function MenuLink(props: Props) {
    const [activedMenu, setActivedMenu] = useState(true);
    const [isRedirect, setIsRedirect] = useState(false);
    let qty = 0;
    if (props.qty) {
        qty = props.qty;
    }

    const switchActivedMenu = () => {
        if (props.url && props.url != "#") {
            setIsRedirect(true)
        }
        setActivedMenu(!activedMenu);   
    }

  return (
    <aside>
      <MenuRow
        active={window.location.pathname === props.url}
        child={props.child}
      >
        <div className="position-relative d-flex w-100">
          {qty > 0 && (
            <div
              className="position-absolute bg-red text-white d-flex justify-content-center align-items-center rounded-circle font-weight-light-bolder fs-9px w-20px h-20px"
              style={{
                top: "-1.7mm",
                left: "-2.7mm"
              }}
            >
              {qty}
            </div>
          )}
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex">
              {props.icon && (
                <Span
                  className="iconify"
                  onClick={switchActivedMenu}
                  active={props.active}
                  data-inline="false"
                >
                  <Icon src={props.icon} />
                </Span>
              )}

                <Title active={props.active} className="text-capitalize">
                    <div onClick={switchActivedMenu}>{props.title}</div>
                </Title>
            </div>

            {props.hasChild && (
              <span
                className="d-inline-block pr-5 text-primary"
                onClick={switchActivedMenu}
              >
                {activedMenu && <FontAwesomeIcon icon={faChevronDown} />}

                {!activedMenu && <FontAwesomeIcon icon={faChevronUp} />}
              </span>
            )}
          </div>
        </div>
      </MenuRow>
      {props.children && activedMenu ? props.children : ""}

      {isRedirect &&
        props.url &&
        props.url != "#" && (
          <Redirect
            to={{
              pathname: props.url
            }}
          />
        )}
    </aside>
  );
}
