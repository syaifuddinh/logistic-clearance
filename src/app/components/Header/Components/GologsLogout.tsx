import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import MenuLink from "../../../components/Menu/MenuLink";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import User from "../../../../model/User";

export default function GologsLogout(props) {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => {
        setShowModal(true);
    };

    const logout = () => {
        User.logout()
    };
    
    return (
      <>
        <div onClick={handleShow}>
          {(!props.variant || props.variant == "primary") && (
            <MenuLink
              title={t(translations.sidebarMenu.logout)}
              icon={require("../../../../assets/icons/logout.svg")}
              active={false}
              hasChild={false}
              child={false}
              url="#"
            />
          )}

          {props.variant && props.variant == "secondary" && (
            <a className="text-capitalize font-weight-bold text-primary">
                {
                    t(translations.sidebarMenu.logout)
                }
            </a>
          )}
        </div>

        <Modal
          show={showModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
            <div className="d-flex flex-column p-5 align-items-center">
              <h1 className="font-weight-bold text-uppercase">
                {t(translations.sidebarMenu.logout)}
              </h1>
              <p className="mt-4">{t(translations.logout.question)}</p>

              <Button
                variant="secondary"
                onClick={handleClose}
                style={{ borderRadius: "14mm" }}
                className="mt-4 p-3 font-weight-bold w-50"
              >
                {t(translations.entities.general.cancel)}
              </Button>
              <Button
                variant="link"
                onClick={logout}
                style={{ borderRadius: "14mm" }}
                className="mt-4 p-3 font-weight-bold w-50 text-dark"
              >
                {t(translations.logout.approve)}
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
}
