import React, { useState } from "react";
import DeviceInput from "./DeviceInput";
import {
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@material-ui/core";
import currencies from "../data/currencies";

const Calculate = () => {
    const [deviceInputs, setDeviceInputs] = useState([]);
    const [nextInputId, setNextInputId] = useState(0);
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [deviceInputData, setDeviceInputData] = useState([
        {
            deviceInputId: -1,
            name: "",
            voltage: 0,
            usage: 0,
            amount: "hr",
            per: "day",
        },
    ]);

    const cpyList = (list) => {
        let newList = [];
        for (let obj of list) {
            newList.push(obj);
        }
        return newList;
    };

    /**
     * Creates a new input set for a device
     */
    const handleAddDeviceInput = () => {
        let newDeviceInputs = [];
        let newDeviceInputData = deviceInputData;

        for (let deviceInput of deviceInputData) {
            if (deviceInput.deviceInputId === -1) continue;
            newDeviceInputs.push(
                <DeviceInput
                    first={false}
                    num={deviceInput.deviceInputId}
                    name={deviceInput.name}
                    voltage={deviceInput.voltage}
                    usage={deviceInput.usage}
                    onDeviceInputNameChange={onDeviceInputNameChange}
                    onDeviceInputVoltageChange={onDeviceInputVoltageChange}
                    onDeviceInputUsageChange={onDeviceInputUsageChange}
                    handleRemoveDeviceInput={handleRemoveDeviceInput}
                />
            );
        }
        newDeviceInputData.push({
            deviceInputId: nextInputId,
            name: "",
            voltage: 0,
            usage: 0,
            amount: "hr",
            per: "day",
        });
        newDeviceInputs.push(
            <DeviceInput
                first={false}
                num={nextInputId}
                name={findDeviceInput(nextInputId).name}
                voltage={findDeviceInput(nextInputId).voltage}
                usage={findDeviceInput(nextInputId).usage}
                onDeviceInputNameChange={onDeviceInputNameChange}
                onDeviceInputVoltageChange={onDeviceInputVoltageChange}
                onDeviceInputUsageChange={onDeviceInputUsageChange}
                handleRemoveDeviceInput={handleRemoveDeviceInput}
            />
        );
        setNextInputId(nextInputId + 1);

        setDeviceInputs(newDeviceInputs);
        setDeviceInputData(cpyList(newDeviceInputData));
    };

    /**
     * Removes a certain device input set
     * @param {int} num `num` field of the corresponding device input set
     */
    const handleRemoveDeviceInput = (num) => {
        let newDeviceInputs = deviceInputs;
        let newDeviceInputData = deviceInputData;

        // possibly an 'Are you sure?' popup if the fields are not empty

        const index = newDeviceInputData.indexOf(findDeviceInput(num));

        console.log(num + " " + index);

        newDeviceInputs.splice(index, 1);
        newDeviceInputData.splice(index, 1);

        setDeviceInputs(cpyList(newDeviceInputs));
        setDeviceInputData(cpyList(newDeviceInputData));
    };

    /**
     * Will update the `name` field of a certain device input set
     * @param {*} event the event resulting from the text field onChange
     * @param {int} num the number field corresponding to the device input set
     */
    const onDeviceInputNameChange = (event, num) => {
        let newDeviceInputData = deviceInputData;

        const ind = newDeviceInputData.indexOf(findDeviceInput(num));
        newDeviceInputData[ind].name = event.target.value;

        setDeviceInputData(cpyList(newDeviceInputData));
    };

    /**
     * Will update the `voltage` field of a certain device input set
     * @param {*} event the event resulting from the text field onChange
     * @param {int} num the number field corresponding to the device input set
     */
    const onDeviceInputVoltageChange = (event, num) => {
        let newDeviceInputData = deviceInputData;

        const ind = newDeviceInputData.indexOf(findDeviceInput(num));
        newDeviceInputData[ind].voltage = event.target.value;

        setDeviceInputData(cpyList(newDeviceInputData));
    };

    /**
     * Will update the `usage` field of a certain device input set
     * @param {*} event the event resulting from the text field onChange
     * @param {int} num the number field corresponding to the device input set
     */
    const onDeviceInputUsageChange = (event, num) => {
        let newDeviceInputData = deviceInputData;

        const ind = newDeviceInputData.indexOf(findDeviceInput(num));
        newDeviceInputData[ind].usage = event.target.value;

        setDeviceInputData(cpyList(newDeviceInputData));
    };

    /**
     * Sends user to the results route and calculates the results
     */
    const calculateOnClick = () => {};

    /**
     * Gets the device input set corresponding to the `num` field
     * @param {int} deviceInputId `num` field corresponding to the device input set
     * @returns object representing the device input data
     */
    const findDeviceInput = (deviceInputId) => {
        for (let currDeviceInputData of deviceInputData) {
            if (currDeviceInputData.deviceInputId === deviceInputId) {
                // get device input data
                // console.log(currDeviceInputData);
                return currDeviceInputData;
            }
        }
        return "problem";
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
                <TextField placeholder="kwHr Cost" id="kwhr-txtfld" />
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
                    <li>
                        <DeviceInput
                            first={true}
                            num={-1}
                            name={findDeviceInput(-1).name}
                            voltage={findDeviceInput(-1).voltage}
                            usage={findDeviceInput(-1).usage}
                            onDeviceInputNameChange={onDeviceInputNameChange}
                            onDeviceInputVoltageChange={
                                onDeviceInputVoltageChange
                            }
                            onDeviceInputUsageChange={onDeviceInputUsageChange}
                        />
                    </li>
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
                <Button
                    id="calculate-button"
                    variant="contained"
                    color="primary"
                    onClick={calculateOnClick}
                >
                    Calculate!
                </Button>
            </div>
        </div>
    );
};

export default Calculate;
