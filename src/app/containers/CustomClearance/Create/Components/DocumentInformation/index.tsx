import React from "react";
import { Row, Container } from "react-bootstrap";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import { RedAsterisk } from "../../../../../components/RedAsterisk/Loadable";
import { TableInput } from "../../../../../components/Input/Table/Loadable";
import Dropfile from "../../../../../components/Dropfile/Dropfile";

type IProps = {
    onDropFile: any;
    onDeleteFile: any;
    onDataChange: any;
    onItemsChange: any;
    data: any;
    files: any;
    btnSubmitRaised: any;
    step: number;
}

export default class DocumentInformation extends React.Component<IProps> {
    state = {
        data: {},
        items: [],
        tableInputKey: 1,
        tableHead: [
            {
                labelSlug: "field.hsCode",
                key: "hsCode"
            },
            {
                labelSlug: "field.itemName",
                key: "itemName"
            },
            {
                labelSlug: "field.qty",
                key: "qty",
                type: "number"
            },
        ]
    }

    componentDidMount() {
        this.reRenderItems();
    }

    onItemAdded = (items) => {
        this.setState({items: items});
        this.props.onItemsChange(items);
    }

    reRenderItems = () => {
        let tableInputKey: any = this.state.tableInputKey;
        ++tableInputKey;
        this.setState({ tableInputKey: tableInputKey });
    }
    
    render() {
        return (
            <Container fluid>
                <Row className="ml-0">
                    <div className="w-100 md-w-47 mb-15px md-mb-0px mr-3">
                        <div className="mb-3">
                            <GeneralTranslation slug="packingList" />
                            <RedAsterisk />
                        </div>

                        <div>
                            <Dropfile
                                onDrop={file => {
                                    this.props.onDropFile(
                                        "packingList",
                                        file[0]
                                    );
                                }}
                                onDelete={file => {
                                    this.props.onDeleteFile("packingList");
                                }}
                                showLoading={
                                    this.props.files.packingList.isShowLoading
                                }
                                file={this.props.files.packingList.file}
                                fileName={this.props.files.packingList.fileName}
                            />
                        </div>
                    </div>

                    <div className="w-100 md-w-47 mb-15px md-mb-0px">
                        <div className="mb-3">
                            <GeneralTranslation
                                slug="invoice"
                                className="text-capitalize"
                            />
                            <RedAsterisk />
                        </div>

                        <div>
                            <Dropfile
                                onDrop={file => {
                                    this.props.onDropFile("invoice", file[0]);
                                }}
                                onDelete={file => {
                                    this.props.onDeleteFile("invoice");
                                }}
                                showLoading={
                                    this.props.files.invoice.isShowLoading
                                }
                                file={this.props.files.invoice.file}
                                fileName={this.props.files.invoice.fileName}
                            />
                        </div>
                    </div>
                </Row>

                <Row className="ml-0 mt-2">
                    <div className="w-100 md-w-47 mb-15px md-mb-0px mr-2">
                        <div className="mb-3">
                            <GeneralTranslation slug="blOrAwb" />
                            <RedAsterisk />
                        </div>

                        <div>
                            <Dropfile
                                onDrop={file => {
                                    this.props.onDropFile("bl", file[0]);
                                }}
                                onDelete={file => {
                                    this.props.onDeleteFile("bl");
                                }}
                                showLoading={this.props.files.bl.isShowLoading}
                                file={this.props.files.bl.file}
                                fileName={this.props.files.bl.fileName}
                            />
                        </div>
                    </div>
                </Row>

                <TableInput
                    key={this.state.tableInputKey}
                    tableHead={this.state.tableHead}
                    onItemsChanged={this.onItemAdded}
                    data={this.props.data.items}
                />
            </Container>
        );
    }
}