import React, { useLayoutEffect } from "react";
import { Icon, Circle, Number, Rectangle } from "../../../styles/WizardTop";
import { CMark } from "../../../styles/WizardBottom";
import iCheck from "../../../assets/icons/check.svg";
import { GeneralTranslation } from "../Translation/Loadable";

type IItems = {
    slug?: string;
    name?: string;
    image?:any;
    customTitle?:any;
    customSubtitle?:any;
}

interface Props {
    items: IItems[];
    step: number;
    titleClassName?: string;
    fontSizeClassName?: string;
    type?: string;
    rectangleWidth?: number;
    hideImage?: boolean;
    onCompleted?: any;
}

export default class GologsWizard extends React.Component<Props> {
    state = {
        id: "",
        lineSize: 0,
        activedLineSize: 0
    };

    changeLineSize = () => {
        let el: any = document.getElementById(this.state.id);
        let lineSize: number = this.state.lineSize;
        let activedLineSize: number = this.state.activedLineSize;
        let order: number[] = [0, 0];
        let checkpoint: any[] = [{}, {}];
        let rect: any = {};
        let lineRect: any = {};
        let circleEl: any = {};
        let lineEl: any = {};
        let stopPoint = 0;
        if (el) {
            checkpoint[0] = el.querySelector(".order" + 0);
            if (checkpoint[0]) {
                rect = checkpoint[0].getBoundingClientRect();
                if (rect) {
                    order[0] = rect.left;
                }
            }
            checkpoint[1] = el.querySelector(
                ".order" + (this.props.items.length - 1)
            );
            if (checkpoint[1]) {
                rect = checkpoint[1].getBoundingClientRect();
                if (rect) {
                    order[1] = rect.right;
                }
            }
            lineSize = order[1] - order[0];
            lineSize *= 0.99;
            this.setState({ lineSize: lineSize });

            stopPoint = this.props.step;
            if (stopPoint > this.props.items.length - 1) {
                stopPoint = this.props.items.length - 1;
            }
            circleEl = el.querySelector(".order" + stopPoint);
            if (circleEl) {
                rect = circleEl.getBoundingClientRect();
                lineEl = el.querySelector(".lineElement");
                if (lineEl) {
                    lineRect = lineEl.getBoundingClientRect();
                    activedLineSize =
                        rect.left + 5 - lineRect.left;
                    this.setState({
                        activedLineSize: activedLineSize
                    });
                }
            }
        }
    };

    componentDidMount() {
        let id: any = this.state.id;
        id = Math.round(Math.random() * 99999999);
        id = "wizard" + id;
        this.setState({ id: id });
        window.addEventListener("resize", this.changeLineSize);
        setTimeout(() => {
            this.changeLineSize();
            let items: any = [];
            let container: any = document.getElementById(this.state.id);
            if(container) {
                let images: any = container.querySelectorAll("img");
                items = [];
                images.forEach((image) => {
                    let item: any = {};
                    item.offsetTop = image.offsetTop;
                    item.offsetLeft = image.offsetLeft;
        
                    items.push(item);
                });
                if(this.props.onCompleted) {
                    this.props.onCompleted(items);
                }
            }
        }, 1000);

    }

    componentWillUnmount() {
        window.removeEventListener(
            "resize",
            this.changeLineSize
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.step !== prevProps.step) {
            this.changeLineSize();
        }
    }

    render() {
        return (
            <div
                className="position-relative mb-30px w-100"
                id={this.state.id}
            >
                <div className="w-100 d-flex justify-content-center position-absolute l-0 t-74 sm-t-76">
                    <div className="w-95 position-relative d-flex justify-content-center"></div>
                </div>

                <div className="d-flex justify-content-between">
                    {this.props.items.map((v, i) => (
                        <div key={"items" + i} className="d-flex flex-column align-items-center">
                            {!this.props.hideImage && (
                                <img
                                    className="w-auto md-h-56px h-38px mb-3"
                                    src={v.image}
                                />
                            )}
                            <div className="position-relative">
                                <div
                                    style={{ zIndex: 10 }}
                                    className="position-relative"
                                >
                                    <Circle
                                        className={
                                            "mb-2 w-24px h-24px md-w-32px md-h-32px order" +
                                            i
                                        }
                                        active={
                                            i <= this.props.step
                                        }
                                    >
                                        <Number
                                            active={
                                                i <=
                                                this.props.step
                                            }
                                        >
                                            {i <=
                                            this.props.step -
                                                1 ? (
                                                <CMark
                                                    src={iCheck}
                                                    show={true}
                                                />
                                            ) : (
                                                <>
                                                    {(!this.props
                                                        .type ||
                                                        this
                                                            .props
                                                            .type ==
                                                            "primary" ||
                                                        (this
                                                            .props
                                                            .type ==
                                                            "secondary" &&
                                                            i >
                                                                this
                                                                    .props
                                                                    .step)) &&
                                                        i + 1}
                                                    {this.props
                                                        .type ==
                                                        "secondary" &&
                                                        i <=
                                                            this
                                                                .props
                                                                .step && (
                                                            <CMark
                                                                src={
                                                                    iCheck
                                                                }
                                                                show={
                                                                    true
                                                                }
                                                            />
                                                        )}
                                                </>
                                            )}
                                        </Number>
                                    </Circle>
                                </div>
                                {i === 0 && (
                                    <>
                                        <Rectangle
                                            show={true}
                                            className="position-absolute h-6px l-3 md-t-35 t-30 lineElement"
                                            style={{
                                                zIndex: 1,
                                                width:
                                                    this.state
                                                        .lineSize +
                                                    "px"
                                            }}
                                        />
                                        <Rectangle
                                            show={true}
                                            actived={true}
                                            style={{
                                                zIndex: 2,
                                                width:
                                                    this.state
                                                        .activedLineSize +
                                                    "px"
                                            }}
                                            className="position-absolute l-3 h-6px md-t-35 t-30"
                                        />
                                    </>
                                )}
                            </div>

                            <div
                                className={
                                    "xs-fs-11px d-none d-sm-block letter-spacing-3 text-center  " +
                                    (i == 2 || i == 3
                                        ? "w-95px"
                                        : "w-130px") +
                                    " " +
                                    (this.props.fontSizeClassName
                                        ? this.props
                                                .fontSizeClassName
                                        : "md-fs-14px")
                                }
                            >
                                {v.customTitle ? (
                                    <>
                                        <div className="fs-12px font-weight-light-bold h-35px">
                                            {v.customTitle}
                                        </div>
                                        <div className="fs-12px mt-3 text-sixth-gray">
                                            {v.customSubtitle}
                                        </div>
                                    </>
                                ) : (
                                    v.name
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
