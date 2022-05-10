import React, { useEffect, useState } from "react";
import { GeneralTranslation } from "../../Translation/Loadable";
import { GologsButton } from "../../Button/Loadable";
import GologsInput from "../../Input/GologsInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type ITableHead = {
    key: string;
    labelSlug: string;
    type?: string;
}

type IProps = {
    tableHead: ITableHead[];
    data?: any[];
    className?: string;
    onItemsChanged?: any;
    isPreview?: boolean;
};

export default function TableInput (props: IProps) {
    const [data, setData] = useState([]);
    const [counter, setCounter] = useState(0);
    
    const initData = () => {
        setTimeout(() => {
            let dataInstance: any = props.data;
            if(dataInstance) {
                
                dataInstance = dataInstance.map(params => {
                    const response = params;
                    response.id = Math.round(Math.random() * 999999999);
                    
                    return response;
                });
                setData(dataInstance);
                setTimeout(() => {
                    window.console.log(data);
                    window.console.log(dataInstance);
                }, 400)
            }
        }, 500);
    }
    
    const onChange = (id, columnKey, value) => {
        let units: any = data;
        let editedIndex: any = units.findIndex(param => param.id === id);
        if(editedIndex > -1) {
            units[editedIndex][columnKey] = value;
            setData(units);
            if(props.onItemsChanged) props.onItemsChanged(units);
            setCounter(counter + 1);
        }
    }

    const removeData = (id) => {
        let units: any = data.filter((param: any) => param.id !== id);
        setData(units);
        if(props.onItemsChanged) props.onItemsChanged(units);
    }
    
    const addData = () => {
        let units: any = data;
        let keys: any = props.tableHead.map(param => param.key);
        let formData: any = {};
        const id = Math.round(Math.random() * 9999999999999999);
        formData.id = id;
        keys = keys.forEach(param => {
            formData[param] = "";
        });
        units.push(formData);
        setData(units);
        window.console.log(units);
        if(props.onItemsChanged) props.onItemsChanged(units);
    }

    useEffect(() => {
        initData();
    }, []);
    
    return (
        <div className={props.className ? props.className : ""}>
            {!props.isPreview && (
                <>
                    <GologsButton
                        size="small"
                        variant="secondary"
                        onClick={addData}
                        contentByTranslation={true}
                        translation="add"
                        className="float-right"
                    />
                    <div className="w-100 h-40px"></div>
                </>
            )}
            <table className="w-100 mt-3 table">
                <thead>
                    <tr>
                        {props.tableHead.map(value => (
                            <th
                                className="text-capitalize"
                                key={value.labelSlug}
                            >
                                <GeneralTranslation slug={value.labelSlug} />
                            </th>
                        ))}
                        {!props.isPreview && <th className="text-center"></th>}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 && (
                        <tr>
                            <td
                                colSpan={props.tableHead.length + 1}
                                className="text-center"
                            >
                                <GeneralTranslation slug="noData" />
                            </td>
                        </tr>
                    )}
                    {data.map((value: any, index) => (
                        <tr key={value.id}>
                            {props.tableHead.map(column => (
                                <td key={column.key} className={column.type === "number" ? "text-right" : ""}>
                                    {!props.isPreview && (
                                        <GologsInput
                                            variant="secondary"
                                            type={!column.type ? "text" : column.type}
                                            value={data[index][column.key]}
                                            onChange={e => {
                                                onChange(
                                                    value.id,
                                                    column.key,
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    )}
                                    {props.isPreview === true && (
                                        <>{data[index][column.key]}</>
                                    )}
                                </td>
                            ))}
                            {!props.isPreview && (
                                <td>
                                    <GologsButton
                                        size="tiny"
                                        variant="danger"
                                        onClick={() => {
                                            removeData(value.id);
                                        }}
                                        content={
                                            <FontAwesomeIcon icon={faTrash} />
                                        }
                                    />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}