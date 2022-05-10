import React from "react";
import { Container, Image } from "../../../styles/Sidebar";
import { Menu } from "../Menu/Loadable";
import { Header } from "../../components/Header/Loadable";
import GologsLogo from "../Header/Components/GologsLogo";

type IProps = {
    "header-name"?: any;    
    subtitle?: any;    
    showBackwardButton?: any;    
};

export default class Index extends React.Component<IProps> {
    state = {
        menuState: "d-md-block d-none",
        isShowHeader: true
    };

    componentDidMount() {
        let authUser: any = localStorage.getItem("authUser");
        let container: any = null;
        if (!authUser) {
            this.setState({isShowHeader: false});
            container = window.document.querySelector(".gologs-container");
            if (container) {
                container.style.paddingLeft = "0";
                container.style.marginLeft = "0";
            }
        }
    }
    
    showSidebar = () => {
        let res = "d-md-block";
        return res;
    };

    hideSidebar = () => {
        let res = "d-md-block d-none";
        return res;
    };

    handleShowMenu = () => {
        this.setState({menuState: this.showSidebar()});
    };

    handleHideMenu = () => {
        this.setState({menuState: this.hideSidebar()});
    };

    render() {
        return (
            <>
                { this.state.isShowHeader && (
                    <div className="position-relative">
                        <div className="card p-3 d-md-none">
                            <Image
                                style={{ width: "5mm", height: "auto" }}
                                onClick={this.handleShowMenu}
                                src={require("../../../assets/icons/list.svg")}
                            />
                        </div>
                        <div className="ml-3">
                            <Header 
                                title={this.props["header-name"]} 
                                subtitle={this.props["subtitle"]} 
                                showBackwardButton={this.props.showBackwardButton}
                            />              
                        </div>
                        <Container
                            className={this.state.menuState + " pull-left h-100"}
                            style={{ zIndex: 100, overflowY: "scroll" }}
                        >
                            <div className="position-relative">
                                <div className="pl-40px">
                                    <GologsLogo />
                                </div>
            
                                <div
                                className="position-absolute mt-4 pt-1 mr-2 d-block d-md-none"
                                style={{top: "3%", right: "0mm"}}
                                >
                                    <Image
                                        onClick={this.handleHideMenu}
                                        className="float-right"
                                        style={{ width: "8mm", height: "auto" }}
                                        src={require("../../../assets/icons/caret-left.svg")}
                                    />
                                </div>
                            </div>
                            <div>
                                <Menu />
                            </div>
                        </Container>
                    </div>
                ) }
            </>
        );
    }
}
