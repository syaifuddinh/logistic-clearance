import React from "react";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import { EmailSeparatedSemicolon } from "../../../../../components/Label/EmailSeparatedSemicolon/Loadable";
import GologsInput from "../../../../../components/Input/GologsInput";
import { ServiceInput } from "../../../../../components/Input/Service/Loadable";
import { ContractNumberInput } from "../../../../../components/Input/ContractNumber/Loadable";
import User from "../../../../../../model/User";

type IProps = {
    data: any;
    onDataChange: any;
    option: any;
    onOptionChange: any;
    list: any;
};

export default class ContractForm extends React.Component<IProps>{
    render() {
        return (
            <>
                <div>
                    <div className="fs-18px text-capitalize">
                        <GeneralTranslation slug="contractNumber" />
                    </div>

                    <div className="d-flex justify-content-between mt-3 w-100">
                        <div className="w-32">
                            <ContractNumberInput
                                translation="contractNumber"
                                value={this.props.option.contractNumber}
                                cargoOwnerName={User.getCompanyName()}
                                serviceName={this.props.data.service.value}
                                key={this.props.data.service.value}
                                onChange={e => {
                                    this.props.onOptionChange(
                                        "contractNumber",
                                        e
                                    );
                                }}
                            />
                        </div>
                        <div className="w-32">
                            <GologsInput
                                labelSlug="freightForwarderOrPpjk"
                                showAsterisk={true}
                                placeholderByTranslation={true}
                                translation="freightForwarderOrPpjk"
                                value={this.props.data.freightForwarder}
                                readonly={true}
                            />
                        </div>
                        <div className="w-32">
                            <ServiceInput
                                labelSlug="service"
                                showAsterisk={true}
                                value={this.props.data.service}
                                onChange={async e => {
                                    await this.props.onDataChange("service", e);
                                    this.props.onOptionChange(
                                        "contractNumber",
                                        null
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="fs-18px mt-4">
                        <GeneralTranslation slug="inviteAndNotifyPeople" />
                    </div>

                    <div className="d-flex justify-content-between mt-3 w-100">
                        <div className="w-32">
                            <GologsInput
                                labelSlug="emailAddress"
                                placeholderByTranslation={true}
                                translation="emailAddress"
                                value={this.props.data.notifyPeopleEmail}
                                onChange={e => {
                                    this.props.onDataChange(
                                        "notifyPeopleEmail",
                                        e.target.value
                                    );
                                }}
                            />
                            <EmailSeparatedSemicolon />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
