import React from "react";
import { Message, MessageTitle } from "../../../styles/Result";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/i18n";
import { Form, Col, Row } from "react-bootstrap";

interface IProps {
  data?: any;
  found?: boolean;
  SLName?: any;
}

export default function Result(props: IProps) {
  const { t } = useTranslation();
  const handleChange = e => {};

  const LabelContainer = () => {
    return (
      <Form className="mt-5 col-md-12">
        <Row>
          <Form.Label column sm={3}>
            {t(translations.wizard.bottom.result.containerNo)}
          </Form.Label>
          <Form.Label column sm={3}>
            {t(translations.wizard.bottom.result.sealNo)}
          </Form.Label>
          <Form.Label column sm={3}>
            {t(translations.wizard.bottom.result.sizeType)}
          </Form.Label>
          <Form.Label column sm={3}>
            {t(translations.wizard.bottom.result.containerType)}
          </Form.Label>
        </Row>
      </Form>
    );
  };

  const ItemContainer = (props: IProps) => {
    return (
      <Form className="col-md-12">
        <Row>
          <Form.Label column sm={3}>
            <input
              className="form-control"
              value={props.data ? props.data.container_no : ""}
              readOnly
            />
          </Form.Label>
          <Form.Label column sm={3}>
            <input
              className="form-control"
              value={props.data ? props.data.noSeal : ""}
              readOnly
            />
          </Form.Label>
          <Form.Label column sm={3}>
            <input
              className="form-control"
              value={props.data ? props.data.container_size : ""}
              readOnly
            />
          </Form.Label>
          <Form.Label column sm={3}>
            <input
              className="form-control"
              value={props.data ? props.data.container_type : ""}
              readOnly
            />
          </Form.Label>
        </Row>
      </Form>
    );
  };

  const DataCargo = (props: IProps) => {
    return (
      <Form className="col-md-12">
        <Form.Row>
          <Form.Group as={Col} sm={4}>
            <Form.Label>{t(translations.wizard.bottom.shipingline)}</Form.Label>
            <Form.Control
              type="text"
              value={props.SLName ? props.SLName : ""}
            />
          </Form.Group>
          <Form.Group as={Col} sm={2} />
          <Form.Group as={Col} sm={5}>
            <Form.Label>{t(translations.wizard.bottom.mblnumber)}</Form.Label>
            <Form.Control
              type="text"
              value={props.data && props.data[0] ? props.data[0].bl_no : ""}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={4}>
            <Form.Label>
              {t(translations.wizard.bottom.result.notifyParty)}
            </Form.Label>
            <Form.Control
              type="text"
              value={
                props.data && props.data[0] ? props.data[0].notify_penerima : ""
              }
            />
          </Form.Group>
          <Form.Group as={Col} sm={2} />
          <Form.Group as={Col} sm={5}>
            <Form.Row>
              <Form.Group as={Col} sm={6}>
                <Form.Label>
                  {t(translations.wizard.bottom.result.vessel)}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={
                    props.data && props.data[0]
                      ? props.data[0].nama_sarana_pengangkut
                      : ""
                  }
                />
              </Form.Group>
              <Form.Group as={Col} sm={6}>
                <Form.Label>
                  {t(translations.wizard.bottom.result.voyageNumber)}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={
                    props.data && props.data[0] ? props.data[0].no_voyage : ""
                  }
                />
              </Form.Group>
            </Form.Row>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={4}>
            <Form.Label>
              {t(translations.wizard.bottom.result.consignee)}
            </Form.Label>
            <Form.Control
              type="text"
              value={
                props.data && props.data[0]
                  ? props.data[0].consignee_pemilik
                  : ""
              }
            />
          </Form.Group>
          <Form.Group as={Col} sm={2} />
          <Form.Group as={Col} sm={5}>
            <Form.Label>
              {t(translations.wizard.bottom.result.portOfLoading)}
            </Form.Label>
            <Form.Control
              type="text"
              value={
                props.data && props.data[0] ? props.data[0].pelabuhan_muat : ""
              }
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={4}></Form.Group>
          <Form.Group as={Col} sm={2} />
          <Form.Group as={Col} sm={5}>
            <Form.Label>
              {t(translations.wizard.bottom.result.portOfDischarge)}
            </Form.Label>
            <Form.Control
              type="text"
              value={
                props.data && props.data[0]
                  ? props.data[0].pelabuhan_bongkar
                  : ""
              }
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={4}></Form.Group>
          <Form.Group as={Col} sm={2} />
          <Form.Group as={Col} sm={5}>
            <Form.Label>
              {t(translations.wizard.bottom.result.portOfDelivery)}
            </Form.Label>
            <Form.Control
              type="text"
              value={
                props.data && props.data[0] ? props.data[0].pelabuhan_akhir : ""
              }
            />
          </Form.Group>
        </Form.Row>
      </Form>
    );
  };

  const Containers = (props: IProps) =>
    props.data
      ? props.data.map((key, i) => <ItemContainer key={i} data={key} />)
      : null;

  const NotifyParty = () => {
    return (
      <Form className="mt-5 mb-5">
        <Form.Row>
          <Form.Group as={Col} sm={4}>
            <Form.Label>Invite and Notify People</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
        </Form.Row>
      </Form>
    );
  };
  const messageToast = props.found
    ? t(translations.wizard.bottom.result.foundStatus)
    : t(translations.wizard.bottom.result.notFoundStatus);

  return (
    <>
      <Message error={!props.found}>
        <MessageTitle>{messageToast}</MessageTitle>
      </Message>
      {/* <Label>{t(translations.wizard.bottom.result.containerInformation)}</Label> */}
      <DataCargo data={props.data} SLName={props.SLName} />
      <LabelContainer />
      <Containers data={props.data} />
      <NotifyParty />
    </>
  );
}
