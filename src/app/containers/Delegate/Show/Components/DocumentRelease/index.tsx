import React, { Component } from "react";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import GologsTable from "../../../../../components/Table/GologsTable";
import { GologsIcon } from "../../../../../components/Icon/Loadable";


type IProps = {
    data?: any;
}

export default class DocumentRelease extends Component<IProps> {
    state = {
        columns: [],
        columnDefs: [],
        data: []
    };

    openUrl = (url) => {
        return () => {
            if (url) {
                window.open(url, "_blank");
            }
        }
    }
    
    componentDidMount() {
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
        let data: any = this.state.data;
        data = this.props.data.map((v) => {
            let r: any = v;
            r.download = (
                <>
                    <span
                        className="d-inline-block"
                        onClick={r.onClick}
                    >
                        <GologsIcon name="darkEye.svg" />
                    </span>
                    <span
                        className="d-inline-block ml-4"
                        onClick={r.onClick}
                    >
                        <GologsIcon name="darkDownload.svg" />
                    </span>
                </>
            );

            return r;
        })
        this.setState({data : data});
    }
    
    render() {
        return (
            <>
                {this.state.columnDefs.length > 0 && (
                    <GologsTable
                        hideNumbering={true}
                        hideSearch={true}
                        columnDefs={this.state.columnDefs}
                        data={this.props.data}
                        columns={this.state.columns}
                    />
                )}
            </>
        );  
    }
}