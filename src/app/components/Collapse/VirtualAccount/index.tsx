import React, { Component } from "react";
import { Collapse } from "../Loadable"
import { GeneralTranslation } from "../../Translation/Loadable";
import { GologsButton } from "../../Button/Loadable";
import { GologsImage } from "../../Image/Loadable";
import GologsInput from "../../Input/GologsInput";
import Bank from "../../../../model/Bank";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight
} from "@fortawesome/free-solid-svg-icons";

export default class VirtualAccount extends Component {
    state = {
        ifDontHave: null,
        content: null,
        phone: null,
        selectedBank: {
            image: null
        }
    };

    componentDidMount() {
        this.openListBank();    
        let authUser: any = localStorage.getItem("authUser");
        if (authUser) {
            authUser = JSON.parse(authUser);
            if (authUser.person) {
                this.setState({phone: authUser.person.phone});
            }
        }
        // this.openAuthForm("")();    
    }

    openPrePayment = () => {
        let ifDontHave: any = this.state.ifDontHave;
        ifDontHave = (
            <>
                <GeneralTranslation slug="paymentMethod.directDebit.ifDontHave" />
                <div className="mt-3 d-flex justify-content-center">
                    <GologsButton
                        size="small"
                        variant="primary"
                        contentByTranslation={true}
                        translation="paymentMethod.directDebit.addNew"
                        onClick={this.openListBank}
                    />
                </div>
            </>
        );

        this.setState({ ifDontHave: ifDontHave });
        this.setState({ content: ifDontHave });
    }

    openListBank = () => {
        let content: any = this.state.content;
        content = (
            <>
                {Bank.list.map((v, i) => (
                    <div
                        className="py-3 position-relative d-flex align-items-center"
                        onClick={this.openForm(v.slug)}
                        key={"item" + i}
                    >
                        <div className="w-160px font-weight-light-bolder">
                            {v.name}
                        </div>
                        <div className="">
                            <GologsImage
                                name={v.image}
                                height={50}
                                width="auto"
                            />
                        </div>

                        <div
                            className="position-absolute"
                            style={{ top: "38%", right: "0%" }}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </div>
                ))}
            </>
        );

        this.setState({content: content});
    }

    openForm = (slug) => {
        let bank: any = null;
        let selectedBank: any = this.state.selectedBank;
        bank = Bank.list.find(v => v.slug === slug);
        if (bank) {
            selectedBank.image = bank.image;
            this.setState({selectedBank: selectedBank});
        }
        return () => {
            let content: any = this.state.content;
            content = (
                <>
                    <div className="d-flex justify-content-between">
                        <GeneralTranslation
                            slug="fillCardDetail"
                            className="fs-16px font-weight-light-bolder"
                        />

                        {this.state.selectedBank.image && (
                            <GologsImage
                                name={this.state.selectedBank.image}
                                height={35}
                                width="auto"
                            />
                        )}
                    </div>

                    <div>
                        <GeneralTranslation
                            slug="securityPaymentPrompt"
                            className="fs-10px"
                        />
                        <div className="mt-3">
                            <GologsInput variant="default" />
                        </div>
                    </div>

                    <div>
                        <div className="mt-3">
                            <GologsInput
                                type="date"
                                variant="primary"
                                placeholderByTranslation={true}
                                translation={"expirationDate"}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="mt-3 d-flex justify-content-center">
                            <GologsButton
                                size="small"
                                variant="primary"
                                contentByTranslation={true}
                                translation="cancel"
                                onClick={this.openListBank}
                                className="mr-1"
                            />
                            <GologsButton
                                size="small"
                                variant="primary"
                                contentByTranslation={true}
                                translation="save"
                                onClick={this.openAuthForm(slug)}
                            />
                        </div>
                    </div>
                </>
            );
            this.setState({content: content});
        }

    }


    openAuthForm = (slug) => {
        let bank: any = null;
        let selectedBank: any = this.state.selectedBank;
        bank = Bank.list.find(v => v.slug === slug);
        if (bank) {
            selectedBank.image = bank.image;
            this.setState({selectedBank: selectedBank});
        }
        return () => {
            let content: any = this.state.content;
            content = (
                <>
                    <div className="d-flex justify-content-end">
                        {this.state.selectedBank.image && (
                            <GologsImage
                                name={this.state.selectedBank.image}
                                height={35}
                                width="auto"
                            />
                        )}
                    </div>

                    <div className="mt-2">
                        Kode otorisasi sudah dikirimkan ke no telepon anda 
                        { this.state.phone && (
                            <span className="ml-1 font-weight-light-bold">
                                { this.state.phone }
                            </span>
                        ) }
                        .
                        Masukkan kode otorisasi untuk menyetujui transaksi ini
                        sebelum tenggat transaksi habis.
                    </div>

                    <div className="mt-3 text-danger font-weight-light-bolder">
                        Waktu tenggat transaksi
                    </div>

                    <div className="mt-3">
                        <div>
                            <div className="font-weight-light-bolder w-180px d-inline-block">Nama merchant</div>
                            <div className="d-inline-block">EMoney</div>
                        </div>

                        <div>
                            <div className="font-weight-light-bolder w-180px d-inline-block">Jumlah transaksi</div>
                            <div className="d-inline-block">IDR 52000</div>
                        </div>

                        <div>
                            <div className="font-weight-light-bolder w-180px d-inline-block">Tanggal transaksi</div>
                            <div className="d-inline-block">05 Oktober 2021</div>
                        </div>

                        <div>
                            <div className="font-weight-light-bolder w-180px d-inline-block">Mandiri Visa No</div>
                            <div className="d-inline-block">XXX XXX XXX 213</div>
                        </div>

                        <div className="d-flex align-items-center">
                            <div className="font-weight-light-bolder w-180px d-inline-block">Kode Otorisasi</div>
                            <div className="d-inline-block">
                                <GologsInput
                                    variant="primary"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="mt-3 d-flex justify-content-center">
                            <GologsButton
                                size="small"
                                variant="primary"
                                content="OK"
                                onClick={this.openListBank}
                                className="mr-1"
                            />
                            <GologsButton
                                size="small"
                                variant="primary"
                                content={"Batal"}
                                onClick={this.openListBank}
                            />
                        </div>
                    </div>
                    <div className="mt-1 d-flex justify-content-center">
                        <GologsButton
                            className="w-100"
                            size="small"
                            variant="primary"
                            content={"Kirim ulang kode otorisasi"}
                            onClick={this.openListBank}
                        />
                    </div>

                    <div className="mt-2">Jangan memberikan <span className="font-weight-light-bolder">Kode Otorisasi</span> ini kepada merchant/ orang lain</div>
                    <div className="mt-2">Hubungi <span className="font-weight-light-bolder">mandiri</span> call <span className="font-weight-light-bolder">14000</span> atau <span className="font-weight-light-bolder">+62 21 5299 777</span> apabila transaksi bermasalah</div>
                </>
            );
            this.setState({content: content});
        }

    }

    
    render() {
        return (
            <>
                <Collapse
                    title={<GeneralTranslation slug="virtualAccount" />}
                    subtitle={
                        <GeneralTranslation slug="transferVirtualAccount" />
                    }
                    content={this.state.content}
                />
            </>
        );
    }
}
