import { MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import "../App.css";

const DeviceInput = (props) => {
    const [name, setName] = useState(props.name !== "" ? props.name : "");
    const [voltage, setVoltage] = useState(props.voltage);
    const [usage, setUsage] = useState(props.usage);
    const [selectedUnit, setSelectedUnit] = useState("hr");
    const [selectedPer, setSelectedPer] = useState("day");

    const getNameTxtField = () => {
        const onDeviceNameChange = (event) => {
            setName(event.target.value);
            props.onDeviceInputNameChange(event, props.num);
        };
        return name === "" ? (
            <TextField
                // labelId="device-input-label"
                className="device-name-txtfld"
                placeholder="Device Name"
                onChange={onDeviceNameChange}
            />
        ) : (
            <TextField
                // labelId="device-input-label"
                className="device-name-txtfld"
                placeholder="Device Name"
                value={name}
                onChange={onDeviceNameChange}
            />
        );
    };

    const getVoltageTxtField = () => {
        const onVoltageChange = (event) => {
            setVoltage(event.target.value);
            props.onDeviceInputVoltageChange(event, props.num);
        };
        return voltage === 0 || voltage === "" ? (
            <TextField
                className="device-voltage-txtfld"
                type="number"
                placeholder="Voltage"
                onChange={onVoltageChange}
            />
        ) : (
            <TextField
                className="device-voltage-txtfld"
                type="number"
                value={voltage}
                onChange={onVoltageChange}
            />
        );
    };

    const getUsageTxtField = () => {
        const onUsageChange = (event) => {
            setUsage(event.target.value);
            props.onDeviceInputUsageChange(event, props.num);
        };
        return usage === 0 || usage === "" ? (
            <TextField
                className="device-usage-txtfld"
                type="number"
                placeholder="Usage"
                onChange={onUsageChange}
            />
        ) : (
            <TextField
                className="device-usage-txtfld"
                type="number"
                value={usage}
                onChange={onUsageChange}
            />
        );
    };

    return (
        <div className="device-input" id={`${props.num}`}>
            {/* <InputLabel id="device-name-label">Device Name</InputLabel> */}
            {getNameTxtField()}
            {getVoltageTxtField()}
            <Typography variant="body1" component="p">
                V
            </Typography>
            {getUsageTxtField()}
            <Select
                value={selectedUnit}
                onChange={(event) => setSelectedUnit(event.target.value)}
            >
                <MenuItem value="hr">{"Hr"}</MenuItem>
                <MenuItem value="min">{"Min"}</MenuItem>
            </Select>
            <Typography className="per" variant="body1" component="p">
                per
            </Typography>
            <Select
                value={selectedPer}
                onChange={(event) => setSelectedPer(event.target.value)}
            >
                <MenuItem value="day">{"Day"}</MenuItem>
                <MenuItem value="week">{"Week"}</MenuItem>
                <MenuItem value="month">{"Month"}</MenuItem>
            </Select>
            {!props.first ? (
                <Typography
                    className="remove-device-input-button"
                    variant="body1"
                    component="p"
                    onClick={() => props.handleRemoveDeviceInput(props.num)}
                >
                    remove
                </Typography>
            ) : null}
        </div>
    );
};

export default DeviceInput;
