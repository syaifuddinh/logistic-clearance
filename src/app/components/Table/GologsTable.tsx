import React, { Component } from "react";
import { Table, Form, Row, Col } from "react-bootstrap";
import { GologsButton } from "../Button/Loadable";
import { GologsIcon } from "../Icon/Loadable";
import GologsInput from "../Input/GologsInput";
import { GeneralTranslation } from "..//Translation/Loadable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

type IColumns = {
    data: any;
    render?: any;
    className?: string;
    name?: string;
    searchable?: boolean;
};

type IColumnDefs = {
    id?: number;
    title?: any;
    className?: string;
    orderable?: boolean;
    orderType?: string;
    defaultOrderType?: string;
    isOrdered?: boolean;
    defaultSort?: boolean;
    ascendingRequest?: any;
    descendingRequest?: any;
};

interface IProps {
    columnDefs: IColumnDefs[];
    columns: IColumns[];
    data?: any;
    columnColor?: string;
    theadVariant?: string;
    hideNumbering?: boolean;
    hideSearch?: boolean;
    striped?: boolean;
    showExportButton?: boolean;
    serverSide?: boolean;
    target?: string;
    variant?: string;
    overflowX?: string;
    width?: number;
    defaultRequest?: any;
    endpoint?: any;
    onReload?: any;
    showSummaryLength?: boolean;
    showPagination?: boolean;
    isFloatingColumn?: boolean;
    totalDataParam?: any;
    startPaginationKey?: string;
    lengthPaginationKey?: string;
};

export default class GologsTable extends Component<IProps> {
    state: any = {
        id: "",
        headId: "",
        headContainerId: "",
        keyword: "",
        additionalTheadClass: "",
        page: 1,
        maxPage: 0,
        maxPageShowOnLength: 5,
        index: 0,
        length: 10,
        firstIndex: 0,
        lastIndex: 0,
        totalCount: 0,
        columnDefs: [],
        serverData: [],
        firstListPage: [],
        middleListPage: [],
        lastListPage: []
    };

    alignHeadAndBody = () => {
        let headContainerEl: any = null;
        let tableEl: any = null;
        let headContainerChild: any = null;
        headContainerEl = document.getElementById(this.state.headContainerId);
        tableEl = document.getElementById(this.state.id);
        tableEl = tableEl.parentElement;
        if (headContainerEl && tableEl) {
            headContainerChild = headContainerEl.querySelector(".child");
            if (headContainerChild) {
                tableEl.scroll(headContainerChild.scrollLeft, 0);
            }
        }
    };

    alignBodyAndHead = () => {
        let headContainerEl: any = null;
        let tableEl: any = null;
        let headContainerChild: any = null;
        headContainerEl = document.getElementById(this.state.headContainerId);
        tableEl = document.getElementById(this.state.id);
        tableEl = tableEl.parentElement;
        if (headContainerEl && tableEl) {
            headContainerChild = headContainerEl.querySelector(".child");
            if (headContainerChild) {
                headContainerChild.scroll(tableEl.scrollLeft, 0);
            }
        }
    };

