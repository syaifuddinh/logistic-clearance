import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Show } from "./Show/Loadable";
import { translations } from "../../../../locales/i18n";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import GologsTable from "../../../components/Table/GologsTable";
import EventEmitter from "../../../components/Event/EventEmitter";
import CreatePage from "./Component/Create";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFolder,
    faPencilAlt,
    faTrash
} from "@fortawesome/free-solid-svg-icons";

export default function ContainerPage(props) {
    const [isShowCreatePage, setIsShowCreatePage] = useState(false);
    const showCreatePage = () => {
        setIsShowCreatePage(true);
    };
    const hideCreatePage = () => {
        setIsShowCreatePage(false);
    };
    const edit = () => {
        showCreatePage();
    };

    const destroy = () => {};
    // const auth = useAuth();
    const { t } = useTranslation();
    const breadcrumbs = [
        {
            name: t(translations.sidebarMenu.masterData)
        },
        {
            name: t(translations.sidebarMenu.container)
        }
    ];

    const getDetailBtn = () => (
        <div>
            <a
                href="/master_data/container/detail"
                className="text-secondary font-weight-bold mr-2"
            >
                <FontAwesomeIcon icon={faFolder} />
            </a>
            <a href="#" onClick={edit} className="text-primary font-weight-bold mr-2">
                <FontAwesomeIcon icon={faPencilAlt} />
            </a>
            <a href="#" onClick={destroy} className="text-danger font-weight-bold">
                <FontAwesomeIcon icon={faTrash} />
            </a>
        </div>
    );

    let { path } = useRouteMatch();

    EventEmitter.subscribe("hideCreatePage", () => hideCreatePage());
    // async function handleLogoutClick(event) {
    //   if (auth === null) return;
    //   await auth.signOut();
    //   await auth.userManager?.signoutCallback();
    // }

    let content;
    const columnDefs = [
        { title: t(translations.entities.general.code) },
        { title: t(translations.entities.general.Type) },
        { title: t(translations.entities.general.size) },
        { title: t(translations.entities.general.maxWeight) },
        { title: t(translations.entities.general.number) },
        { title: t(translations.entities.general.owner) },
        { title: t(translations.entities.general.condition) },
        { title: t(translations.entities.general.attachment) },
        { title: t(translations.entities.general.action) }
    ];

    const columns = [
        { data: "code" },
        { data: "type" },
        { data: "size" },
        { data: "maxWeight" },
        { data: "number" },
        { data: "owner" },
        { data: "condition" },
        { data: "attachment" },
        { data: "action" }
    ];

    const data = [
        {
            id: 1,
            code: "2280",
            type: "OPEN TOP",
            maxWeight: "50 Ton",
            size: "20 Feet",
            number: "CNTR00021",
            owner: "Evergreen Line",
            condition: "Grade A",
            attachment: "Filename",
            action: getDetailBtn()
        },
        {
            id: 1,
            code: "2280",
            type: "HIGH CUBE",
            maxWeight: "50 Ton",
            size: "20 Feet",
            number: "CNTR00021",
            owner: "Evergreen Line",
            condition: "Grade B",
            attachment: "Filename",
            action: getDetailBtn()
        }
    ];
    // if (auth === null || auth.userData === null) {
    //   content = <Ellipsis />;
    // } else {
    if (props.location.search.length > 0) {
        content = <Redirect to={"/"} />;
    } else {
        content = (
            <div className="gologs-container">
                <Container>
                <Row className="bg-white">
                    <Col className="px-3 pt-4  d-flex justify-content-between align-items-center">
                    <div className="d-inline-block">
                        <h4 className="font-weight-bold d-inline-block mb-0">
                        {t(translations.sidebarMenu.container)}
                        </h4>

                        <Breadcrumb items={breadcrumbs} />
                    </div>

                    <div>
                        <Button
                            onClick={showCreatePage}
                            variant="primary"
                            className="float-right font-weight-bold rounded-large px-4"
                        >
                        {t(translations.entities.general.addNew)}
                        </Button>
                    </div>
                    </Col>
                </Row>

                <Row className="bg-white mt-3">
                    <Col className="px-3 pt-4  d-flex justify-content-between align-items-center">
                    <GologsTable
                        columnDefs={columnDefs}
                        data={data}
                        columns={columns}
                    />
                    </Col>
                </Row>
                </Container>

                {isShowCreatePage && (
                <div
                    className="position-fixed w-100"
                    style={{ top: 0, left: 0, zIndex: 1000 }}
                >
                    <div
                        className="position-fixed w-100 h-100 bg-dark opacity-3"
                        style={{ top: 0, left: 0 }}
                    ></div>
                    <CreatePage />
                </div>
                )}
            </div>
        );
        // }
    }

    return (
        <>
            <Helmet>
                <title>{t(translations.home.title)}</title>
            </Helmet>
            <Sidebar header-name={t(translations.sidebarMenu.shippingLine)} />
            <Switch>
                <Route path={`${path}/:id`} component={Show} />
                <Route path={`${path}`}>{content}</Route>
            </Switch>
        </>
    );
}
