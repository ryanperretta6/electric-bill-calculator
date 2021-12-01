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
    const [selectedCurrency, setSelectedCurrency] = useState("USD");

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
        deviceInputs.push(
            <DeviceInput handleRemoveDeviceInput={handleRemoveDeviceInput} />
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

    /**
     * Sends user to the results route and calculates the results
     */
    const calculateOnClick = () => {};

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
                        <DeviceInput />
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
                {deviceInputs.length !== 0 ? (
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
                    onClick={calculateOnClick}
                >
                    Calculate!
                </Button>
            </div>
        </div>
    );
};

export default Calculate;
