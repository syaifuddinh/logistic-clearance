import React, { Component } from "react";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import GologsTable from "../../../../../components/Table/GologsTable";
import { GologsIcon } from "../../../../../components/Icon/Loadable";
import SP2 from "../../../../../../endpoints/SP2";
import moment from "moment";

type IProps = {
    id: string;
};

export default class DocumentRelease extends Component<IProps> {
    state = {
        columns: [],
        columnDefs: [],
        data: [],
        documents: [],
        unit: {
            containers: [],
            proformaInvoiceNo: {}
        }
    };

    openUrl = url => {
        return () => {
            if (url) {
                window.open(url, "_blank");
            }
        };
    };

    getData = async (id: string) => {
        let dt: any = {};
        let unit: any = this.state.unit;
        try {
            dt = await SP2.show(id);
            unit.proformaInvoiceNo = dt.proformaInvoiceNo;
            unit.containers = dt.containers;
            unit.containers = unit.containers.map(param => {
                let resp: any = {};

                resp.mbl = param.blNumber;
                resp.vesselNumber = param.vesselNumber;
                resp.voyageNumber = param.voyageNumber;
                resp.vesselName = param.vesselName;
                resp.eta = "";
                resp.containerSize = param.containerSize;
                resp.containerType = param.containerType;
                resp.containerNumber = param.containerNumber;

                return resp;
            });
            this.setState({ unit: unit });
        } catch (e) {
            
        }
    }

    setDocuments = async () => {
        await this.getData(this.props.id);
        let documents: any = this.state.documents;
        documents.push({
            jobNumber: "2094118",
            dateAndTime: moment(new Date()).format("DD-MM-YYYY HH:mm:ss"),
            uploader: "Terminal Operator",
            description: "Gate Pass",
            onClick: () => {
                let containers: any = [];
                containers = this.state.unit.containers.map((param: any) => {
                    return param.containerNumber;
                });
                SP2.streamGatePassFile(
                    this.state.unit.proformaInvoiceNo,
                    containers
                );
            }
        });
        this.setState({ documents: documents });
        let columnDefs: any = this.state.columnDefs;
        columnDefs.push({
            title: <GeneralTranslation slug="jobNumber" />
        });
        columnDefs.push({
            title: <GeneralTranslation slug="dateAndTime" />
        });
        columnDefs.push({
            title: <GeneralTranslation slug="uploader" />
        });
        columnDefs.push({
            title: <GeneralTranslation slug="description" />
        });
        columnDefs.push({
            title: <GeneralTranslation slug="download" />
        });

        this.setState({ columnDefs: columnDefs });

        let columns: any = this.state.columns;
        columns.push({
            data: "jobNumber"
        });
        columns.push({
            data: "dateAndTime"
        });
        columns.push({
            data: "uploader"
        });
        columns.push({
            data: "description"
        });
        columns.push({
            data: "download",
            className: "text-center"
        });

        this.setState({ columns: columns });
        let data: any = this.state.data;
        data = this.state.documents.map(v => {
            let r: any = v;
            r.download = (
                <>
                    <span className="d-inline-block" onClick={r.onClick}>
                        <GologsIcon name="darkEye.svg" />
                    </span>
                    <span className="d-inline-block ml-4" onClick={r.onClick}>
                        <GologsIcon name="darkDownload.svg" />
                    </span>
                </>
            );

            return r;
        });
        this.setState({ data: data });
    }
    
    componentDidMount() {
        this.setDocuments();
    }
    
    render() {
        return (
            <>
                {this.state.columnDefs.length > 0 && (
                    <GologsTable
                        hideNumbering={true}
                        hideSearch={true}
                        columnDefs={this.state.columnDefs}
                        data={this.state.data}
                        columns={this.state.columns}
                    />
                )}
            </>
        );  
    }
}