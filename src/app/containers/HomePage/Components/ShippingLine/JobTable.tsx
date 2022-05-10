import React from "react";
import ActivedTable from "../../../../containers/OrderPage/Components/ShippingLine/ActivedTable";


export default class JobTable extends React.Component {
    render() {
        return (
            <>
                <ActivedTable 
                    showActiveOrder={true}
                    showViewAll={true}
                />
            </>
        );
    };
}
