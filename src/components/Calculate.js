import React, { useState } from "react";
import DeviceInput from "./DeviceInput";
import { HelpOutlineRounded } from "@material-ui/icons";
import {
    Button,
    Icon,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@material-ui/core";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import currencies from "../data/currencies";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PieChart from "./PieChart";
import { Chart, ArcElement } from "chart.js";
import BreakdownTable from "./Table";
Chart.register(ArcElement);

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
    const [showError, setShowError] = useState(false);

    const cpyList = (list) => {
        let newList = [];
        for (let obj of list) {
            newList.push(obj);
        }
        return newList;
    };
    // const cpyObj = (obj) => {
    //     let newObj = {};
    //     for (let key in obj) {
    //         newObj[key] = obj[key];
    //     }
    //     return newObj;
    // };

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

    const getCurrencySymbol = (value) => {
        for (let curr of currencies) {
            if (curr.value === value) return curr.symbol;
        }
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

    const checkValidInputs = (deviceInput) => {
        if (
            !kwhRef.value ||
            isNaN(parseFloat(kwhRef.value)) ||
            !parseFloat(kwhRef.value) > 0 ||
            !deviceInput.name ||
            deviceInput.name.trim().length === 0 ||
            !deviceInput.voltage ||
            isNaN(parseFloat(deviceInput.voltage)) ||
            !parseFloat(deviceInput.voltage) > 0 ||
            !deviceInput.amps ||
            isNaN(parseFloat(deviceInput.amps)) ||
            !parseFloat(deviceInput.amps) > 0 ||
            !deviceInput.usage ||
            isNaN(parseFloat(deviceInput.usage)) ||
            !parseFloat(deviceInput.usage) > 0
        ) {
            return false;
        }
        return true;
    };

    const getAllInfo = () => {
        let newDataLists = {
            deviceNames: [],
            voltageValues: [],
            ampValues: [],
            usageValues: [],
            unitValues: [],
            perValues: [],
        };
        for (let i in deviceInputs) {
            if (!checkValidInputs(deviceInputs[i].props.currData)) {
                setShowError(true);
                setShowResults(false);
                return;
            }
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

        setShowError(false);
        setShowResults(!showResults);
        setDataLists(newDataLists);
    };

    return (
        <div className="calculate">
            <div className="input-container">
                <div className="kwhr-input-container">
                    <Typography variant="h4" component="h2">
                        Enter your kilowatt-hour cost:
                    </Typography>
                    <Popup
                        trigger={
                            <button>
                                <Icon color="secondary" className="help-icon">
                                    <HelpOutlineRounded />
                                </Icon>
                            </button>
                        }
                        position="right center"
                        contentStyle={{ padding: "10px" }}
                    >
                        <p>
                            This is the Kilowatt-hour cost per{" "}
                            <b>{getCurrencySymbol(selectedCurrency)}</b>. It can
                            be found by asking your energy provider or lease
                            agreement.
                        </p>
                    </Popup>
                    <br />
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
                    <Popup
                        trigger={
                            <button>
                                <Icon color="secondary" className="help-icon">
                                    <HelpOutlineRounded />
                                </Icon>
                            </button>
                        }
                        position="right center"
                        contentStyle={{
                            padding: "10px",
                            width: "300px",
                        }}
                    >
                        <p>
                            Look for a sticker on your device like below, the
                            voltage is typically denoted with a V and the amps
                            with an A:
                        </p>
                        <img
                            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fus.v-cdn.net%2F6024911%2Fuploads%2Fattachments%2F13022%2F6920.jpg&f=1&nofb=1"
                            alt="voltage and amp sticker example"
                            width="100%"
                            height="100%"
                        />
                    </Popup>
                    <ol id="device-inputs-list">
                        {/* Will likely have to save the current inputs before removing an input
                    and repopulate reloaded inputs using the defaultValue attr */}
                        {deviceInputs.map((deviceInput) => {
                            return <li>{deviceInput}</li>;
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
                        onClick={getAllInfo}
                    >
                        <b>{showResults ? "Do it again" : "Calculate!"}</b>
                    </Button>
                    {showError ? (
                        <Typography id="error" variant="body1" component="p">
                            Please make sure all inputs are valid.
                        </Typography>
                    ) : null}
                </div>
            </div>
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

    let costValues = [];
    let topNineDevices = [];
    let otherDevices = [];
    let otherDevicesCost = 0;

    const getCombinedCost = () => {
        let kwhCost = 0;
        for (let i in wattageValues) {
            let cost =
                kwhCostValue *
                ((wattageValues[i] *
                    convertToHrs(usageValues[i], perValues[i], unitValues[i])) /
                    1000);
            kwhCost += cost;
            costValues.push(cost);
        }

        // get top 9 costs by deviceName
        const sortedCostValues = costValues.slice();
        sortedCostValues.sort((a, b) => b - a);
        for (let i in deviceNames) {
            if (
                sortedCostValues.indexOf(costValues[i]) < 9 &&
                topNineDevices.length !== 9
            ) {
                topNineDevices.push(deviceNames[i]);
            } else {
                otherDevices.push(deviceNames[i]);
            }
        }
        topNineDevices.push("Other");

        for (let deviceName of otherDevices) {
            otherDevicesCost += costValues[deviceNames.indexOf(deviceName)];
        }

        return kwhCost;
    };

    // calculated values
    let wattageValues = getAllWattage();
    const combinedKwhCost = getCombinedCost();

    const getCurrencySymbol = (value) => {
        for (let curr of currencies) {
            if (curr.value === value) return curr.symbol;
        }
    };

    const getTopVals = () => {
        let topNineCosts = [];
        for (let deviceName of topNineDevices) {
            if (deviceName === "Other") continue;
            topNineCosts.push(costValues[deviceNames.indexOf(deviceName)]);
        }
        // add the other cost
        topNineCosts.push(otherDevicesCost);

        return topNineCosts;
    };

    const colors = [
        "#fff100",
        "#e81123",
        "#68217a",
        "#00bcf2",
        "#009e49",
        "#ec008c",
        "#ff8c00",
        "#bad80a",
        "#00b294",
        "#00188f",
    ];

    const chartData = {
        labels: costValues.length <= 10 ? deviceNames : topNineDevices,
        datasets: [
            {
                label: `Cost in ${getCurrencySymbol(currency)}`,
                data: costValues.length <= 10 ? costValues : getTopVals(),
                backgroundColor: colors.slice(
                    0,
                    costValues.length < 10 ? costValues.length : 10
                ),
            },
        ],
    };

    return (
        <div className="results-container">
            <div className="results">
                <Typography variant="h5" component="h2">
                    <u>Results:</u>
                </Typography>
                <Typography variant="body1" component="p">
                    <b>Estimated amount:</b> {getCurrencySymbol(currency)}
                    {combinedKwhCost < 0.01
                        ? 0.01
                        : combinedKwhCost.toFixed(2)}{" "}
                    per month
                </Typography>
                <PieChart chartData={chartData} />
            </div>
            <BreakdownTable
                id="breakdown-table"
                currency={getCurrencySymbol(currency)}
                costValues={costValues}
                deviceNames={deviceNames}
                usageValues={usageValues}
                unitValues={unitValues}
                perValues={perValues}
            />
        </div>
    );
};

export default Calculate;