    adjustColumn = () => {
        let headEl: any = {};
        let headContainerEl: any = null;
        let headContainerChild: any = null;
        let tableEl: any = {};
        let tableContainerEl: any = {};
        let tr: any = {};
        let cols: any = [];
        let th: any = {};
        let rect: any = {};
        let additionalTheadClass: string = "";
        headEl = document.getElementById(this.state.headId);
        tableEl = document.getElementById(this.state.id);
        if (tableEl) {
            tr = tableEl.querySelector("tbody tr");
            cols = tr.querySelectorAll("td");
        }
        if (headEl && tableEl) {
            tableContainerEl = tableEl.parentElement;
            rect = tableEl.getBoundingClientRect();
            if (rect.y <= 0) {
                headContainerEl = document.getElementById(this.state.headContainerId)
                if (!headContainerEl) {
                    headContainerEl = document.createElement("div");
                    headContainerEl.setAttribute(
                        "id",
                        this.state.headContainerId
                    );
                }
                if (headContainerEl.hasChildNodes()) {
                    headContainerEl.removeChild(headContainerEl.childNodes[0]);
                }
                additionalTheadClass = "d-none d-md-block border-bottom-2px h-50px bg-white t-0";
                headContainerEl.style.zIndex = 100;
                headContainerEl.style.position = "fixed";
                headContainerEl.style.left =
                tableContainerEl.getBoundingClientRect().x + "px";
                headContainerEl.style.width = tableContainerEl.getBoundingClientRect().width + "px";
                headContainerEl.setAttribute("class", "d-none d-md-block");
                headContainerChild = document.createElement("div");
                headContainerChild.setAttribute("class", "child");
                headContainerChild.style.width = headContainerEl.style.width;
                headContainerChild.style.overflowX = "scroll";
                headContainerChild.style.overflowY = "hidden";
                headContainerChild.addEventListener("scroll", this.alignHeadAndBody);
                
                headEl.style.width = rect.width + "px";
                
                th = headEl.querySelectorAll("th");
                th.forEach((v, i) => {
                    let width: number = 0;
                    if (i < cols.length) {
                        width = cols[i].offsetWidth;
                        v.style.width = width + "px";
                    }
                });
                
                headContainerEl.prepend(headContainerChild);
                headContainerChild.prepend(headEl);
                document.body.prepend(headContainerEl);
                headContainerChild.scroll(tableContainerEl.scrollLeft, 0);
            } else {
                additionalTheadClass = "d-none d-md-table-header-group";
                headEl.style.zIndex = 1;
                headEl.style.position = "static";
                tableEl.prepend(headEl);
                headContainerEl = document.getElementById(
                    this.state.headContainerId
                    );
                    if (headContainerEl) {
                        headContainerEl.remove();
                    } 
                }
            }
            this.setState({additionalTheadClass: additionalTheadClass});
        }

    getPagination = () => {
        let firstListPage: any = [];
        let middleListPage: any = [];
        let lastListPage: any = [];
        let maxPageShowOnLength = this.state.maxPageShowOnLength;
        let i: number = 0;
        if (this.state.length > -1) {
            if (this.state.maxPage < maxPageShowOnLength) {
                maxPageShowOnLength = this.state.maxPage;
                this.setState({
                    maxPageShowOnLength: maxPageShowOnLength
                });
            }

            for (i = 0; i < maxPageShowOnLength; i++) {
                firstListPage.push(i + 1);
            }

            middleListPage.push(this.state.page - 1);
            middleListPage.push(this.state.page);
            middleListPage.push(this.state.page + 1);

            for (
                i = this.state.maxPage - maxPageShowOnLength + 1;
                i <= this.state.maxPage;
                i++
            ) {
                lastListPage.push(i);
            }
        } else {
            firstListPage.push(1);
        }

        this.setState({ firstListPage: firstListPage });
        this.setState({ middleListPage: middleListPage });
        this.setState({ lastListPage: lastListPage });
    };

    getColor = (variant = "") => {
        let color;
        if (variant == "grey") {
            color = "#818181";
        } else {
            color = "#212529";
        }

        return color;
    };

    setId = () => {
        let id: string = "";
        let headId: string = "";
        let headContainerId: string = "";
        id = "table" + (Math.round(Math.random() * 9999999999));
        headId = "thead" + (Math.round(Math.random() * 9999999999));
        headContainerId = "headContainer" + (Math.round(Math.random() * 9999999999));
        this.setState({id: id});
        this.setState({headId: headId});
        this.setState({headContainerId: headContainerId});
    }

    componentDidMount() {
        this.getColumnDefs();
        this.setId();
        if (this.props.serverSide) {
            setTimeout(() => {
                this.getDataFromServer();
            }, 60);
        }
        if (this.props.isFloatingColumn) {
            window.addEventListener("scroll", this.adjustColumn);
        } 
        this.setTheadClass();
        this.setTableAligner();
    }

