import React from "react";
import ActivedTable from "./ShippingLine/ActivedTable";
import HistoryTable from "./ShippingLine/HistoryTable";
import { GeneralTranslation } from "../../../components/Translation/Loadable";
import { GologsTab } from "../../../components/Tab/Loadable";

export default class ShippingLine extends React.Component {
    state = {
        tabs: [],
        activeTab: "active"
    };

    componentDidMount() {
        let tabs: any = this.state.tabs
        let query: any = new URLSearchParams(window.location.search);
        let tab: any = query.get("tab");
        if (tab == "active" || tab == "history") {
            this.setState({ activeTab: tab });
        }
        setTimeout(() => {
            tabs.push({
                slug: "active",
                name: <GeneralTranslation slug="active" />,
                amount: 0,
                content: (<ActivedTable onDataFetched={this.onDataFetched} />)
            });
    
            tabs.push({
                slug: "history",
                name: <GeneralTranslation slug="history" />,
                amount: 0,
                content: <HistoryTable onDataFetched={this.onHistoryDataFetched} />
            });
            this.setState({tabs : tabs})
        }, 50);
    };

    onDataFetched = (e) => {
        let totalCount: number = e.totalCount;
        let tabs: any = this.state.tabs;
        let idx: number = tabs.findIndex(x => x.slug == "active");
        if (idx > -1) {
            tabs[idx].amount = totalCount;
            this.setState({tabs : tabs});
        }
    }

    onHistoryDataFetched = (e) => {
        let totalCount: number = e.totalCount;
        let tabs: any = this.state.tabs;
        let idx: number = tabs.findIndex(x => x.slug == "history");
        if (idx > -1) {
            tabs[idx].amount = totalCount;
            this.setState({tabs : tabs});
        }
    }
    
    render() {
        return (
            <>
                <GologsTab
                    showCircle={true}
                    showAmount={true}
                    variant="secondary"
                    activeTab={this.state.activeTab}
                    data={this.state.tabs}
                />
            </>
        );
    };
}
