import React, { Component } from "react";
import { Image } from "../../../styles/Sidebar";

type IProps = {
    name?:any;
    width?:any;
    height?:number;
    className?:string;
}

export default class GologsImage extends Component<IProps> {
    getWidth() {
        let r:any = "20px";
        
        if (this.props.width) {
            if (this.props.width != "auto") {
                r = this.props.width + "px";
            } else {
                r = this.props.width;
            }
        }

        return r;
    }
    
    getHeight() {
        let r:any = "auto";
        
        if (this.props.height) {
            r = this.props.height + "px";
        }

        return r;
    }
    
    render() {
        return (
            <Image
                style={{
                    width: this.getWidth(),
                    height: this.getHeight()
                }}
                className={this.props.className} src={require("../../../assets/images/" + this.props.name)}
            />
        );
    }
}