    setTableAligner = () => {
        let tableEl: any = null;
        setTimeout(() => {
            if (this.props.overflowX === "scroll") {
                tableEl = document.getElementById(this.state.id);
                if (tableEl) {
                    tableEl = tableEl.parentElement;
                    tableEl.addEventListener("scroll", this.alignBodyAndHead)
                }
            }
        }, 1000)
    }

    setTheadClass = () => {
        let r: string = "";
        if (this.props.isFloatingColumn) {
            this.adjustColumn();
        } else {
            r = "d-none d-md-table-header-group ";
            this.setState({additionalTheadClass: r});
        }
    }

    componentWillUnmount() {
        let headContainerEl: any = null;
        headContainerEl = document.getElementById(this.state.headContainerId);
        if (headContainerEl) {
            headContainerEl.remove();
        }
        
        if (this.props.isFloatingColumn) {
            window.addEventListener("scroll", this.adjustColumn);
        }
        
    }

    getColumnDefs = () => {
        let columnDefs: IColumnDefs[] = this.state.columnDefs;
        columnDefs = this.props.columnDefs;
        columnDefs = columnDefs.map(x => {
            x.id = Math.round(Math.random() * 99999999999999);
            x.isOrdered = false;
            x.orderType = "asc";
            if (x.defaultSort === true) {
                x.isOrdered = true;
            }
            
            if (x.defaultOrderType == "asc" || x.defaultOrderType == "desc") {
                x.orderType = x.defaultOrderType;
            }
                return x;
        });
        this.setState({ columnDefs: columnDefs });
    }

    changeOrderable = id => {
        let unit: any = {};
        let columnDefs: any = this.state.columnDefs;
        let idx = columnDefs.findIndex(x => x.id == id);
        if (idx > -1) {
            columnDefs = columnDefs.map(v => {
                v.isOrdered = false;

                return v;
            });
            unit = columnDefs[idx];
            if (unit.orderable === true) {
                columnDefs[idx].isOrdered = true;
                if (unit.orderType == "asc") {
                    columnDefs[idx].orderType = "desc";
                } else if (unit.orderType == "desc") {
                    columnDefs[idx].orderType = "asc";
                }
                this.setState({ columnDefs: columnDefs });
                this.getDataFromServer();
            }
        }
    };

    getActivePageClass = page => {
        let variant: any = this.props.variant;
        let r: string = "";
        if (page == this.state.page) {
            r = "text-white ";
            if (!variant || variant == "primary") {
                r += "bg-primary";
            } else if (variant == "secondary") {
                r += "bg-secondary";
            }
        }

        return r;
    };

    getSummaryLength() {
        let firstIndex: number = this.state.firstIndex;
        let lastIndex: number = this.state.lastIndex;
        let maxPage: number = this.state.maxPage;
        if (this.state.length > -1) {
            firstIndex =
                (this.state.page - 1) * this.state.length + 1;
            lastIndex =
                firstIndex - 1 + this.state.serverData.length;
            maxPage = Math.ceil(
                this.state.totalCount / this.state.length
            );
        } else {
            firstIndex = 1;
            lastIndex = this.state.serverData.length;
            maxPage = 1;
        }
        this.setState({ firstIndex: firstIndex });
        this.setState({ lastIndex: lastIndex });
        this.setState({ maxPage: maxPage });
    }

    getTheadClass = () => {
        let variant: string = "default";
        let r = "";
        if (this.props.theadVariant) {
            variant = this.props.theadVariant;
        }

        switch (variant) {
            case "secondary":
                r =
                    "px-1 py-3 font-weight-light-bold text-primary-gray bg-semi-secondary";
                break;
        }

        return r;
    };

    changeKeyword = e => {
        this.setState({ keyword: e.target.value });
        if (this.props.serverSide === true) {
            setTimeout(() => {
                this.getDataFromServer();
            }, 100);
        }
    };

    nextPage = () => {
        let next: number = this.state.page + 1;
        if (next > this.state.maxPage) {
            next = this.state.maxPage;
        }
        this.changePage(next);
    };

    previousPage = () => {
        let previous: number = this.state.page - 1;
        if (previous < 1) {
            previous = 1;
        }
        this.changePage(previous);
    };

