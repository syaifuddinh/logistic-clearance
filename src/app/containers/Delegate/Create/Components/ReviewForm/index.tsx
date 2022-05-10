import React from "react";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import { DocumentForm } from "../DocumentForm/Loadable";

type IProps = {
    data: any;
};

export default class ReviewForm extends React.Component<IProps>{
    render() {
        return (
            <>
                <div>
                    <div className="fs-18px">
                        <GeneralTranslation slug="contractNumber" />
                    </div>

                    <div className="d-flex justify-content-between mt-3 w-100">
                        <div className="w-32">
                            <GeneralTranslation
                                slug="contractNumber"
                                className="fs-14px text-fifth-gray"
                            />

                            <div className="mt-2 fs-16px">
                                {this.props.data.contractNumber}
                            </div>
                        </div>

                        <div className="w-32">
                            <GeneralTranslation
                                slug="freightForwarderOrPpjk"
                                className="fs-14px text-fifth-gray"
                            />

                            <div className="mt-2 fs-16px">
                                {this.props.data.freightForwarder}
                            </div>
                        </div>

                        <div className="w-32">
                            <GeneralTranslation
                                slug="service"
                                className="fs-14px text-fifth-gray"
                            />

                            <div className="mt-2 fs-16px">
                                {this.props.data.service.label}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-4">
                    <div className="fs-18px">
                        <GeneralTranslation slug="inviteAndNotifyPeople" />
                    </div>

                    <div className="d-flex justify-content-between mt-3 w-100">
                        <div className="w-100">
                            <GeneralTranslation
                                slug="emailAddress"
                                className="fs-14px text-fifth-gray"
                            />

                            <div className="mt-2 fs-16px">
                                {this.props.data.notifyPeopleEmail}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <DocumentForm
                        data={this.props.data}
                        isPreview={true}
                    />
                </div>
            </>
        );
    }
}
