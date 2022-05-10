import React from "react";
import { Card } from "react-bootstrap";
import { GeneralTranslation } from "../../../../components/Translation/Loadable";
import { Line } from "react-chartjs-2";
import DeliveryOrder from "../../../../../endpoints/DeliveryOrder";
import User from "../../../../../model/User";

export default class TotalOrderChart extends React.Component {
    state = {
        data: {},
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    };

    componentDidMount() {
        this.getTransactionAmount();
    }
    
    getTransactionAmount = async () => {
        let dt: any = null;
        let data: any = this.state.data;
        let orders: any = [];
        let services: any = [];
        let unit: any = null;
        let order: any = null;
        let i: number = 1;
        try { 
            dt = await DeliveryOrder.monitorService(
                "ThisYear",
                User.getCompanyName()
            );
            services = dt.services;
            for(i = 1;i <= 12;i++) {
                unit = null;
                order = i.toString();
                if (order.length == 1) {
                    order = "0" + order;
                }
                unit = services.find(x => {
                    let month: any = x.timeStamp;
                    month = month.replace(/([0-9]{4}-)(.+)/, "$2");
                    if (month == order) {
                        return true;
                    }

                    return false;
                })
                if (unit) {
                    orders.push(unit.totalTransaction);
                } else {
                    orders.push(0);
                }
            }
            data = (canvas) => {
                const ctx = canvas.getContext("2d");
                let gradient = ctx.createLinearGradient(0, 0, 400, 10);
                gradient.addColorStop(1, "#7e72f2");
                gradient.addColorStop(0.8, "#cc72f2");
                gradient.addColorStop(0.6, "#a277d9");
                gradient.addColorStop(0.4, "#a28dec");
                gradient.addColorStop(0, "#f181b3");
                
                return {
                    labels: [
                        "01",
                        "02",
                        "03",
                        "04",
                        "05",
                        "06",
                        "07",
                        "08",
                        "09",
                        "10",
                        "11",
                        "12"
                    ],
                    datasets: [
                        {
                            label: "Total order",
                            data: orders,
                            fill: false,
                            backgroundColor: "#0078ff",
                            borderColor: gradient,
                            borderWidth: 5,
                            pointRadius: 0,
                            tension: 0.3
                        }
                    ]
                };
            };
            this.setState({data: data})
        } catch(e) {
            
        }
    }

    render() {
        return (
            <>
                <Card className="h-100">
                    <Card.Body>
                        <Card.Subtitle className="text-muted text-capitalize d-inline-block">
                            <GeneralTranslation slug="totalOrder" />{" "}
                            <GeneralTranslation slug="all" />{" "}
                            <GeneralTranslation slug="services" />
                        </Card.Subtitle>
                        <Card.Text className="mt-1">
                            <Line
                                data={this.state.data}
                                options={this.state.options}
                                type="line"
                            />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    }
}
