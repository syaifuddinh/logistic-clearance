import React, { Component } from "react";
import MenuLink from "../../..//MenuLink";
import { GeneralTranslation } from "../../../../Translation/Loadable";
import DeliveryOrder from "../../../../../../endpoints/DeliveryOrder";

export default class Order extends Component {
    state = {
        qty: 0
    };

    componentDidMount() {
        this.getData();
    }
    
    getData = async () => {
        let dt: any = {};
        let r: any = {};
        try { 
            dt = await DeliveryOrder.list({
                IsDraft: false,
                IsInProgress: true
            });
            r = dt.data;
            if (r.totalCount) {
                this.setState({qty: r.totalCount});
            }
        } catch(e) {
            
        }
    }
    
    render() {
        return (
            <MenuLink
                title={<GeneralTranslation slug="sidebarMenu.order" />}
                icon={require("../../../../../../assets/icons/bluePaper.png")}
                active={false}
                hasChild={false}
                child={false}
                url="/order"
                qty={this.state.qty}
            />
        );
    }
}
