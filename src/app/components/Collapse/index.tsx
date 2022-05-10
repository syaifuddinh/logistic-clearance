import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";

type IProps = {
    title: any;
    subtitle: any;
    content?: any;
};

export default class Collapse extends Component<IProps> {
    state = {
        isContentOpen: false
    };

    switchContent = () => {
        this.setState({isContentOpen: !this.state.isContentOpen});
    }
    
    render() {
        return (
            <>
                <div>
                    <div className="border-1 border-fourth-gray rounded-20px p-3 position-relative">
                        <div className="d-block fs-18px font-weight-light-bolder text-dark">
                            {this.props.title}
                        </div>
                        <div className="d-block fs-16px text-dark mt-2">
                            {this.props.subtitle}
                        </div>

                        <div
                            className="position-absolute"
                            style={{ top: "40%", right: "5%" }}
                            onClick={this.switchContent}
                        >
                            {this.state.isContentOpen ? (
                                <FontAwesomeIcon icon={faChevronDown} />
                            ) : (
                                <FontAwesomeIcon icon={faChevronRight} />
                            )}
                        </div>
                    </div>

                    {this.state.isContentOpen && (
                        <div 
                            className="px-3 pt-5 pb-3 border-1 border-top-0px border-fourth-gray bottom-right-rounded-20px bottom-left-rounded-20px"
                            style={{marginTop: "-4mm"}}
                        >
                            {this.props.content}
                        </div>
                    )}
                </div>
            </>
        );
    }
}
