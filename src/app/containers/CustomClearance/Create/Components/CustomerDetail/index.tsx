import React from "react";
import { Row, Container } from "react-bootstrap";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import GologsInput from "../../../../../components/Input/GologsInput";
import { GologsButton } from "../../../../../components/Button/Loadable";
import { RedAsterisk } from "../../../../../components/RedAsterisk/Loadable";
import { InputLabel } from "../../../../../components/Label/Input/Loadable";
import { EmailSeparatedSemicolon } from "../../../../../components/Label/EmailSeparatedSemicolon/Loadable";
import SelectBox from "../../../../../components/SelectBox/index";

type IProps = {
    onDataChange: any;
    data: any;
    list: any;
    btnSubmitRaised: any;
    step: number;
}

export default class CustomerDetail extends React.Component<IProps> {
    state = {
        data: {}
    }
    
    render() {
        return (
            <Container fluid>
                {this.props.step === 0 && (
                    <>
                        <Row className="mt-2 ml-0">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <GologsInput
                                    labelSlug="cargoOwnerOrCustomerTaxId"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"cargoOwnerOrCustomerTaxId"}
                                    value={
                                        this.props.data
                                            .cargoOwnerOrCustomerTaxId
                                    }
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "cargoOwnerOrCustomerTaxId",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px">
                                <GologsInput
                                    labelSlug="ppjkTaxId"
                                    placeholderByTranslation={true}
                                    translation={"ppjkTaxId"}
                                    value={this.props.data.ppjkTaxId}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "ppjkTaxId",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </Row>

                        <Row className="mt-3 ml-0">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <GologsInput
                                    labelSlug="cargoOwnerOrCustomerNib"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"cargoOwnerOrCustomerNib"}
                                    value={
                                        this.props.data.cargoOwnerOrCustomerNib
                                    }
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "cargoOwnerOrCustomerNib",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px">
                                <GologsInput
                                    labelSlug="ppjkNib"
                                    placeholderByTranslation={true}
                                    translation={"ppjkNib"}
                                    value={this.props.data.ppjkNib}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "ppjkNib",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </Row>

                        <Row className="mt-3 ml-0">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <GologsInput
                                    labelSlug="emailNotification"
                                    placeholderByTranslation={true}
                                    translation={"emailNotification"}
                                    value={this.props.data.emailNotification}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "emailNotification",
                                            e.target.value
                                        );
                                    }}
                                />
                                <EmailSeparatedSemicolon />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px">
                                <GologsInput
                                    labelSlug="phoneNotification"
                                    placeholderByTranslation={true}
                                    translation={"phoneNotification"}
                                    value={this.props.data.phoneNotification}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "phoneNotification",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-15 md-ml-10px ml-0px md-mt-0px mt-15px mb-35px d-flex align-items-end">
                                <GologsButton
                                    variant="primary"
                                    onClick={this.props.btnSubmitRaised}
                                    contentByTranslation={true}
                                    translation="wizard.bottom.next"
                                />
                            </div>
                        </Row>
                    </>
                )}

                {this.props.step === 1 && (
                    <>
                        <Row className="ml-0">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <SelectBox
                                    labelSlug="documentType"
                                    showAsterisk={true}
                                    variant="primary"
                                    items={this.props.list.documentType}
                                    value={this.props.data.documentType}
                                    onSelectedChange={e => {
                                        this.props.onDataChange(
                                            "documentType",
                                            e
                                        );
                                    }}
                                    placeholderByTranslation={true}
                                    translation={"documentType"}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <SelectBox
                                    labelSlug="customsOffice"
                                    showAsterisk={true}
                                    variant="primary"
                                    items={this.props.list.customsOffice}
                                    value={this.props.data.customsOffice}
                                    onSelectedChange={e => {
                                        this.props.onDataChange(
                                            "customsOffice",
                                            e
                                        );
                                    }}
                                    placeholderByTranslation={true}
                                    translation={"customsOffice"}
                                />
                            </div>
                        </Row>

                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <GologsInput
                                    labelSlug="requestDate"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"requestDate"}
                                    variant="primary"
                                    value={this.props.data.requestDate}
                                    type="date"
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "requestDate",
                                            e
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <SelectBox
                                    labelSlug="pibType"
                                    showAsterisk={true}
                                    variant="primary"
                                    items={this.props.list.pibType}
                                    value={this.props.data.pibType}
                                    onSelectedChange={e => {
                                        this.props.onDataChange("pibType", e);
                                    }}
                                    placeholderByTranslation={true}
                                    translation={"pibType"}
                                />
                            </div>
                        </Row>

                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <SelectBox
                                    labelSlug="importType"
                                    showAsterisk={true}
                                    variant="primary"
                                    items={this.props.list.importType}
                                    value={this.props.data.importType}
                                    onSelectedChange={e => {
                                        this.props.onDataChange(
                                            "importType",
                                            e
                                        );
                                    }}
                                    placeholderByTranslation={true}
                                    translation={"importType"}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px">
                                <SelectBox
                                    labelSlug="paymentMethod"
                                    showAsterisk={true}
                                    variant="primary"
                                    items={this.props.list.paymentMethod}
                                    value={this.props.data.paymentMethod}
                                    onSelectedChange={e => {
                                        this.props.onDataChange(
                                            "paymentMethod",
                                            e
                                        );
                                    }}
                                    placeholderByTranslation={true}
                                    translation={"paymentMethod"}
                                />
                            </div>
                        </Row>

                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <GologsInput
                                    labelSlug="blNumber"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"blNumber"}
                                    value={this.props.data.blNumber}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "blNumber",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <GologsInput
                                    labelSlug="blDate"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"blDate"}
                                    variant="primary"
                                    type="date"
                                    value={this.props.data.blDate}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "blDate",
                                            e
                                        );
                                    }}
                                />
                            </div>
                        </Row>

                        <h4 className="my-3">
                            <GeneralTranslation slug="sender" />
                        </h4>

                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <GologsInput
                                    labelSlug="name"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"name"}
                                    value={this.props.data.senderName}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "senderName",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <GologsInput
                                    labelSlug="address"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"address"}
                                    value={this.props.data.senderAddress}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "senderAddress",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </Row>

                        <h4 className="my-3">
                            <GeneralTranslation slug="seller" />
                        </h4>

                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <GologsInput
                                    labelSlug="name"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"name"}
                                    value={this.props.data.sellerName}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "sellerName",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <GologsInput
                                    labelSlug="address"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"address"}
                                    value={this.props.data.sellerAddress}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "sellerAddress",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </Row>

                        <h4 className="my-3">
                            <GeneralTranslation slug="importir" />
                        </h4>

                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <GologsInput
                                    labelSlug="name"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"name"}
                                    value={this.props.data.importirName}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "importirName",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <GologsInput
                                    labelSlug="address"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"address"}
                                    value={this.props.data.importirAddress}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "importirAddress",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </Row>

                        <h4 className="my-3">
                            <GeneralTranslation slug="cargoOwner" />
                        </h4>

                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <GologsInput
                                    labelSlug="name"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"name"}
                                    value={this.props.data.cargoOwnerName}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "cargoOwnerName",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <GologsInput
                                    labelSlug="address"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"address"}
                                    value={this.props.data.cargoOwnerAddress}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "cargoOwnerAddress",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </Row>

                        <h4 className="my-3">
                            <GeneralTranslation slug="portOfLoading" />
                        </h4>
                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="code"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"code"}
                                    value={this.props.data.portOfLoadingCode}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "portOfLoadingCode",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="name"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"name"}
                                    value={this.props.data.portOfLoadingName}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "portOfLoadingName",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </Row>

                        <h4 className="my-3">
                            <GeneralTranslation slug="portOfTransit" />
                        </h4>
                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="code"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"code"}
                                    value={this.props.data.portOfTransitCode}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "portOfTransitCode",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="name"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"name"}
                                    value={this.props.data.portOfTransitName}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "portOfTransitName",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </Row>

                        <h4 className="my-3">
                            <GeneralTranslation slug="portOfDestination" />
                        </h4>
                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="code"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"code"}
                                    value={
                                        this.props.data.portOfDestinationCode
                                    }
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "portOfDestinationCode",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="name"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"name"}
                                    value={
                                        this.props.data.portOfDestinationName
                                    }
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "portOfDestinationName",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </Row>

                        <h4 className="my-3">
                            <GeneralTranslation slug="additional" />
                        </h4>

                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <GologsInput
                                    labelSlug="registrationNumber"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"registrationNumber"}
                                    value={this.props.data.registrationNumber}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "registrationNumber",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2">
                                <GologsInput
                                    type="date"
                                    labelSlug="registrationDate"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"registrationDate"}
                                    value={this.props.data.registrationDate}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "registrationDate",
                                            e
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="moda"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"moda"}
                                    value={this.props.data.modaType}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "modaType",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="voyageNumber"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"voyageNumber"}
                                    value={this.props.data.voyageNumber}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "voyageNumber",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="voyageName"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"voyageName"}
                                    value={this.props.data.voyageName}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "voyageName",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    type="date"
                                    labelSlug="estimatedTimeArrival"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"estimatedTimeArrival"}
                                    value={this.props.data.estimatedTimeArrival}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "estimatedTimeArrival",
                                            e
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="field.invoiceNumber"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.invoiceNumber"}
                                    value={this.props.data.invoiceNumber}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "invoiceNumber",
                                            e
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="field.kmdTransactionNumber"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.kmdTransactionNumber"}
                                    value={this.props.data.kmdTransactionNumber}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "kmdTransactionNumber",
                                            e
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="field.documentNumber"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.documentNumber"}
                                    value={this.props.data.documentNumber}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "documentNumber",
                                            e
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    type="date"
                                    labelSlug="field.documentDate"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.documentDate"}
                                    value={this.props.data.documentDate}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "documentDate",
                                            e
                                        );
                                    }}
                                />
                            </div>
                        </Row>

                        <h4 className="my-3">
                            <GeneralTranslation slug="field.importFacility" />
                        </h4>
                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="code"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"code"}
                                    value={this.props.data.importFacilityCode}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "importFacilityCode",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="name"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"name"}
                                    value={this.props.data.importFacilityName}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "importFacilityName",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </Row>

                        <h4 className="my-3">
                            <GeneralTranslation slug="field.warehouse" />
                        </h4>
                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="code"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"code"}
                                    value={this.props.data.warehouseCode}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "warehouseCode",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="name"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"name"}
                                    value={this.props.data.warehouseName}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "warehouseName",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </Row>

                        <h4 className="my-3">
                            <GeneralTranslation slug="field.currency" />
                        </h4>
                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="code"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"code"}
                                    value={this.props.data.currencyCode}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "currencyCode",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="name"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"name"}
                                    value={this.props.data.currencyName}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "currencyName",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="field.ndpbm"
                                    type="number"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.ndpbm"}
                                    value={this.props.data.ndpbm}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "ndpbm",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="field.fob"
                                    type="number"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.fob"}
                                    value={this.props.data.fobTotal}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "fobTotal",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="field.insuranceOrLdn"
                                    type="number"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.insuranceOrLdn"}
                                    value={this.props.data.insuranceTotal}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "insuranceTotal",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="field.freight"
                                    type="number"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.freight"}
                                    value={this.props.data.freightTotal}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "freightTotal",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="field.customsValue"
                                    type="number"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.customsValue"}
                                    value={this.props.data.customsValueTotal}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "customsValueTotal",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </Row>

                        <h4 className="my-3">
                            <GeneralTranslation slug="field.container" />
                        </h4>
                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="field.number"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.number"}
                                    value={this.props.data.containerNumber}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "containerNumber",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="field.name"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.name"}
                                    value={this.props.data.containerName}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "containerName",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="field.type"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.type"}
                                    value={this.props.data.containerType}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "containerType",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </Row>

                        <h4 className="my-3">
                            <GeneralTranslation slug="field.packaging" />
                        </h4>
                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="field.total"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.total"}
                                    value={this.props.data.packagingTotal}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "packagingTotal",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="field.type"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.type"}
                                    value={this.props.data.packagingType}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "packagingType",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="field.brand"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.brand"}
                                    value={this.props.data.packagingBrand}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "packagingBrand",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </Row>

                        <h4 className="my-3">
                            <GeneralTranslation slug="field.weight" />
                        </h4>
                        <Row className="ml-0 mt-2">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="field.grossWeight"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.grossWeight"}
                                    value={this.props.data.grossWeight}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "grossWeight",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                            <div className="w-100 md-w-37 mb-15px md-mb-0px mr-2 mt-2">
                                <GologsInput
                                    labelSlug="field.nettWeight"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"field.nettWeight"}
                                    value={this.props.data.nettWeight}
                                    onChange={async e => {
                                        await this.props.onDataChange(
                                            "nettWeight",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </Row>
                    </>
                )}
            </Container>
        );
    }
}