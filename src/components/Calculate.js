import React, { useState } from "react";
import DeviceInput from "./DeviceInput";
import {
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@material-ui/core";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import currencies from "../data/currencies";

const Calculate = () => {
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [showResults, setShowResults] = useState(false);
    const [kwhRef, setKwhRef] = useState(null);
    const [dataLists, setDataLists] = useState({
        deviceNames: [],
        voltageValues: [],
        ampValues: [],
        usageValues: [],
        unitValues: [],
        perValues: [],
    });

    const cpyList = (list) => {
        let newList = [];
        for (let obj of list) {
            newList.push(obj);
        }
        return newList;
    };
    const cpyObj = (obj) => {
        let newObj = {};
        for (let key in obj) {
            newObj[key] = obj[key];
        }
        return newObj;
    };

    const handleOnChange = (newInputData, ind) => {
        let newDeviceInputs = deviceInputs;
        newDeviceInputs[ind] = (
            <DeviceInput
                ind={newDeviceInputs[ind].props.ind}
                onChange={newDeviceInputs[ind].props.onChange}
                currData={newInputData}
            />
        );
        setDeviceInputs(cpyList(newDeviceInputs));
    };

    const [deviceInputs, setDeviceInputs] = useState([
        <DeviceInput
            ind={0}
            onChange={handleOnChange}
            currData={{
                name: "",
                voltage: 0,
                usage: 0,
                amps: 0,
                selectedUnit: "hr",
                selectedPer: "day",
            }}
        />,
    ]);

    /**
     * Creates a new input set for a device
     */
    const handleAddDeviceInput = () => {
        deviceInputs.push(
            <DeviceInput
                ind={deviceInputs.length}
                onChange={handleOnChange}
                currData={{
                    name: "",
                    voltage: 0,
                    usage: 0,
                    amps: 0,
                    selectedUnit: "hr",
                    selectedPer: "day",
                }}
            />
        );
        setDeviceInputs(cpyList(deviceInputs));
    };

    /**
     * Removes a certain device input set
     * @param {int} num `num` field of the corresponding device input set
     */
    const handleRemoveDeviceInput = (num) => {
        setDeviceInputs(cpyList(deviceInputs.slice(0, -1)));
    };

    const getAllInfo = () => {
        let newDataLists = cpyObj(dataLists);
        for (let i in deviceInputs) {
            newDataLists.deviceNames.push(deviceInputs[i].props.currData.name);
            newDataLists.voltageValues.push(
                deviceInputs[i].props.currData.voltage
            );
            newDataLists.ampValues.push(deviceInputs[i].props.currData.amps);
            newDataLists.usageValues.push(deviceInputs[i].props.currData.usage);
            newDataLists.unitValues.push(
                deviceInputs[i].props.currData.selectedUnit
            );
            newDataLists.perValues.push(
                deviceInputs[i].props.currData.selectedPer
            );
        }

        console.log(newDataLists);
        setDataLists(newDataLists);
    };

    // const getCurrencyOptions = () => {
    //     let currencyOptions = [];
    //     let count = 0;
    //     for (let currency in currencies) {
    //         currencyOptions.push(
    //             <option value={currency.value}>{currency.symbol}</option>
    //         );
    //     }
    // };
    return (
        <div className="calculate">
            <div className="kwhr-input-container">
                <Typography variant="h4" component="h2">
                    Enter your kilowatt-hour cost:
                </Typography>
                <TextField
                    placeholder="kwHr Cost"
                    id="kwhr-txtfld"
                    inputRef={(ref) => setKwhRef(ref)}
                    type="number"
                />
                <Select
                    value={selectedCurrency}
                    onChange={(event) =>
                        setSelectedCurrency(event.target.value)
                    }
                >
                    {currencies.map((currency) => (
                        <MenuItem value={currency.value}>
                            {currency.symbol}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div className="device-inputs-container">
                <Typography variant="h4" component="h2">
                    Enter your device information below:
                </Typography>
                <ol id="device-inputs-list">
                    {/* Will likely have to save the current inputs before removing an input
                    and repopulate reloaded inputs using the defaultValue attr */}
                    {deviceInputs.map((deviceInput) => {
                        return (
                            <li className="removable-device-input">
                                {deviceInput}
                            </li>
                        );
                    })}
                </ol>
                <Typography
                    id="add-device"
                    variant="body1"
                    component="p"
                    onClick={handleAddDeviceInput}
                >
                    + add new device
                </Typography>
                {deviceInputs.length > 1 ? (
                    <Typography
                        className="remove-device-input-button"
                        variant="body1"
                        component="p"
                        onClick={() => handleRemoveDeviceInput()}
                    >
                        remove
                    </Typography>
                ) : null}
                <Button
                    id="calculate-button"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setShowResults(!showResults);
                        getAllInfo();
                    }}
                >
                    {showResults ? "Do it again?" : "Calculate!"}
                </Button>
                {showResults ? (
                    <Results
                        kwh={kwhRef.value}
                        currency={selectedCurrency}
                        deviceNames={dataLists.deviceNames}
                        voltageValues={dataLists.voltageValues}
                        ampValues={dataLists.ampValues}
                        usageValues={dataLists.usageValues}
                        perValues={dataLists.perValues}
                        unitValues={dataLists.unitValues}
                    />
                ) : null}
            </div>
        </div>
    );
};

const Results = (props) => {
    // given values
    const kwhCostValue = parseFloat(props.kwh);
    const currency = props.currency;
    const deviceNames = props.deviceNames;
    const voltageValues = props.voltageValues.map((num) => parseFloat(num));
    const ampValues = props.ampValues.map((num) => parseFloat(num));
    const usageValues = props.usageValues.map((num) => parseFloat(num));
    const perValues = props.perValues;
    const unitValues = props.unitValues;

    const convertToHrs = (usage, per, unit) => {
        switch (unit) {
            case "hr":
                switch (per) {
                    case "day":
                        return usage * 30;
                    case "week":
                        return usage * 4;
                    case "month":
                        return usage;
                    default:
                        return "time unit not supported";
                }
            case "min":
                switch (per) {
                    case "day":
                        return usage * 0.5;
                    case "week":
                        return usage * 0.067;
                    case "month":
                        return usage;
                    default:
                        return "time unit not supported";
                }
            default:
                return "time unit not supported";
        }
    };

    const getAllWattage = () => {
        let wattageValues = [];
        for (let i in voltageValues) {
            wattageValues.push(voltageValues[i] * ampValues[i]);
        }
        return wattageValues;
    };
    const getCombinedCost = () => {
        let kwhCost = 0;
        for (let i in wattageValues) {
            kwhCost +=
                kwhCostValue *
                ((wattageValues[i] *
                    convertToHrs(usageValues[i], perValues[i], unitValues[i])) /
                    1000);
        }
        return kwhCost;
    };

    // calculated values
    let wattageValues = getAllWattage();
    const combinedKwhCost = getCombinedCost();

    return (
        <div className="results">
            <Typography>
                {combinedKwhCost}
                {currency}
            </Typography>
        </div>
    );
};

export default Calculate;
