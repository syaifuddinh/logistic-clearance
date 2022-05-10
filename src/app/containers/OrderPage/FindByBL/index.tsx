import React from "react";
import { Redirect } from "react-router-dom";
import DeliveryOrder from "../../../../endpoints/DeliveryOrder";

export default class Show extends React.Component {
    state = {
        id: null,
        notFound : false,
        tab: 0
    };

    constructor(props) {
        super(props);
        if (props.match) {
            const bl = props.match.params.bl;
            if (bl) {
                this.getData(bl);
            }
        }
    }

    componentDidMount() {
        let query: any = new URLSearchParams(window.location.search);
        let tab: any = query.get("tab");
        if (tab == 2 || tab == 4) {
            this.setState({ tab: tab });
        } 
    }

    getData = async (bl) => {
        let resp: any = null;
        let list: any = null;
        let dt: any = null;
        try {
            resp = await DeliveryOrder.list({
                Start: 0,
                Length: 10000,
                IsDraft: false,
                IsCreatedDateDesc: true
            });
            if (resp.data.deliveryOrders) {
                list = resp.data.deliveryOrders;
                dt = list.find(v => v.billOfLadingNumber === bl);
                if (dt) {
                    this.setState({id: dt.id});
                }
            }
        } catch(e) {
            this.setState({notFound: false})
        }
    }
    
    render() {
        return (
            <>
                {this.state.id && this.state.tab && (
                    <Redirect
                        to={{
                            pathname: "/order/" + this.state.id,
                            search: "?tab=" + this.state.tab
                        }}
                    />
                )}
            </>
        );
    }
}