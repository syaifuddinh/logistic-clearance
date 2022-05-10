import React, { Component } from "react";
import { GeneralTranslation } from "../Translation/Loadable";
import { Redirect } from "react-router-dom";


type IProps = {
    content?: any;
    slug?: string;
    pathname?: string;
    search?: string;
    onClick?: any;
}

export default class Anchor extends Component<IProps> {
    state = {
        isRedirect: false
    }
    
    doRedirect = async () => {
        if (this.props.onClick) {
            await this.props.onClick();
        } else {
            this.setState({isRedirect: true});
        }
    }
    
    render() {
        return (
            <>
                <span className="text-primary font-weight-light-bolder" onClick={this.doRedirect}>
                    {this.props.slug && (
                        <GeneralTranslation slug={this.props.slug} />
                    )}
                    {!this.props.slug && this.props.content && (
                        <>{this.props.content}</>
                    )}
                </span>
                { this.props.pathname && this.state.isRedirect === true && (
                    <Redirect
                        to={{
                            pathname: this.props.pathname,
                            search: this.props.search ? this.props.search : ""
                        }}
                    />
                ) }
            </>
        );
    }
}
