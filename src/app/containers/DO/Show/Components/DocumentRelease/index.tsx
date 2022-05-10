import React, { Component } from "react";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import GologsTable from "../../../../../components/Table/GologsTable";
import { GologsIcon } from "../../../../../components/Icon/Loadable";
import DeliveryOrder from "../../../../../../endpoints/DeliveryOrder";
import moment from "moment";

type IData = {
    jobNumber: string;
    dateAndTime: string;
    uploader: string;
    description: string;
    fileName: string;
};

type IProps = {
    id: string;
};

export default class DocumentRelease extends Component<IProps> {
    state = {
        unit: {
            jobNumber: "",
            deliveryOrderAttachments: [],
            documents: []
        },
        columns: [],
        columnDefs: [],
        data: []
    };

    openFilePreview = (link) => {
        let a = document.createElement("a");
        a.href = link;
        a.target = "_blank";
        a.click();
    }

    getData = async (id) => {
        await DeliveryOrder.show(id)
            .then(resp => {
                let unit: any = this.state.unit;
                const dt = resp.data.deliveryOrder;
                unit.jobNumber = dt.jobNumber;
                unit.deliveryOrderAttachments = dt.deliveryOrderAttachments;
                this.setState({ unit: unit });
                this.getDocuments();
            })
            .catch(error => {
                window.console.log(error);
            });
        
            let columnDefs: any = this.state.columnDefs;
            columnDefs.push({
                title : <GeneralTranslation slug="jobNumber" />
            })
            columnDefs.push({
                title : <GeneralTranslation slug="dateAndTime" />
            })
            columnDefs.push({
                title : <GeneralTranslation slug="uploader" />
            })
            columnDefs.push({
                title : <GeneralTranslation slug="description" />
            })
            columnDefs.push({
                title : <GeneralTranslation slug="download" />
            })

            this.setState({columnDefs : columnDefs});

            let columns: any = this.state.columns;
            columns.push({
                data : "jobNumber"
            })
            columns.push({
                data : "dateAndTime"
            })
            columns.push({
                data : "uploader"
            })
            columns.push({
                data : "description"
            })
            columns.push({
                data : "download",
                className : "text-center"
            })
            
            this.setState({columns : columns});
    };

    getDocuments = () => {
        let unit: any = this.state.unit;
        let files: any = unit.deliveryOrderAttachments;
        let documents: any[] = this.state.unit.documents;
        let doFile = files.find(v => v.documentName === "DO");
        let invoiceFile = files.find(v => v.documentName === "Invoice");
        let data: any = this.state.data;
        if (doFile) {
            documents.push({
                jobNumber: this.state.unit.jobNumber,
                dateAndTime: moment(new Date()).format("DD-MM-YYYY HH:mm:ss"),
                uploader: "Shipping Line",
                description: "DO",
                fileName: doFile.fileName
            });
        }
        if (invoiceFile) {
            documents.push({
                jobNumber: this.state.unit.jobNumber,
                dateAndTime: moment(new Date()).format("DD-MM-YYYY HH:mm"),
                uploader: "Shipping Line",
                description: "Invoice",
                fileName: invoiceFile.fileName
            });
        }
        unit.documents = documents;
        this.setState({ unit: unit });
        data = this.state.unit.documents.map((v: any) => {
            let r: any = v;
            r.download = (
                <>
                    <span
                        onClick={() => {
                            this.openFilePreview(v.fileName);
                        }}
                        className="d-inline-block"
                    >
                        <GologsIcon name="darkEye.svg" />
                    </span>
                    <span
                        onClick={() => {
                            this.openFilePreview(v.fileName);
                        }}
                        className="d-inline-block ml-4"
                    >
                        <GologsIcon name="darkDownload.svg" />
                    </span>
                </>
            );

            return r;
        });
        this.setState({ data: data });
    }
    
    componentDidMount() {
        this.getData(this.props.id);
    }
    
    render() {
        return (
            <>
                { this.state.columnDefs.length > 0 && (
                    <GologsTable
                        hideNumbering={true}
                        hideSearch={true}
                        columnDefs={this.state.columnDefs}
                        data={this.state.unit.documents}
                        columns={this.state.columns}
                    />
                ) }
            </>
        );  
    }
}