    changePage = e => {
        this.setState({ page: e });
        setTimeout(() => {
            this.getDataFromServer();
        }, 100);
    };

    changeLength = e => {
        this.setState({ length: e.target.value });
        setTimeout(() => {
            this.getDataFromServer();
        }, 100);
    };

    getDataFromServer = async () => {
        let params: any = {};
        let r = [];
        let index: number =
            (this.state.page - 1) * this.state.length;
        let totalCount: number = 0;
        let keyword: string = this.state.keyword.trim();
        let searchables: any = [];
        let unit: any = {};
        let unitObj: any = {};
        let orderable: any = {};
        let i: number = 0;
        let columnName: string = "";

        this.setState({ index: index });
        if (this.props.defaultRequest) {
            params = Object.assign(
                params,
                this.props.defaultRequest
            );
        }

        if (keyword) {
            searchables = this.props.columns.filter(
                x => x.searchable === true
            );
            for (i = 0; i < searchables.length; i++) {
                unit = searchables[i];
                if (unit.name) {
                    columnName = unit.name.trim();
                    unitObj = {};
                    unitObj[columnName] = keyword;
                    params = Object.assign(params, unitObj);
                }
            }
        }

        orderable = this.state.columnDefs.find(
            x => x.orderable === true && x.isOrdered === true
        );
        if (orderable) {
            if (orderable.orderType == "desc") {
                if (orderable.descendingRequest) {
                    params = Object.assign(
                        params,
                        orderable.descendingRequest
                    );
                }
            }
            if (orderable.orderType == "asc") {
                if (orderable.ascendingRequest) {
                    params = Object.assign(
                        params,
                        orderable.ascendingRequest
                    );
                }
            }
        }

        if (this.state.length > -1) {
            if(this.props.startPaginationKey) {
                params[this.props.startPaginationKey] = index;
            } else {
                params.Start = index;
            }
            if(this.props.lengthPaginationKey) {
                params[this.props.lengthPaginationKey] =
                    this.state.length * this.state.page;
            } else {
                params.Length = this.state.length * this.state.page;
            }
        }

        try {
            let dt: any = await this.props.endpoint(params);
            if (this.props.target) {
                let target: string = this.props.target;
                r = dt.data[target];
            } else {
                if(dt.data) {
                    r = dt.data;
                } else {
                    r = dt;
                }
            }

            if (!r) {
                r = [];
            }

            if (this.props.onReload) {
                this.props.onReload(dt.data);
            }

            if(this.props.totalDataParam) {
                if(dt.data[this.props.totalDataParam]) {
                    totalCount = dt.data[this.props.totalDataParam];
                }
            } else {
                if (dt.data.totalCount) {
                    totalCount = dt.data.totalCount;
                }
            }
            this.setState({ totalCount: totalCount });
        } catch (e) {
            r = [];
        }

        this.setState({ serverData: r });
        this.getSummaryLength();
        this.getPagination();
    };

    showRow = data => {
        return (
            <tr>
                {this.props.columns &&
                    this.props.columns.map((x, i) => {
                        let className = "";
                        if (x.className) {
                            className = x.className;
                        }
                        return (
                            <td
                                className={
                                    "py-3 text-left d-block d-md-table-cell " +
                                    className +
                                    " " +
                                    (data.className
                                        ? data.className
                                        : "")
                                }
                            >
                                <div className="d-block d-md-none font-weight-light-bolder text-uppercase mb-1">
                                    { this.props.columnDefs[i].title ? this.props.columnDefs[i].title : "" }
                                </div>
                                {x.render
                                    ? x.render(data)
                                    : data[x.data]}
                            </td>
                        );
                    })}
            </tr>
        );
    };

    getData = () => {
        let result: any = [];
        let isMatch, i;
        let str = this.state.keyword.toLowerCase();
        if (this.props.data) {
            result = this.props.data;
        }

        if (str && str.length >= 2) {
            let isMatch = new RegExp(str);
            result = result.filter(v => {
                let passed = false;
                let value;
                for (i in v) {
                    value = v[i];
                    if (typeof value == "string") {
                        value = value.toLowerCase();
                        if (isMatch.test(value)) {
                            passed = true;
                        }
                    }
                }

                return passed;
            });
        }
        return result;
    };

