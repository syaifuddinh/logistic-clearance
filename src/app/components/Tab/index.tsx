import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import {
    TabHeader,
    TabContent,
    TabItem
} from "../../containers/Transaction/style";
import { GologsIcon } from "../Icon/Loadable";

type IData = {
    slug: string;
    name: any;
    defaultIcon?: string;
    primaryIcon?: string;
    amount?: number;
    content?: any;
    hideAmount?: any;
};

type IProps = {
    data: IData[];
    showAmount?: boolean;
    showCircle?: boolean;
    activeTab: string;
    type?: string;
    variant?: string;
    titleClass?: string;
    allowed?: number;
};

export default class GologsTab extends Component<IProps> {
    state = {
        activeTab: "",
        prevActiveTab: ""
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({ activeTab: this.props.activeTab });
            this.setState({
                prevActiveTab: this.props.activeTab
            });
        }, 100);
    }

    componentDidUpdate() {
        if (this.state.prevActiveTab != this.props.activeTab) {
            this.setState({ activeTab: this.props.activeTab });
            this.setState({
                prevActiveTab: this.props.activeTab
            });
        }
    }

    getStyle() {
        let r: any = {};
        if (this.props.type == "primary") {
            r.width = 100 / this.props.data.length + "%";
        }

        return r;
    }

    getBackgroundColorStyle() {
        let r: string = "bg-primary";
        if (this.props.variant == "secondary") {
            r = "bg-secondary";
        }

        return r;
    }

    getColorStyle() {
        let r: string = "text-primary";
        if (this.props.variant == "secondary") {
            r = "text-secondary";
        }

        return r;
    }

    getTabContentClassName() {
        let r: any = "md-top-right-rounded-20px top-right-rounded-0px"
        if (this.props.type == "primary") {
            r = "";
        }

        r += " bg-white bottom-right-rounded-20px bottom-left-rounded-20px"

        return r;
    }

    getTabContent = (v, i) => (
        <>
            <TabHeader
                active={this.state.activeTab === v.slug}
                className="w-100 letter-spacing-3  p-4 text-capitalize position-relative"
            >
                <div
                    onClick={() => this.onTabClicked(v.slug)}
                    className="d-flex justify-content-center align-items-center"
                >
                    {this.props.showCircle &&
                        this.state.activeTab === v.slug && (
                            <div
                                className={
                                    "w-8px h-8px rounded-20px mr-2 " +
                                    this.getBackgroundColorStyle()
                                }
                            ></div>
                        )}
                    <span className="d-none d-md-inline-block">
                        {this.state.activeTab != v.slug &&
                            v.defaultIcon && (
                                <GologsIcon
                                    name={v.defaultIcon}
                                    className="mr-2"
                                />
                            )}

                        {this.state.activeTab == v.slug &&
                            v.primaryIcon && (
                                <GologsIcon
                                    name={v.primaryIcon}
                                    className="mr-2"
                                />
                            )}
                    </span>

                    <span
                        className={
                            "font-poppins lg-fs-12px fs-8px md-fs-10px " +
                            this.props.titleClass
                        }
                    >
                        {this.state.activeTab == v.slug ? (
                            <span
                                className={this.getColorStyle()}
                            >
                                {v.name}
                            </span>
                        ) : (
                            v.name
                        )}
                        {this.props.showAmount &&
                            !v.hideAmount && (
                                <span className="ml-1">
                                    {this.state.activeTab ==
                                    v.slug ? (
                                        <span
                                            className={this.getColorStyle()}
                                        >
                                            (
                                            {v.amount
                                                ? v.amount
                                                : 0}
                                            )
                                        </span>
                                    ) : (
                                        <>
                                            (
                                            {v.amount
                                                ? v.amount
                                                : 0}
                                            )
                                        </>
                                    )}
                                </span>
                            )}
                    </span>
                </div>

                {this.props.allowed &&
                    i + 1 > this.props.allowed && (
                        <div
                            className="cursor-not-allowed position-absolute w-100 h-100 rounded-40px bg-transparent"
                            style={{
                                left: 0,
                                top: 0,
                                zIndex: 50
                            }}
                        ></div>
                    )}
            </TabHeader>
        </>
    );

                   onTabClicked(e) {
                       const idx = this.props.data.findIndex(x => x.slug == e);
                       if (idx == -1) {
                           if (this.props.data.length > 0) {
                               e = this.props.data[0].slug;
                           }
                       }
                       this.setState({ activeTab: e });
                   }

                   render() {
                       return (
                           <>
                               <Row
                                   style={
                                       this.props.type &&
                                       this.props.type != "default"
                                           ? {
                                                 marginLeft: "0.1px",
                                                 marginRight: "0.1px"
                                             }
                                           : {}
                                   }
                               >
                                   {this.props.data.map((v, i) => (
                                       <>
                                           <div
                                               className={
                                                   !this.props.type ||
                                                   this.props.type == "default"
                                                       ? "d-none d-md-block col-sm-3"
                                                       : "d-none d-md-block"
                                               }
                                               style={this.getStyle()}
                                           >
                                               {this.getTabContent(v, i)}
                                           </div>

                                           <Col
                                               className="d-block d-md-none"
                                               style={{
                                                   width:
                                                       100 /
                                                           this.props.data
                                                               .length +
                                                       "%"
                                               }}
                                           >
                                               {this.getTabContent(v, i)}
                                           </Col>
                                       </>
                                   ))}
                               </Row>
                               <TabContent>
                                   <div
                                       className={this.getTabContentClassName()}
                                   >
                                       {this.props.data.map((v, index) => (
                                           <TabItem
                                               key={v.slug}
                                               active={
                                                   v.slug ==
                                                   this.state.activeTab
                                               }
                                               className="pr-5"
                                           >
                                               {v.content ? v.content : ""}
                                           </TabItem>
                                       ))}
                                   </div>
                               </TabContent>
                           </>
                       );
                   }
               }