    getTable = () => {
        return (
            <>
                <Table
                    size="sm"
                    striped={this.props.striped}
                    id={this.state.id}
                    className={this.props.width ? "md-w-" + this.props.width + "px" : ""}
                >
                    <thead
                        id={this.state.headId}
                        className={this.state.additionalTheadClass}
                    >
                        <tr
                            style={{
                                color: this.getColor(this.props.columnColor)
                            }}
                        >
                            {this.state.columnDefs &&
                                this.state.columnDefs.map((x, i) => {
                                    return (
                                        <th
                                            key={"th" + i}
                                            onClick={() => {
                                                this.changeOrderable(x.id);
                                            }}
                                            className={
                                                "text-capitalize font-weight-light-bolder fs-14px " +
                                                this.getTheadClass() +
                                                (x.className
                                                    ? " " + x.className
                                                    : "")
                                            }
                                        >
                                            <div className="d-flex align-items-center h-20px">
                                                <span className="d-inline-block">
                                                    {x.title}
                                                </span>
                                                {x.orderable && (
                                                    <span className="ml-2 d-inline-block position-relative">
                                                        <div
                                                            className="position-relative"
                                                            style={{
                                                                top: "5px"
                                                            }}
                                                        >
                                                            <GologsIcon
                                                                name={
                                                                    x.isOrdered ===
                                                                        true &&
                                                                    x.orderType ==
                                                                        "asc"
                                                                        ? "blackArrowUp.svg"
                                                                        : "grayArrowUp.png"
                                                                }
                                                                width="auto"
                                                                height={5}
                                                            />
                                                        </div>
                                                        <div
                                                            className="position-relative"
                                                            style={{
                                                                top: "-8px"
                                                            }}
                                                        >
                                                            <GologsIcon
                                                                name={
                                                                    x.isOrdered ===
                                                                        true &&
                                                                    x.orderType ==
                                                                        "desc"
                                                                        ? "blackArrowDown.png"
                                                                        : "grayArrowDown.svg"
                                                                }
                                                                width="auto"
                                                                height={5}
                                                            />
                                                        </div>
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                    );
                                })}
                        </tr>
                    </thead>
                    {!this.props.serverSide && (
                        <tbody className="font-weight-light-bold">
                            {((!this.props.serverSide && !this.props.data) ||
                                this.getData().length == 0) && (
                                <tr>
                                    <td
                                        className="text-center"
                                        colSpan={this.props.columnDefs.length}
                                    >
                                        <GeneralTranslation slug="noData" />
                                    </td>
                                </tr>
                            )}
                            {!this.props.serverSide &&
                                this.props.data &&
                                this.props.columns &&
                                this.getData().map(x => {
                                    return this.showRow(x);
                                })}
                        </tbody>
                    )}

                    {this.props.serverSide && (
                        <tbody>
                            {this.props.serverSide &&
                                this.state.serverData.length == 0 && (
                                    <tr>
                                        <td
                                            className="text-center"
                                            colSpan={this.props.columns.length}
                                        >
                                            <GeneralTranslation slug="noData" />
                                        </td>
                                    </tr>
                                )}

                            {this.props.serverSide &&
                                this.props.columns &&
                                this.state.serverData.length > 0 &&
                                this.state.serverData.map(x => {
                                    return this.showRow(x);
                                })}
                        </tbody>
                    )}
                </Table>
            </>
        );
    }
    
    render() {
        return (
            <>
                <div className="w-100">
                    <Row className="mb-3 d-flex justify-content-between">
                        <span className="d-flex w-80">
                            {!this.props.hideSearch && (
                                <Col md="5" xs="7">
                                    <GologsInput
                                        className="searchInputDatatable"
                                        variant="primary"
                                        icon="search.svg"
                                        placeholderByTranslation={true}
                                        translation="search"
                                        hidePrefix={true}
                                        value={this.state.keyword}
                                        onChange={this.changeKeyword}
                                    />
                                </Col>
                            )}
                            <button
                                type="button"
                                className="d-none"
                                id="datatableRefreshButton"
                                onClick={this.getDataFromServer}
                            >
                                Refresh
                            </button>
                            {!this.props.hideNumbering && (
                                <Col
                                    xs="6"
                                    className="d-flex align-items-center d-flex align-items-center"
                                >
                                    <div className="mr-2 text-capitalize md-fs-18px fs-14px">
                                        <GeneralTranslation slug="show" />
                                    </div>
                                    <Form.Control
                                        as="select"
                                        className="w-80px"
                                        value={this.state.length}
                                        onChange={this.changeLength}
                                    >
                                        <option value={10}>10</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                        <option value={-1}>All</option>
                                    </Form.Control>
                                </Col>
                            )}
                        </span>
                        <span>
                            {this.props.showExportButton && (
                                <GologsButton
                                    className="float-right"
                                    contentByTranslation={true}
                                    variant="success"
                                    size="small"
                                    translation="export"
                                    icon="whiteUpload.svg"
                                />
                            )}
                        </span>
                    </Row>

                    <Row>
                        <Col xs="12">
                            {this.props.overflowX == "scroll" && (
                                <div
                                    className="w-100"
                                    style={{ overflowX: "scroll" }}
                                >
                                    {this.getTable()}
                                </div>
                            )}
                            {!this.props.overflowX && <>{this.getTable()}</>}

                            <div className="mt-4 font-weight-light-bolder fs-11px md-fs-16px">
                                {this.props.showSummaryLength && (
                                    <span className="float-left">
                                        <GeneralTranslation
                                            slug="show"
                                            className="text-capitalize mr-1"
                                        />
                                        <span className="mr-1">
                                            {this.state.page}
                                        </span>
                                        <GeneralTranslation
                                            slug="outOf"
                                            className="mr-1"
                                        />
                                        <span className="mr-1">
                                            {this.state.maxPage}
                                        </span>
                                    </span>
                                )}

                                {this.props.showPagination && (
                                    <span className="float-right">
                                        <span onClick={this.previousPage}>
                                            <div className="text-capitalize mr-2 d-inline-flex align-items-center height-30px">
                                                <GeneralTranslation
                                                    slug="wizard.bottom.previous"
                                                    className="d-none d-md-inline-block"
                                                />

                                                <span className="d-inline-block d-md-none">
                                                    <FontAwesomeIcon
                                                        icon={faArrowLeft}
                                                    />
                                                </span>
                                            </div>
                                        </span>
                                        <span>
                                            {(this.state.page <
                                                this.state
                                                    .maxPageShowOnLength ||
                                                this.state.maxPage <=
                                                    this.state
                                                        .maxPageShowOnLength) && (
                                                <>
                                                    {this.state.firstListPage.map(
                                                        x => (
                                                            <span
                                                                onClick={() => {
                                                                    this.changePage(
                                                                        x
                                                                    );
                                                                }}
                                                                className={
                                                                    "d-inline-flex ml-2 justify-content-center align-items-center w-25px md-w-30px height-30px " +
                                                                    this.getActivePageClass(
                                                                        x
                                                                    )
                                                                }
                                                            >
                                                                {x}
                                                            </span>
                                                        )
                                                    )}
                                                    {this.state.maxPage >
                                                        this.state
                                                            .maxPageShowOnLength && (
                                                        <>
                                                            <span className="d-inline-flex ml-2 justify-content-center align-items-center w-13px height-30px">
                                                                ...
                                                            </span>
                                                            <span
                                                                onClick={() => {
                                                                    this.changePage(
                                                                        this
                                                                            .state
                                                                            .maxPage
                                                                    );
                                                                }}
                                                                className={
                                                                    "d-inline-flex ml-2 justify-content-center align-items-center w-25px md-w-30px height-30px " +
                                                                    this.getActivePageClass(
                                                                        this
                                                                            .state
                                                                            .maxPage
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    this.state
                                                                        .maxPage
                                                                }
                                                            </span>
                                                        </>
                                                    )}
                                                </>
                                            )}

                                            {this.state.page >=
                                                this.state
                                                    .maxPageShowOnLength &&
                                                this.state.page <=
                                                    this.state.maxPage - 5 &&
                                                this.state.maxPage >
                                                    this.state
                                                        .maxPageShowOnLength && (
                                                    <>
                                                        <span
                                                            onClick={() => {
                                                                this.changePage(
                                                                    1
                                                                );
                                                            }}
                                                            className={
                                                                "d-inline-flex ml-2 justify-content-center align-items-center w-25px md-w-30px height-30px " +
                                                                this.getActivePageClass(
                                                                    1
                                                                )
                                                            }
                                                        >
                                                            1
                                                        </span>
                                                        <span className="d-inline-flex ml-2 mr-2 justify-content-center align-items-center w-13px height-30px">
                                                            ...
                                                        </span>
                                                        {this.state.middleListPage.map(
                                                            x => (
                                                                <>
                                                                    <span
                                                                        onClick={() => {
                                                                            this.changePage(
                                                                                x
                                                                            );
                                                                        }}
                                                                        className={
                                                                            "d-inline-flex ml-2 justify-content-center align-items-center w-25px md-w-30px height-30px " +
                                                                            this.getActivePageClass(
                                                                                x
                                                                            )
                                                                        }
                                                                    >
                                                                        {x}
                                                                    </span>
                                                                </>
                                                            )
                                                        )}
                                                        <span className="d-inline-flex ml-2 justify-content-center align-items-center w-13px height-30px">
                                                            ...
                                                        </span>
                                                        <span
                                                            onClick={() => {
                                                                this.changePage(
                                                                    this.state
                                                                        .maxPage
                                                                );
                                                            }}
                                                            className={
                                                                "d-inline-flex ml-2 justify-content-center align-items-center w-25px md-w-30px height-30px " +
                                                                this.getActivePageClass(
                                                                    this.state
                                                                        .maxPage
                                                                )
                                                            }
                                                        >
                                                            {this.state.maxPage}
                                                        </span>
                                                    </>
                                                )}

                                            {this.state.page >=
                                                this.state.maxPage -
                                                    this.state
                                                        .maxPageShowOnLength &&
                                                this.state.page >=
                                                    this.state
                                                        .maxPageShowOnLength &&
                                                this.state.maxPage >
                                                    this.state
                                                        .maxPageShowOnLength && (
                                                    <>
                                                        <span
                                                            onClick={() => {
                                                                this.changePage(
                                                                    1
                                                                );
                                                            }}
                                                            className={
                                                                "d-inline-flex ml-2 justify-content-center align-items-center w-25px md-w-30px height-30px " +
                                                                this.getActivePageClass(
                                                                    1
                                                                )
                                                            }
                                                        >
                                                            1
                                                        </span>
                                                        <span className="d-inline-flex ml-2 mr-2 justify-content-center align-items-center w-13px height-30px">
                                                            ...
                                                        </span>
                                                        {this.state.lastListPage.map(
                                                            x => (
                                                                <>
                                                                    <span
                                                                        onClick={() => {
                                                                            this.changePage(
                                                                                x
                                                                            );
                                                                        }}
                                                                        className={
                                                                            "d-inline-flex ml-2 justify-content-center align-items-center w-25px md-w-30px height-30px " +
                                                                            this.getActivePageClass(
                                                                                x
                                                                            )
                                                                        }
                                                                    >
                                                                        {x}
                                                                    </span>
                                                                </>
                                                            )
                                                        )}
                                                    </>
                                                )}
                                        </span>
                                        <span onClick={this.nextPage}>
                                            <div className="ml-3 d-inline-flex align-items-center height-30px">
                                                <GeneralTranslation
                                                    slug="wizard.bottom.next"
                                                    className="d-none d-md-inline-block"
                                                />

                                                <span className="d-inline-block d-md-none">
                                                    <FontAwesomeIcon
                                                        icon={faArrowRight}
                                                    />
                                                </span>
                                            </div>
                                        </span>
                                    </span>
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}
